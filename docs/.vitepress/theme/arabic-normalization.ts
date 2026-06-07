/**
 * Arabic search normalization, applied identically on both sides of a match
 * (indexed/searched text and the query) so hamza variants, taa-marbuta, etc.
 * don't prevent matches. All replacements are 1 char → 1 char, so offsets into
 * the original text stay valid (the substring search relies on this to
 * highlight the original, un-normalized text).
 *
 * NOTE: the built-in local search's miniSearch processTerm in config.mts
 * duplicates this logic inline — VitePress serializes that function and
 * re-evals it in the browser, so it cannot import from this file. Keep both
 * in sync when changing the foldings.
 */
const FOLDINGS: [string, string][] = [
    ['أ', 'ا'], ['إ', 'ا'], ['آ', 'ا'], ['ء', 'ا'],
    ['ة', 'ه'],
    ['ى', 'ي'], ['ئ', 'ي'],
    ['ؤ', 'و'],
]

export function normalizeArabic(text: string): string {
    if (!text)
        return text
    let result = text.replace(/[ً-ْٰ]/g, '') // tashkeel diacritics
        .replace(/ـ/g, '') // tatweel
    for (const [from, to] of FOLDINGS)
        result = result.replaceAll(from, to)
    return result
}

/**
 * Variant for substring (indexOf) matching: keeps the string length identical to the
 * input by skipping the diacritics/tatweel removal, folding characters only.
 */
export function normalizeArabicPreservingLength(text: string): string {
    if (!text)
        return text
    let result = text
    for (const [from, to] of FOLDINGS)
        result = result.replaceAll(from, to)
    return result
}
