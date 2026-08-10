#!/usr/bin/env node
/**
 * Pushes the built search index into Meilisearch, which backs docs.namasoft.com search
 * through NLM's /nlm/docs-search servlet (mode "meili").
 *
 * Run AFTER `npm run docs:build` — it reads the artifact that build produces:
 *
 *   node scripts/push-search-index.mjs
 *
 * Env:
 *   MEILI_HOST         default http://127.0.0.1:7701   (see ../docker/)
 *   MEILI_MASTER_KEY   required
 *   MEILI_INDEX        default namaerp-docs
 *   SEARCH_INDEX_JSON  default docs/.vitepress/search-index.json
 *
 * Why this file and not a VitePress `buildEnd` hook: re-indexing must be possible
 * without a 140-second rebuild, and the master key has no business being reachable
 * from config.mts.
 *
 * Why not the Meilisearch docs-scraper: search-index.json is a strictly better
 * source. `search-index-builder.mts` already drops everything inside
 * `.ignore-in-full-text-search`, so the generated folder link-trees — which are
 * nothing but lists of every page title beneath them, and which the old built-in
 * minisearch DID index — never make it in. A crawler would drag them back.
 */

import {createHash} from 'node:crypto'
import {readFileSync} from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const HOST = (process.env.MEILI_HOST || 'http://127.0.0.1:7701').replace(/\/+$/, '')
const KEY = process.env.MEILI_MASTER_KEY
const INDEX = process.env.MEILI_INDEX || 'namaerp-docs'
const INDEX_JSON = process.env.SEARCH_INDEX_JSON
    || path.join(REPO_ROOT, 'docs', '.vitepress', 'search-index.json')

// Built into a scratch index and swapped in at the end, so a failed or half-finished
// push can never leave the live site searching a partial index.
const STAGING = `${INDEX}_staging`

const DOC_BATCH = 5000

// Validates the transform and prints a sample without touching a server.
const DRY_RUN = process.argv.includes('--dry-run')

if (!KEY && !DRY_RUN) {
    console.error('MEILI_MASTER_KEY is not set. See docker/.env.example')
    process.exit(1)
}

async function meili(method, endpoint, body) {
    const res = await fetch(`${HOST}${endpoint}`, {
        method,
        headers: {
            Authorization: `Bearer ${KEY}`,
            ...(body === undefined ? {} : {'Content-Type': 'application/json'}),
        },
        body: body === undefined ? undefined : JSON.stringify(body),
    })
    const text = await res.text()
    const payload = text ? JSON.parse(text) : null
    if (!res.ok) {
        const detail = payload?.message || text
        throw new Error(`${method} ${endpoint} -> ${res.status}: ${detail}`)
    }
    return payload
}

/**
 * Every write in Meilisearch is asynchronous: the call returns a task uid and the work
 * happens later. Pushing documents and swapping without waiting would race, so each
 * step blocks here until its task actually lands.
 */
async function awaitTask(task, label) {
    const uid = task?.taskUid ?? task?.uid
    if (uid === undefined)
        return
    const deadline = Date.now() + 10 * 60 * 1000
    for (; ;) {
        const status = await meili('GET', `/tasks/${uid}`)
        if (status.status === 'succeeded')
            return
        if (status.status === 'failed' || status.status === 'canceled')
            throw new Error(`${label} ${status.status}: ${JSON.stringify(status.error)}`)
        if (Date.now() > deadline)
            throw new Error(`${label} still ${status.status} after 10 minutes`)
        await new Promise((r) => setTimeout(r, 250))
    }
}

/**
 * Meilisearch primary keys accept only [a-zA-Z0-9_-], and our natural key is a URL
 * path plus an anchor slug — both of which contain separators and Arabic. Hash it:
 * deterministic, so a re-push updates documents in place rather than duplicating them.
 */
function docId(indexName, pagePath, slug) {
    return createHash('sha1').update(`${indexName}|${pagePath}|${slug}`).digest('hex')
}

/**
 * First path segment below the locale — "platform", "modules", "entity-flows", …
 * Exposed as a filter so the 233 AI-generated entity-flow reference pages can be
 * pushed down or hidden; unfiltered, they crowd out hand-written guides.
 */
function sectionOf(pagePath) {
    const withoutLocale = pagePath.replace(/^\/ar\//, '/')
    const segment = withoutLocale.split('/').filter(Boolean)[0]
    return segment || 'home'
}

function buildDocuments(index) {
    // `default` holds all 1598 pages; the other keys (videos, entity-flows,
    // release-notes) are subsets of it. Push `default` once and record membership,
    // so the existing "search in" selector still works off a single index.
    const membership = new Map()
    for (const [name, pages] of Object.entries(index)) {
        if (name === 'default')
            continue
        for (const page of pages) {
            if (!membership.has(page.path))
                membership.set(page.path, [])
            membership.get(page.path).push(name)
        }
    }

    const documents = []
    for (const page of index.default) {
        const indices = ['default', ...(membership.get(page.path) || [])]
        for (const section of page.contents) {
            // Sections that are pure heading with no prose carry no search value.
            if (!section.content && !section.header)
                continue
            documents.push({
                id: docId('default', page.path, section.slug || ''),
                pageTitle: page.title || '',
                header: section.header || '',
                content: section.content || '',
                path: page.path + (section.slug ? `#${section.slug}` : ''),
                pathLocale: page.pathLocale,
                hasCounterpart: !!page.hasCounterpart,
                section: sectionOf(page.path),
                indices,
            })
        }
    }
    return documents
}

async function applySettings() {
    // searchableAttributes is ORDERED, and that order is the field weighting: the
    // `attribute` ranking rule prefers matches in earlier fields. A page whose title
    // matches beats one that merely mentions the term in prose — which is the whole
    // fix for "results are irrelevant".
    await awaitTask(await meili('PATCH', `/indexes/${STAGING}/settings`, {
        searchableAttributes: ['pageTitle', 'header', 'content'],
        filterableAttributes: ['pathLocale', 'hasCounterpart', 'section', 'indices'],
        // Default order, stated explicitly so a future edit is a deliberate act.
        rankingRules: ['words', 'typo', 'proximity', 'attribute', 'sort', 'exactness'],
        // Arabic words are short; the default 9-character threshold for a second typo
        // rarely triggers on them. Lowering both helps "can't find pages I know exist"
        // without turning English results to mush.
        typoTolerance: {
            enabled: true,
            minWordSizeForTypos: {oneTypo: 4, twoTypos: 8},
        },
        // Default caps total hits at 1000; we only ever page through the top slice.
        pagination: {maxTotalHits: 200},
    }), 'settings')

    // Meilisearch tokenises through charabia, which carries an Arabic normaliser
    // (tashkeel stripping, alef folding) equivalent to the hand-written processTerm
    // this replaces. Declaring both locales stops per-field language auto-detection
    // from guessing wrong on short headings. Added in 1.10 — tolerated as optional so
    // the push still succeeds against an older build.
    try {
        await awaitTask(await meili('PUT', `/indexes/${STAGING}/settings/localized-attributes`, [
            {attributePatterns: ['*'], locales: ['ara', 'eng']},
        ]), 'localized-attributes')
    } catch (e) {
        console.warn(`  ! localizedAttributes not applied (${e.message})`)
        console.warn('    Falling back to automatic language detection.')
    }
}

async function main() {
    console.log(`Reading ${path.relative(REPO_ROOT, INDEX_JSON)}`)
    const index = JSON.parse(readFileSync(INDEX_JSON, 'utf8'))
    const documents = buildDocuments(index)
    const bytes = Buffer.byteLength(JSON.stringify(documents))
    console.log(`  ${index.default.length} pages -> ${documents.length} sections (${(bytes / 1048576).toFixed(1)} MB)`)

    if (DRY_RUN) {
        const bySection = {}
        const byLocale = {}
        for (const d of documents) {
            bySection[d.section] = (bySection[d.section] || 0) + 1
            byLocale[d.pathLocale] = (byLocale[d.pathLocale] || 0) + 1
        }
        console.log('  by locale: ', byLocale)
        console.log('  by section:', Object.fromEntries(
            Object.entries(bySection).sort((a, b) => b[1] - a[1])))
        console.log(`  unique ids: ${new Set(documents.map((d) => d.id)).size} (must equal ${documents.length})`)
        const arabic = documents.find((d) => d.pathLocale === '/ar/' && d.content.length > 80)
        console.log('  sample:', JSON.stringify({...arabic, content: arabic.content.slice(0, 80) + '…'}, null, 2))
        console.log('\nDry run — nothing was written.')
        return
    }

    console.log(`Target ${HOST} index "${INDEX}"`)

    // A staging index left behind by an earlier failed run would otherwise be
    // appended to rather than replaced.
    try {
        await awaitTask(await meili('DELETE', `/indexes/${STAGING}`), 'drop stale staging')
    } catch { /* absent is the normal case */ }

    await awaitTask(await meili('POST', '/indexes', {uid: STAGING, primaryKey: 'id'}), 'create staging')
    console.log('  settings...')
    await applySettings()

    for (let i = 0; i < documents.length; i += DOC_BATCH) {
        const batch = documents.slice(i, i + DOC_BATCH)
        await awaitTask(await meili('POST', `/indexes/${STAGING}/documents`, batch), 'add documents')
        console.log(`  indexed ${Math.min(i + DOC_BATCH, documents.length)}/${documents.length}`)
    }

    // swap-indexes needs BOTH indexes to already exist, and on a first run the live one
    // does not. Note the failure mode that makes this easy to get wrong: the endpoint
    // returns 202 with a taskUid even when an index is missing, so the error never
    // surfaces on the HTTP call — it lands in the task ("Index `x` not found") and is only
    // visible once awaited. Creating the live index up front is cheaper than reacting to
    // that, and keeps one code path instead of two.
    const existing = await meili('GET', '/indexes?limit=1000')
    const liveExists = existing.results.some((idx) => idx.uid === INDEX)
    if (!liveExists) {
        await awaitTask(await meili('POST', '/indexes', {uid: INDEX, primaryKey: 'id'}), 'create live index')
        console.log(`  created empty "${INDEX}" to swap against`)
    }

    await awaitTask(await meili('POST', '/swap-indexes', [{indexes: [STAGING, INDEX]}]), 'swap')
    await awaitTask(await meili('DELETE', `/indexes/${STAGING}`), 'drop previous')
    console.log(`  swapped into "${INDEX}", dropped previous`)

    const stats = await meili('GET', `/indexes/${INDEX}/stats`)
    console.log(`Done. ${stats.numberOfDocuments} documents live.`)
}

main().catch((e) => {
    console.error(`\nPush failed: ${e.message}`)
    process.exit(1)
})
