<template>
  <div class="embeddable-search-box" :class="{ 'full-height': fullHeight }">
    <div class="search-controls">
      <input
          ref="inputRef"
          v-model="query"
          type="search"
          :placeholder="t.placeholder"
          autocomplete="off"
          spellcheck="false"
          @keydown.down.prevent="moveFocus(1)"
          @keydown.up.prevent="moveFocus(-1)"
          @keydown.enter.prevent="openResult(focusIndex)"
      />
      <select v-model="searchMode" class="search-mode-selector" :title="t.searchMode">
        <option value="semantic">{{ t.modeSemantic }}</option>
        <option value="fuzzy">{{ t.modeFuzzy }}</option>
        <option value="fulltext">{{ t.modeFulltext }}</option>
      </select>
    </div>

    <div class="search-filters">
      <label v-if="searchMode !== 'semantic'">
        {{ t.searchIn }}
        <select v-model="searchIndex" class="search-index-selector">
          <option v-for="(label, name) in t.indexTitles" :key="name" :value="name">{{ label }}</option>
        </select>
      </label>
      <label>
        {{ t.language }}
        <select v-model="localeScope" class="search-locale-selector">
          <option value="current">{{ t.currentLanguage }}</option>
          <option value="all">{{ t.allLanguages }}</option>
        </select>
      </label>
    </div>

    <div v-if="statusMessage" class="search-status" :class="{ 'is-error': statusIsError }">{{ statusMessage }}</div>

    <ul v-if="results.length" ref="resultsRef" class="inline-results" @mouseleave="focusIndex = -1">
      <li
          v-for="(result, index) in results"
          :key="index"
          class="search-result"
          :class="{ focused: index === focusIndex }"
          @mouseenter="focusIndex = index"
      >
        <a :href="result.path" @click="closeRequested">
          <div
              v-if="result.parentPageTitle && results[index - 1]?.parentPageTitle !== result.parentPageTitle"
              class="result-group-title"
              dir="auto"
          >
            {{ result.parentPageTitle }}
          </div>
          <div class="result-row">
            <div class="result-page-title" dir="auto">{{ result.title || result.path }}</div>
            <div class="result-snippet" dir="auto">
              <span v-for="(word, wordIndex) in result.display" :key="wordIndex" :class="'word-' + word.type">{{ word.str }}</span>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue'
import {useData, useRouter} from 'vitepress'
import {loadSearchIndices, substringSearch, type SearchResultItem} from '../substring-search'

const SERVLET_URL = 'https://nlm.namasoft.com/nlm/docs-search'

const STORAGE_MODE = 'nama-docs-search-mode'
const STORAGE_INDEX = 'nama-docs-search-index'
const STORAGE_LOCALE_SCOPE = 'nama-docs-search-locale-scope'

type SearchMode = 'semantic' | 'fuzzy' | 'fulltext'

const props = defineProps<{ fullHeight?: boolean }>()
const emit = defineEmits<{ close: [] }>()

const {lang} = useData()
const router = useRouter()
const isArabic = computed(() => lang.value === 'ar')

const t = computed(() => isArabic.value ? {
  placeholder: 'ابحث في التوثيق…',
  searchMode: 'طريقة البحث',
  modeSemantic: 'بحث ذكي (AI)',
  modeFuzzy: 'بحث تقريبي',
  modeFulltext: 'مطابقة نص حرفية',
  searchIn: 'البحث في:',
  language: 'اللغة:',
  currentLanguage: 'العربية',
  allLanguages: 'كل اللغات',
  indexTitles: {'default': 'كل المحتوى', 'videos': 'الفيديوهات', 'entity-flows': 'مسارات الكيانات', 'release-notes': 'ملاحظات الإصدارات'},
  searching: 'جارٍ البحث…',
  noResults: 'لا توجد نتائج',
  offlineFallback: 'تعذر الوصول لخادم البحث — تم عرض نتائج المطابقة الحرفية المحلية',
  offlineNoIndex: 'تعذر الوصول لخادم البحث ولا يوجد فهرس محلي',
} : {
  placeholder: 'Search the documentation…',
  searchMode: 'Search mode',
  modeSemantic: 'AI Search',
  modeFuzzy: 'Fuzzy Search',
  modeFulltext: 'Exact Text Match',
  searchIn: 'Search in:',
  language: 'Language:',
  currentLanguage: 'English',
  allLanguages: 'All languages',
  indexTitles: {'default': 'All Content', 'videos': 'Videos', 'entity-flows': 'Entity Flows', 'release-notes': 'Release Notes'},
  searching: 'Searching…',
  noResults: 'No results',
  offlineFallback: 'Search server unreachable — showing local exact-text matches',
  offlineNoIndex: 'Search server unreachable and no local index available',
})

const query = ref('')
const searchMode = ref<SearchMode>('semantic')
const searchIndex = ref('default')
const localeScope = ref<'current' | 'all'>('current')
const results = ref<SearchResultItem[]>([])
const statusMessage = ref('')
const statusIsError = ref(false)
const focusIndex = ref(-1)
const inputRef = ref<HTMLInputElement>()
const resultsRef = ref<HTMLElement>()

onMounted(() => {
  searchMode.value = readSetting(STORAGE_MODE, ['semantic', 'fuzzy', 'fulltext'], searchMode.value) as SearchMode
  searchIndex.value = readSetting(STORAGE_INDEX, Object.keys(t.value.indexTitles), searchIndex.value)
  localeScope.value = readSetting(STORAGE_LOCALE_SCOPE, ['current', 'all'], localeScope.value) as 'current' | 'all'
  inputRef.value?.focus()
})

watch(searchMode, (value) => saveSetting(STORAGE_MODE, value))
watch(searchIndex, (value) => saveSetting(STORAGE_INDEX, value))
watch(localeScope, (value) => saveSetting(STORAGE_LOCALE_SCOPE, value))

let debounceTimer: ReturnType<typeof setTimeout> | null = null
let abortController: AbortController | null = null
let searchSequence = 0

watch([query, searchMode, searchIndex, localeScope], () => {
  if (debounceTimer)
    clearTimeout(debounceTimer)
  debounceTimer = setTimeout(runSearch, searchMode.value === 'semantic' ? 350 : 150)
})

async function runSearch() {
  const queryStr = query.value.trim()
  const sequence = ++searchSequence
  abortController?.abort()
  focusIndex.value = -1

  if (!queryStr) {
    results.value = []
    statusMessage.value = ''
    statusIsError.value = false
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
      throw new Error(`docs-search: HTTP ${response.status}`)
    const servletResults = await response.json()
    if (sequence !== searchSequence)
      return
    results.value = servletResults
    statusMessage.value = servletResults.length ? '' : t.value.noResults
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
    statusMessage.value = results.value.length ? t.value.offlineFallback : `${t.value.offlineFallback} — ${t.value.noResults}`
    statusIsError.value = false
  } catch {
    if (sequence !== searchSequence)
      return
    results.value = []
    statusMessage.value = t.value.offlineNoIndex
    statusIsError.value = true
  }
}

function requestedLocale(): 'ar' | 'en' | null {
  if (localeScope.value === 'all')
    return null
  return isArabic.value ? 'ar' : 'en'
}

function moveFocus(delta: number) {
  if (!results.value.length)
    return
  focusIndex.value = (focusIndex.value + delta + results.value.length) % results.value.length
  resultsRef.value?.children[focusIndex.value]?.scrollIntoView({block: 'nearest'})
}

function openResult(index: number) {
  const result = results.value[index] || results.value[0]
  if (!result)
    return
  closeRequested()
  router.go(result.path)
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
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  background: var(--vp-c-bg);
}

.search-controls {
  display: flex;
  gap: 8px;
}

.search-controls input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  font-size: 14px;
}

.search-controls input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}

.search-mode-selector,
.search-index-selector,
.search-locale-selector {
  padding: 6px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  font-size: 13px;
}

.search-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 8px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.search-filters label {
  display: flex;
  align-items: center;
  gap: 6px;
}

.search-status {
  margin-top: 12px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.search-status.is-error {
  color: var(--vp-c-danger-1);
}

.inline-results {
  list-style: none;
  margin: 12px 0 0;
  padding: 0;
  border-top: 1px solid var(--vp-c-divider);
  overflow-y: auto;
  max-height: 420px;
}

.full-height .inline-results {
  max-height: calc(100vh - 320px);
}

.search-result a {
  display: block;
  padding: 8px 10px;
  text-decoration: none;
  color: var(--vp-c-text-1);
  border-radius: 6px;
}

.search-result.focused a {
  background: var(--vp-c-bg-soft);
}

.result-group-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  border-bottom: 1px dashed var(--vp-c-divider);
  padding: 8px 0 2px;
  margin-bottom: 4px;
}

.result-page-title {
  font-size: 14px;
  font-weight: 500;
}

.result-snippet {
  font-size: 12.5px;
  color: var(--vp-c-text-2);
  white-space: pre-line;
}

.result-snippet .word-highlight {
  color: var(--vp-c-brand-1);
  font-weight: 600;
  background: var(--vp-c-brand-soft);
  border-radius: 2px;
}

.result-snippet .word-header {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.result-snippet .word-ellipsis {
  opacity: 0.6;
}
</style>
