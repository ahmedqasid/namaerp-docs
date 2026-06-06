import {normalizeArabicPreservingLength} from './arabic-normalization'

/**
 * Client-side exact-substring search over the build-produced search-index.json.
 * Used as a fallback when the nlm docs-search servlet is unreachable (dev/offline).
 * Matching is done on a normalized copy (lowercase + Arabic folding, both
 * length-preserving) while the displayed snippets keep the original text.
 */

export type Word = { type: 'normal' | 'highlight' | 'ellipsis' | 'header'; str: string }
export type SearchResultItem = {
    path: string
    parentPageTitle: string
    title: string
    display: Word[]
}
export type PageContent = { header: string; slug: string; content: string }
export type PageIndexEntry = {
    title: string
    path: string
    pathLocale: string
    hasCounterpart: boolean
    contents: PageContent[]
}
export type SearchIndices = { [indexName: string]: PageIndexEntry[] }

let indicesPromise: Promise<SearchIndices> | null = null

export function loadSearchIndices(): Promise<SearchIndices> {
    if (!indicesPromise) {
        indicesPromise = fetch('/search-index.json').then((response) => {
            if (!response.ok)
                throw new Error(`search-index.json: HTTP ${response.status}`)
            return response.json()
        })
        indicesPromise.catch(() => (indicesPromise = null))
    }
    return indicesPromise
}

export function pageMatchesLocale(page: PageIndexEntry, locale: 'ar' | 'en' | null): boolean {
    if (!locale)
        return true
    if (locale === 'ar')
        return page.pathLocale === '/'
    return page.pathLocale === '/en/' || (page.pathLocale === '/' && !page.hasCounterpart)
}

export function substringSearch(
    indices: SearchIndices,
    indexName: string,
    query: string,
    locale: 'ar' | 'en' | null,
    limit = 50,
): SearchResultItem[] {
    const pages = indices[indexName] || indices['default'] || []
    const queryNorm = normalizeForMatch(query.trim())
    if (!queryNorm)
        return []

    const titleMatches: SearchResultItem[] = []
    const headerMatches: SearchResultItem[] = []
    const contentMatches: SearchResultItem[] = []

    for (const page of pages) {
        if (!pageMatchesLocale(page, locale))
            continue

        const titleDisplay = buildMatch(page.title, queryNorm)
        if (titleDisplay) {
            titleMatches.push({path: page.path, parentPageTitle: page.title, title: page.title, display: titleDisplay})
            continue
        }

        for (const section of page.contents) {
            const sectionPath = page.path + (section.slug ? `#${section.slug}` : '')
            const headerDisplay = buildMatch(section.header, queryNorm)
            if (headerDisplay) {
                headerMatches.push({path: sectionPath, parentPageTitle: page.title, title: page.title, display: headerDisplay})
                continue
            }
            const contentDisplay = buildMatch(section.content, queryNorm)
            if (contentDisplay) {
                contentMatches.push({
                    path: sectionPath,
                    parentPageTitle: page.title,
                    title: page.title,
                    display: section.header ? [{type: 'header', str: `${section.header}\n`}, ...contentDisplay] : contentDisplay,
                })
            }
        }
    }

    return [...titleMatches, ...headerMatches, ...contentMatches].slice(0, limit)
}

function normalizeForMatch(text: string): string {
    return normalizeArabicPreservingLength(text.toLowerCase())
}

const CONTEXT_BEFORE = 40
const CONTEXT_AFTER = 80

/**
 * Raw indexOf match (punctuation included — queries like `{link($this)}` must work).
 * Returns a highlighted snippet around the first occurrence, or null when not found.
 */
function buildMatch(text: string, queryNorm: string): Word[] | null {
    if (!text)
        return null
    const matchIndex = normalizeForMatch(text).indexOf(queryNorm)
    if (matchIndex < 0)
        return null

    const matchEnd = matchIndex + queryNorm.length
    const start = Math.max(0, matchIndex - CONTEXT_BEFORE)
    const end = Math.min(text.length, matchEnd + CONTEXT_AFTER)

    const display: Word[] = []
    if (start > 0)
        display.push({type: 'ellipsis', str: '… '})
    if (start < matchIndex)
        display.push({type: 'normal', str: text.slice(start, matchIndex)})
    display.push({type: 'highlight', str: text.slice(matchIndex, matchEnd)})
    if (matchEnd < end)
        display.push({type: 'normal', str: text.slice(matchEnd, end)})
    if (end < text.length)
        display.push({type: 'ellipsis', str: ' …'})
    return display
}
