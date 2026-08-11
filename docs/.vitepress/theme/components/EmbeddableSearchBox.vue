<template>
  <!-- Markup, class names and keyboard behaviour deliberately mirror VitePress's own
       VPLocalSearchBox so that replacing the built-in search does not mean relearning it.
       What differs is the engine (Meilisearch/Milvus over the wire rather than minisearch
       in the browser) and the mode/index/locale selectors, which the built-in box has no
       equivalent for. -->
  <div
      class="embeddable-search-box"
      :class="{'full-height': fullHeight}"
      role="button"
      aria-expanded="true"
      aria-haspopup="listbox"
      aria-labelledby="docs-search-label"
      @keydown="onKeydown"
  >
    <form class="search-bar" @pointerup="onSearchBarClick" @submit.prevent="">
      <label id="docs-search-label" :title="t.placeholder" for="docs-search-input">
        <span aria-hidden="true" class="vpi-search search-icon local-search-icon"/>
      </label>

      <div v-if="modal" class="search-actions before">
        <button class="back-button" type="button" :title="t.backButtonTitle" @click="closeRequested">
          <span class="vpi-arrow-left local-search-icon"/>
        </button>
      </div>

      <input
          id="docs-search-input"
          ref="inputRef"
          v-model="query"
          type="search"
          class="search-input"
          :placeholder="t.placeholder"
          :aria-activedescendant="selectedIndex > -1 ? 'docs-search-item-' + selectedIndex : undefined"
          :aria-controls="results.length ? 'docs-search-list' : undefined"
          aria-autocomplete="both"
          aria-labelledby="docs-search-label"
          autocapitalize="off"
          autocomplete="off"
          autocorrect="off"
          enterkeyhint="go"
          maxlength="64"
          spellcheck="false"
      />

      <div class="search-actions">
        <button
            class="clear-button"
            type="reset"
            :disabled="!query"
            :title="t.resetButtonTitle"
            @click="resetSearch"
        >
          <span class="vpi-delete local-search-icon"/>
        </button>
      </div>
    </form>

    <div class="search-filters">
      <label :title="t.searchMode">
        <select v-model="searchMode" class="search-filter-select">
          <option value="meili">{{ t.modeMeili }}</option>
          <option value="semantic">{{ t.modeSemantic }}</option>
          <option value="fulltext">{{ t.modeFulltext }}</option>
        </select>
      </label>
      <label v-if="searchMode !== 'semantic'">
        {{ t.searchIn }}
        <select v-model="searchIndex" class="search-filter-select">
          <option v-for="(label, name) in t.indexTitles" :key="name" :value="name">{{ label }}</option>
        </select>
      </label>
      <label>
        {{ t.language }}
        <select v-model="localeScope" class="search-filter-select">
          <option value="current">{{ t.currentLanguage }}</option>
          <option value="all">{{ t.allLanguages }}</option>
        </select>
      </label>
    </div>

    <div v-if="statusMessage" class="search-status" :class="{'is-error': statusIsError}">{{ statusMessage }}</div>

    <ul
        ref="resultsRef"
        class="results"
        :id="results.length ? 'docs-search-list' : undefined"
        :role="results.length ? 'listbox' : undefined"
        :aria-labelledby="results.length ? 'docs-search-label' : undefined"
        @mousemove="onMouseMove"
    >
      <li
          v-for="(result, index) in decoratedResults"
          :key="index"
          :id="'docs-search-item-' + index"
          :aria-selected="selectedIndex === index ? 'true' : 'false'"
          role="option"
      >
        <a
            class="result"
            :class="{selected: selectedIndex === index}"
            :href="result.path"
            :data-index="index"
            :aria-label="result.trail.join(' > ')"
            @focusin="selectedIndex = index"
            @click="closeRequested"
        >
          <div>
            <div class="titles" dir="auto">
              <span class="title-icon">#</span>
              <span
                  v-for="(crumb, crumbIndex) in result.trail"
                  :key="crumbIndex"
                  class="title"
                  :class="{main: crumbIndex === result.trail.length - 1}"
              >
                <span class="text">{{ crumb }}</span>
                <span v-if="crumbIndex < result.trail.length - 1" class="vpi-chevron-right local-search-icon"/>
              </span>
            </div>

            <div v-if="result.excerpt.length" class="excerpt-wrapper">
              <div class="excerpt" dir="auto">
                <span v-for="(word, wordIndex) in result.excerpt" :key="wordIndex" :class="'word-' + word.type">{{ word.str }}</span>
              </div>
              <div class="excerpt-gradient-bottom"/>
              <div class="excerpt-gradient-top"/>
            </div>
          </div>
        </a>
      </li>

      <li v-if="showNoResults" class="no-results">
        {{ t.noResultsText }} "<strong dir="auto">{{ query.trim() }}</strong>"
      </li>
    </ul>

    <div v-if="modal" class="search-keyboard-shortcuts">
      <span>
        <kbd :aria-label="t.navigateUpKeyAriaLabel"><span class="vpi-arrow-up navigate-icon"/></kbd>
        <kbd :aria-label="t.navigateDownKeyAriaLabel"><span class="vpi-arrow-down navigate-icon"/></kbd>
        {{ t.navigateText }}
      </span>
      <span>
        <kbd :aria-label="t.selectKeyAriaLabel"><span class="vpi-corner-down-left navigate-icon"/></kbd>
        {{ t.selectText }}
      </span>
      <span>
        <kbd :aria-label="t.closeKeyAriaLabel">esc</kbd>
        {{ t.closeText }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, nextTick, onMounted, ref, watch} from 'vue'
import {useData, useRouter} from 'vitepress'
import {loadSearchIndices, substringSearch, type SearchResultItem, type Word} from '../substring-search'

const SERVLET_URL = 'https://nlm.namasoft.com/nlm/docs-search'

const STORAGE_MODE = 'nama-docs-search-mode'
const STORAGE_INDEX = 'nama-docs-search-index'
const STORAGE_LOCALE_SCOPE = 'nama-docs-search-locale-scope'

// 'fuzzy' (Lucene) was retired from this picker: Meilisearch's typo tolerance covers the
// same ground with Arabic normalisation on top. The servlet still falls back to Lucene by
// itself when Meilisearch is down, so the mode lives on — just not as a reader-facing choice.
// A reader whose localStorage still holds 'fuzzy' lands back on 'meili': readSetting
// rejects anything outside this list.
const SEARCH_MODES = ['meili', 'semantic', 'fulltext'] as const
type SearchMode = typeof SEARCH_MODES[number]

defineProps<{ fullHeight?: boolean, modal?: boolean }>()
const emit = defineEmits<{ close: [] }>()

const {lang} = useData()
const router = useRouter()
const isArabic = computed(() => lang.value === 'ar')

const t = computed(() => isArabic.value ? {
  placeholder: 'ابحث في التوثيق…',
  searchMode: 'طريقة البحث',
  modeMeili: 'بحث بالكلمات',
  modeSemantic: 'بحث ذكي (AI)',
  modeFulltext: 'مطابقة نص حرفية',
  searchIn: 'البحث في:',
  language: 'اللغة:',
  currentLanguage: 'العربية',
  allLanguages: 'كل اللغات',
  indexTitles: {'default': 'كل المحتوى', 'videos': 'الفيديوهات', 'entity-flows': 'مسارات الكيانات', 'release-notes': 'ملاحظات الإصدارات'},
  searching: 'جارٍ البحث…',
  noResultsText: 'لا توجد نتائج لـ',
  resetButtonTitle: 'مسح البحث',
  backButtonTitle: 'إغلاق البحث',
  navigateText: 'للتنقل',
  navigateUpKeyAriaLabel: 'سهم لأعلى',
  navigateDownKeyAriaLabel: 'سهم لأسفل',
  selectText: 'للفتح',
  selectKeyAriaLabel: 'إدخال',
  closeText: 'للإغلاق',
  closeKeyAriaLabel: 'خروج',
  offlineFallback: 'تعذر الوصول لخادم البحث — تم عرض نتائج المطابقة الحرفية المحلية',
  offlineNoIndex: 'تعذر الوصول لخادم البحث ولا يوجد فهرس محلي',
} : {
  placeholder: 'Search the documentation…',
  searchMode: 'Search mode',
  modeMeili: 'Keyword Search',
  modeSemantic: 'AI Search',
  modeFulltext: 'Exact Text Match',
  searchIn: 'Search in:',
  language: 'Language:',
  currentLanguage: 'English',
  allLanguages: 'All languages',
  indexTitles: {'default': 'All Content', 'videos': 'Videos', 'entity-flows': 'Entity Flows', 'release-notes': 'Release Notes'},
  searching: 'Searching…',
  noResultsText: 'No results for',
  resetButtonTitle: 'Reset search',
  backButtonTitle: 'Close search',
  navigateText: 'to navigate',
  navigateUpKeyAriaLabel: 'up arrow',
  navigateDownKeyAriaLabel: 'down arrow',
  selectText: 'to select',
  selectKeyAriaLabel: 'enter',
  closeText: 'to close',
  closeKeyAriaLabel: 'escape',
  offlineFallback: 'Search server unreachable — showing local exact-text matches',
  offlineNoIndex: 'Search server unreachable and no local index available',
})

const query = ref('')
// Meilisearch is the default: it replaced the VitePress built-in navbar search, so it
// is what a reader gets without touching the mode selector.
const searchMode = ref<SearchMode>('meili')
const searchIndex = ref('default')
const localeScope = ref<'current' | 'all'>('current')
const results = ref<SearchResultItem[]>([])
const statusMessage = ref('')
const statusIsError = ref(false)
const selectedIndex = ref(-1)
const disableMouseOver = ref(true)
const searchRan = ref(false)
const inputRef = ref<HTMLInputElement>()
const resultsRef = ref<HTMLElement>()

const showNoResults = computed(() => searchRan.value && !!query.value.trim() && !results.value.length)

/**
 * Splits each hit into the two-part shape VitePress renders: a `page › section`
 * breadcrumb and a text excerpt below it. The servlet's engines describe a hit
 * differently — Meilisearch puts the heading in `title`, while the semantic and
 * exact-text paths leave it as the first `header` word of `display` — so the heading is
 * read from whichever carries it, and dropped from the excerpt once promoted into the
 * breadcrumb, rather than being printed twice.
 */
const decoratedResults = computed(() => results.value.map((result) => {
  const words: Word[] = result.display ?? []
  const leadingHeader = words[0]?.type === 'header' ? words[0].str.trim() : ''
  const page = (result.parentPageTitle || '').trim()
  const title = (result.title || '').trim()
  const section = title && title !== page ? title : (leadingHeader !== page ? leadingHeader : '')

  const trail = [page || title || result.path]
  if (section && section !== trail[0])
    trail.push(section)

  return {
    path: result.path,
    trail,
    excerpt: leadingHeader && leadingHeader === section ? words.slice(1) : words,
  }
}))

onMounted(() => {
  searchMode.value = readSetting(STORAGE_MODE, [...SEARCH_MODES], searchMode.value) as SearchMode
  searchIndex.value = readSetting(STORAGE_INDEX, Object.keys(t.value.indexTitles), searchIndex.value)
  localeScope.value = readSetting(STORAGE_LOCALE_SCOPE, ['current', 'all'], localeScope.value) as 'current' | 'all'
  focusInput()
})

watch(searchMode, (value) => saveSetting(STORAGE_MODE, value))
watch(searchIndex, (value) => saveSetting(STORAGE_INDEX, value))
watch(localeScope, (value) => saveSetting(STORAGE_LOCALE_SCOPE, value))

// Pre-selecting the first hit is what lets Enter open a result without arrowing down first.
watch(results, (list) => {
  selectedIndex.value = list.length ? 0 : -1
  scrollToSelectedResult()
})

let debounceTimer: ReturnType<typeof setTimeout> | null = null
let abortController: AbortController | null = null
let searchSequence = 0

watch([query, searchMode, searchIndex, localeScope], () => {
  if (debounceTimer)
    clearTimeout(debounceTimer)
  // Only the AI mode pays an embedding round-trip; the rest answer fast enough to
  // search as you type.
  debounceTimer = setTimeout(runSearch, searchMode.value === 'semantic' ? 350 : 150)
})

async function runSearch() {
  const queryStr = query.value.trim()
  const sequence = ++searchSequence
  abortController?.abort()

  if (!queryStr) {
    results.value = []
    statusMessage.value = ''
    statusIsError.value = false
    searchRan.value = false
    return
  }

  statusMessage.value = t.value.searching
  statusIsError.value = false

  try {
    abortController = new AbortController()
    const response = await fetch(SERVLET_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        query: queryStr,
        indexUrl: window.location.origin,
        indexName: searchMode.value === 'semantic' ? 'default' : searchIndex.value,
        searchMode: searchMode.value,
        locale: requestedLocale(),
      }),
      signal: abortController.signal,
    })
    if (!response.ok)
      throw new Error('docs-search: HTTP ' + response.status)
    const servletResults = await response.json()
    if (sequence !== searchSequence)
      return
    results.value = servletResults
    searchRan.value = true
    // "No results" is the empty-state row now, not a status line above the list.
    statusMessage.value = ''
  } catch (error: any) {
    if (error?.name === 'AbortError' || sequence !== searchSequence)
      return
    await runLocalFallback(queryStr, sequence)
  }
}

async function runLocalFallback(queryStr: string, sequence: number) {
  try {
    const indices = await loadSearchIndices()
    if (sequence !== searchSequence)
      return
    results.value = substringSearch(indices, searchIndex.value, queryStr, requestedLocale())
    searchRan.value = true
    statusMessage.value = t.value.offlineFallback
    statusIsError.value = false
  } catch {
    if (sequence !== searchSequence)
      return
    results.value = []
    searchRan.value = true
    statusMessage.value = t.value.offlineNoIndex
    statusIsError.value = true
  }
}

function requestedLocale(): 'ar' | 'en' | null {
  if (localeScope.value === 'all')
    return null
  return isArabic.value ? 'ar' : 'en'
}

/**
 * Arrow/Enter/Escape are bound on the box rather than on the window, because on the
 * full-search page this renders inline rather than as a modal: there the arrow keys must
 * keep scrolling the page whenever the reader is not inside the search box.
 */
function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeRequested()
    return
  }
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    if (!results.value.length)
      return
    event.preventDefault()
    const delta = event.key === 'ArrowDown' ? 1 : -1
    selectedIndex.value = (selectedIndex.value + delta + results.value.length) % results.value.length
    disableMouseOver.value = true
    scrollToSelectedResult()
    return
  }
  if (event.key === 'Enter' && !event.isComposing) {
    const selected = results.value[selectedIndex.value]
    if (!selected)
      return
    event.preventDefault()
    closeRequested()
    router.go(selected.path)
  }
}

function scrollToSelectedResult() {
  nextTick(() => resultsRef.value?.children[selectedIndex.value]?.scrollIntoView({block: 'nearest'}))
}

/**
 * Once the keyboard has moved the selection, a stationary mouse that happens to sit over
 * another result must not steal it back — only real pointer movement may.
 */
function onMouseMove(event: MouseEvent) {
  if (!disableMouseOver.value)
    return
  const element = (event.target as HTMLElement)?.closest<HTMLAnchorElement>('.result')
  const index = Number.parseInt(element?.dataset.index ?? '')
  if (index >= 0 && index !== selectedIndex.value)
    selectedIndex.value = index
  disableMouseOver.value = false
}

function onSearchBarClick(event: PointerEvent) {
  if (event.pointerType === 'mouse')
    focusInput()
}

function focusInput(select = true) {
  inputRef.value?.focus()
  if (select)
    inputRef.value?.select()
}

function resetSearch() {
  query.value = ''
  nextTick(() => focusInput(false))
}

function closeRequested() {
  emit('close')
}

function readSetting(key: string, allowed: string[], fallback: string): string {
  try {
    const stored = localStorage.getItem(key)
    return stored && allowed.includes(stored) ? stored : fallback
  } catch {
    return fallback
  }
}

function saveSetting(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // localStorage unavailable — settings just won't persist
  }
}
</script>

<style scoped>
.embeddable-search-box {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 0;
}

.search-bar {
  display: flex;
  align-items: center;
  padding: 0 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  cursor: text;
}

.search-bar:focus-within {
  border-color: var(--vp-c-brand-1);
}

.local-search-icon {
  display: block;
  font-size: 18px;
}

.navigate-icon {
  display: block;
  font-size: 14px;
}

.search-icon {
  margin: 8px;
}

.search-input {
  width: 100%;
  padding: 6px 12px;
  background: transparent;
  color: var(--vp-c-text-1);
  font-size: inherit;
}

.search-actions {
  display: flex;
  gap: 4px;
}

.search-actions button {
  padding: 8px;
  color: var(--vp-c-text-2);
}

.search-actions button:not([disabled]):hover {
  color: var(--vp-c-brand-1);
}

.search-actions button.clear-button:disabled {
  opacity: 0.37;
}

@media (any-pointer: coarse) {
  .search-actions {
    gap: 8px;
  }
}

@media (min-width: 769px) {
  .search-actions.before {
    display: none;
  }
}

@media (max-width: 767px) {
  .search-bar {
    padding: 0 8px;
  }

  .search-icon {
    display: none;
  }

  .search-input {
    padding: 6px 4px;
  }
}

.search-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  margin-top: -6px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.search-filters label {
  display: flex;
  align-items: center;
  gap: 6px;
}

.search-filter-select {
  padding: 3px 6px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  font-size: 12px;
}

.search-filter-select:hover {
  border-color: var(--vp-c-brand-1);
}

.search-status {
  margin-top: -8px;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.search-status.is-error {
  color: var(--vp-c-danger-1);
}

.results {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-height: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
}

.full-height .results {
  max-height: calc(100vh - 320px);
}

.result {
  display: flex;
  align-items: center;
  gap: 8px;
  border: solid 2px var(--vp-local-search-result-border);
  border-radius: 4px;
  background: var(--vp-local-search-result-bg);
  color: var(--vp-c-text-1);
  line-height: 1rem;
  text-decoration: none;
  transition: none;
  outline: none;
}

.result > div {
  width: 100%;
  margin: 12px;
  overflow: hidden;
}

@media (max-width: 767px) {
  .result > div {
    margin: 8px;
  }
}

.result.selected {
  --vp-local-search-result-bg: var(--vp-local-search-result-selected-bg);
  border-color: var(--vp-local-search-result-selected-border);
}

.result.selected .titles,
.result.selected .title-icon {
  color: var(--vp-c-brand-1) !important;
}

.titles {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 2px 0;
}

.title {
  display: flex;
  align-items: center;
  gap: 4px;
}

.title.main {
  font-weight: 500;
}

.title-icon {
  opacity: 0.5;
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.excerpt-wrapper {
  position: relative;
}

.excerpt {
  position: relative;
  max-height: 140px;
  margin-top: 4px;
  overflow: hidden;
  opacity: 50%;
  pointer-events: none;
  font-size: 0.8rem;
  line-height: 130%;
  white-space: pre-line;
}

.result.selected .excerpt {
  opacity: 1;
}

.excerpt .word-highlight {
  padding: 0 2px;
  border-radius: 2px;
  background-color: var(--vp-local-search-highlight-bg);
  color: var(--vp-local-search-highlight-text);
}

.excerpt .word-header {
  font-weight: 600;
}

.excerpt .word-ellipsis {
  opacity: 0.6;
}

.excerpt-gradient-bottom {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 8px;
  background: linear-gradient(transparent, var(--vp-local-search-result-bg));
}

.excerpt-gradient-top {
  position: absolute;
  top: -1px;
  left: 0;
  width: 100%;
  height: 8px;
  background: linear-gradient(var(--vp-local-search-result-bg), transparent);
}

.no-results {
  padding: 12px;
  font-size: 0.9rem;
  text-align: center;
}

.search-keyboard-shortcuts {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  opacity: 75%;
  font-size: 0.8rem;
  line-height: 14px;
}

.search-keyboard-shortcuts span {
  display: flex;
  align-items: center;
  gap: 4px;
}

.search-keyboard-shortcuts kbd {
  display: inline-block;
  min-width: 24px;
  padding: 3px 6px;
  border: 1px solid rgba(128, 128, 128, 0.15);
  border-radius: 4px;
  background: rgba(128, 128, 128, 0.1);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
  vertical-align: middle;
}

@media (max-width: 767px) {
  .search-keyboard-shortcuts {
    display: none;
  }
}
</style>
