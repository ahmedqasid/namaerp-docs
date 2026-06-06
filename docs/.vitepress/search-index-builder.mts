import {Parser} from 'htmlparser2'
import fs from 'node:fs'
import path from 'node:path'

/**
 * Builds the server-consumable search index (search-index.json) during `vitepress build`.
 *
 * The JSON is consumed by:
 *  - the nlm docs-search servlet (Lucene fuzzy search + Milvus semantic embeddings)
 *  - the client-side substring-search fallback in EmbeddableSearchBox (fetched lazily)
 *
 * Schema (per index): [{title, path, pathLocale, hasCounterpart, contents: [{header, slug, content}]}]
 * `default` must stay the FIRST key — the server-side embedder only processes the first index.
 *
 * There is no dev-mode generation: `vitepress dev` serves the file produced by the last
 * `npm run docs:build` (see devSearchIndexPlugin).
 */

export type PageContent = { header: string; slug: string; content: string }
export type PageIndexEntry = {
    title: string
    path: string
    pathLocale: string
    hasCounterpart: boolean
    contents: PageContent[]
}
export type SearchIndices = { [indexName: string]: PageIndexEntry[] }

export const SEARCH_INDEX_FILE_NAME = 'search-index.json'

const INDEX_PATH_PREFIXES: { [indexName: string]: string[] } = {
    'videos': ['/videos/', '/en/videos/'],
    'entity-flows': ['/entity-flows/'],
    'release-notes': ['/release-notes/'],
}

// The search pages themselves must not show up as search results
const EXCLUDED_PAGES = new Set(['full-search.md', 'en/full-search.md', '404.md'])

const collectedPages: PageIndexEntry[] = []

export function collectPageForSearchIndex(html: string, relativeMdPath: string, title: string) {
    if (!relativeMdPath?.endsWith('.md') || EXCLUDED_PAGES.has(relativeMdPath))
        return
    const sitePath = mdPathToSitePath(relativeMdPath)
    collectedPages.push({
        title: title || '',
        path: sitePath,
        pathLocale: sitePath.startsWith('/en/') ? '/en/' : '/',
        hasCounterpart: false, // computed in writeSearchIndexJSON once all pages are known
        contents: extractSections(html),
    })
}

export function writeSearchIndexJSON(outDir: string, stableCopyPath: string) {
    const pages = collectedPages
        .filter((page) => page.contents.length > 0)
        .sort((a, b) => a.path.localeCompare(b.path))
    computeHasCounterpart(pages)

    const indices: SearchIndices = {default: pages}
    for (const [indexName, prefixes] of Object.entries(INDEX_PATH_PREFIXES))
        indices[indexName] = pages.filter((page) => prefixes.some((prefix) => page.path.startsWith(prefix)))

    const json = JSON.stringify(indices)
    fs.writeFileSync(path.join(outDir, SEARCH_INDEX_FILE_NAME), json, 'utf8')
    fs.writeFileSync(stableCopyPath, json, 'utf8')
    console.log(`[search-index] wrote ${pages.length} pages (` +
        Object.entries(indices).map(([name, list]) => `${name}: ${list.length}`).join(', ') + ')')
    collectedPages.length = 0
}

/** Serves the last-built search-index.json in `vitepress dev` for the substring-search fallback. */
export function devSearchIndexPlugin(stableCopyPath: string) {
    return {
        name: 'nama-dev-search-index',
        configureServer(server: any) {
            server.middlewares.use('/' + SEARCH_INDEX_FILE_NAME, (_req: any, res: any) => {
                if (fs.existsSync(stableCopyPath)) {
                    res.setHeader('Content-Type', 'application/json; charset=utf-8')
                    fs.createReadStream(stableCopyPath).pipe(res)
                } else {
                    res.statusCode = 404
                    res.end('search-index.json not built yet — run `npm run docs:build` once')
                }
            })
        },
    }
}

function mdPathToSitePath(relativeMdPath: string) {
    return ('/' + relativeMdPath)
        .replace(/\.md$/, '.html')
        .replace(/(^|\/)index\.html$/, '$1')
}

/**
 * A root (Arabic) page "has a counterpart" when the same path exists under /en/, and vice versa.
 * The servlet uses this for locale filtering: English-locale searches include untranslated
 * root-only content (entity-flows, release-notes, faq) so it stays findable from /en/ pages.
 */
function computeHasCounterpart(pages: PageIndexEntry[]) {
    const rootPaths = new Set<string>()
    const enPathsAsRoot = new Set<string>()
    for (const page of pages) {
        if (page.pathLocale === '/en/')
            enPathsAsRoot.add(stripEnPrefix(page.path))
        else
            rootPaths.add(page.path)
    }
    for (const page of pages) {
        if (page.pathLocale === '/en/')
            page.hasCounterpart = rootPaths.has(stripEnPrefix(page.path))
        else
            page.hasCounterpart = enPathsAsRoot.has(page.path)
    }
}

function stripEnPrefix(sitePath: string) {
    return sitePath.replace(/^\/en\//, '/')
}

/**
 * Splits the rendered page HTML (scoped to the `.vp-doc` content container) into sections,
 * one per heading, mirroring the legacy VuePress extractor:
 *  - text before the first heading goes into a section with an empty header/slug
 *  - script/style, `.header-anchor` links, `.line-numbers-wrapper` gutters and anything
 *    inside `.ignore-in-full-text-search` (generated index pages) are excluded
 * Content keeps its original characters (including punctuation and Arabic forms) — substring
 * search depends on it; any normalization happens at query time on both sides.
 */
function extractSections(html: string): PageContent[] {
    const results: PageContent[] = []
    let scope: PageContent = {header: '', slug: '', content: ''}
    results.push(scope)

    let insideDoc = false
    let docDepth = 0
    let ignoreDepth = 0
    let headerDepth = 0

    const parser = new Parser({
        onopentag(name, attributes) {
            if (!insideDoc) {
                if (hasClass(attributes, 'vp-doc')) {
                    insideDoc = true
                    docDepth = 0
                }
                return
            }
            docDepth++
            if (ignoreDepth) {
                ignoreDepth++
                return
            }
            if (name === 'script' || name === 'style'
                || hasClass(attributes, 'ignore-in-full-text-search')
                || hasClass(attributes, 'header-anchor')
                || hasClass(attributes, 'line-numbers-wrapper')) {
                ignoreDepth = 1
                return
            }
            if (headerDepth) {
                headerDepth++
                return
            }
            if (/^h[1-6]$/.test(name) && attributes.id) {
                scope = {header: '', slug: attributes.id, content: ''}
                results.push(scope)
                headerDepth = 1
            }
        },
        ontext(text) {
            if (!insideDoc || ignoreDepth)
                return
            if (headerDepth)
                scope.header += text
            else
                scope.content += text
        },
        onclosetag() {
            if (!insideDoc)
                return
            if (docDepth === 0) {
                insideDoc = false
                return
            }
            docDepth--
            if (ignoreDepth)
                ignoreDepth--
            else if (headerDepth)
                headerDepth--
        },
    })
    parser.write(html)
    parser.end()

    return results
        .map((section) => ({
            header: section.header.replace(/\s+/g, ' ').trim(),
            slug: section.slug,
            content: section.content.replace(/\s{2,}/g, ' ').trim(),
        }))
        .filter((section) => section.header || section.content)
}

function hasClass(attributes: { [name: string]: string }, className: string) {
    return (attributes.class || '').split(/\s+/).includes(className)
}
