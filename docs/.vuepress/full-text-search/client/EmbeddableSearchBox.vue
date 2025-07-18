<template>
  <div class="embeddable-search-box" :class="{ compact: compact, inline: inline, 'show-results': showResults, 'full-height': fullHeight }">
    <div class="search-box" role="search">
      <div class="search-controls">
        <select 
          v-if="!fixedSearchIndex && searchIndexClassNames && searchIndexClassNames.length > 1"
          v-model="currentSearchIndex"
          class="search-index-selector"
          @change="onIndexChange"
        >
          <option v-for="indexName in searchIndexClassNames" :key="indexName" :value="indexName">
            {{ searchIndexTitles[indexName] || indexName }}
          </option>
        </select>
        <input
            ref="input"
            v-model="query"
            aria-label="Search"
            :class="{ focused: focused }"
            :placeholder="placeholder"
            autocomplete="off"
            spellcheck="false"
            @focus="() => (focused = true)"
            @blur="() => (focused = false)"
            @keyup.enter="go(focusIndex)"
            @keyup.up="onUp"
            @keyup.down="onDown"
        />
      </div>
      
      <!-- Inline Results Display -->
      <div v-if="showResults || alwaysShowResults" class="inline-results" ref="resultsEl">
        <div
            v-for="(s, i) in suggestions"
            :key="i"
            class="result-item"
            :class="{ focused: i === focusIndex }"
            @mousedown="go(i)"
            @mouseenter="focus(i)"
            :id="'search-el-'+i"
        >
          <a :href="s.path" @click.prevent>
            <div
                v-if="
                s.parentPageTitle &&
                (!suggestions[i - 1] ||
                  suggestions[i - 1].parentPageTitle !== s.parentPageTitle)
              "
                class="parent-page-title"
            >
              {{ s.parentPageTitle }}
            </div>
            <div class="result-content">
              <div class="page-title">{{ s.title || s.path }}</div>
              <div class="result-excerpt">
                <template v-for="(w, wi) in s.display" :key="wi">
                  <span :class="w.type">{{ w.str }}</span>
                </template>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouteLocale} from "@vuepress/client";
import type {LocaleConfig} from "@vuepress/shared";
import {watch, onMounted, ref, computed, toRefs} from "vue";
import {useRouter} from "vue-router";
import {useSuggestions, useSearchIndexManager} from "./engine";

type SearchBoxLocales = LocaleConfig<{
  placeholder: string;
}>;

interface Props {
  locales?: SearchBoxLocales;
  compact?: boolean;
  inline?: boolean;
  showResults?: boolean;
  searchIndex?: string;
  fullHeight?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  locales: () => ({}),
  compact: false,
  inline: false,
  showResults: false,
  searchIndex: undefined,
  fullHeight: false,
});

// Always show results when component is focused for better UX
const alwaysShowResults = computed(() => true);

const {locales, searchIndex: fixedSearchIndex} = toRefs(props);
const query = ref("");
const focused = ref(false);
const focusIndex = ref(-1);
const resultsEl = ref<HTMLElement | null>(null);
const suggestions = useSuggestions(query);
const { currentSearchIndex, searchIndexClassNames, searchIndexTitles, setSearchIndex } = useSearchIndexManager();


// Override search index if specified
onMounted(() => {
  if (fixedSearchIndex.value) {
    setSearchIndex(fixedSearchIndex.value);
  }
});

watch(fixedSearchIndex, (newIndex) => {
  if (newIndex) {
    setSearchIndex(newIndex);
  }
});

watch(focusIndex, (newIndex) => {
  if (newIndex < 0)
    return;
  if (!resultsEl.value)
    return;
  let focusedEl = resultsEl.value.querySelector("#search-el-" + newIndex);

  if (focusedEl)
    focusedEl.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest'
    });
})

const activeSuggestion = computed(
    () => query.value && focused.value && suggestions.value.length,
);

const router = useRouter();
const routeLocale = useRouteLocale();

const locale = computed(() => locales.value[routeLocale.value] ?? {});
const placeholder = computed(() => locale.value.placeholder ?? 'Search');

function doSearch(text: string) {
  document.querySelectorAll('span[data-highlight]').forEach(span => {
    span.replaceWith(...span.childNodes);
  });
  const theme = document.documentElement.dataset.theme;
  const color = theme === "dark" ? "rgba(62, 175, 124, 0.4)" : "rgba(62, 175, 124, 0.3)";
  const regex = new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: n =>
            regex.test(n.data) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
      }
  );
  const nodes = [];
  let node;
  while ((node = walker.nextNode())) {
    nodes.push(node);
    regex.lastIndex = 0;
  }
  nodes.forEach(n => {
    const frag = document.createDocumentFragment();
    let last = 0, match;
    regex.lastIndex = 0;
    while ((match = regex.exec(n.data))) {
      const details = n.parentElement.closest('details');
      if (details) details.open = true;
      frag.appendChild(document.createTextNode(n.data.slice(last, match.index)));
      const span = document.createElement('span');
      span.textContent = match[0];
      span.style.backgroundColor = color;
      span.setAttribute('data-highlight', 'true');
      frag.appendChild(span);
      last = regex.lastIndex;
    }
    frag.appendChild(document.createTextNode(n.data.slice(last)));
    n.parentNode.replaceChild(frag, n);
  });
}

/** Move focus to up */
function onUp() {
  if (!activeSuggestion.value) {
    return;
  }
  let newIndex = focusIndex.value - 1;
  if (newIndex < 0) {
    newIndex = suggestions.value.length - 1;
  }
  focus(newIndex);
}

/** Move focus to down */
function onDown() {
  if (!activeSuggestion.value) {
    return;
  }
  let newIndex = focusIndex.value + 1;
  if (newIndex >= suggestions.value.length) {
    newIndex = 0;
  }
  focus(newIndex);
}

/** Move focus to direct index */
function focus(i: number) {
  focusIndex.value = i;
}

/** Reset focus */
function unfocus() {
  focusIndex.value = -1;
}

/** Go to link */
async function go(i: number) {
  if (!activeSuggestion.value) {
    return;
  }
  const suggest = suggestions.value[i];
  if (suggest) {
    await router.push(suggest.path);
    setTimeout(() => doSearch(query.value), 1000);
  }
}

/** Handle index change */
function onIndexChange() {
  setSearchIndex(currentSearchIndex.value);
}
</script>

<style scoped>
:global(:root) {
  --search-input-width: 100%;
  --search-result-width: 100%;
}

.embeddable-search-box {
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid var(--c-border);
  border-radius: 8px;
  background: var(--c-bg);
}

.embeddable-search-box.full-height {
  margin: 0;
}

.embeddable-search-box.compact {
  margin: 0.5rem 0;
  padding: 0.5rem;
  border-radius: 4px;
}

.embeddable-search-box.inline {
  display: inline-block;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
}

.search-box {
  position: relative;
}

.search-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.search-index-selector {
  height: 2rem;
  color: var(--c-text);
  border: 1px solid var(--c-border);
  border-radius: 0.3rem;
  font-size: 0.8rem;
  padding: 0 0.5rem;
  outline: none;
  background: var(--c-bg);
  min-width: 80px;
  color-scheme: light dark;
  font-weight: 500;
}

.search-index-selector option {
  background: #2c3e50;
  color: white;
}

.search-index-selector:focus {
  border-color: var(--c-brand);
}

.search-box input {
  cursor: text;
  width: var(--search-input-width);
  height: 2rem;
  color: var(--c-text);
  display: inline-block;
  border: 1px solid var(--c-border);
  border-radius: 2rem;
  font-size: 0.9rem;
  line-height: 2rem;
  padding: 0 0.5rem 0 2rem;
  outline: none;
  transition: all ease 0.3s;
  background: var(--c-bg) url("../full-text-search/client/search.svg") 0.6rem 0.5rem no-repeat;
  background-size: 1rem;
  flex: 1;
}

.search-box input:focus {
  cursor: auto;
  border-color: var(--c-brand);
}

.inline-results {
  background: var(--c-bg);
  margin-top: 0.5rem;
  margin-bottom: 3rem;
  padding: 6px;
  box-sizing: border-box;
  border: 1px solid var(--c-border);
  border-radius: 6px;
  min-height: 200px;
}

.embeddable-search-box.full-height .inline-results {
  max-height: none;
}

.result-item {
  margin-bottom: 4px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.result-item:nth-child(odd) {
  background-color: var(--c-bg-light, rgba(127, 127, 127, 0.05));
}

.result-item:nth-child(even) {
  background-color: var(--c-bg-lighter, rgba(127, 127, 127, 0.1));
}

.result-item:last-child {
  margin-bottom: 0;
}

.result-item.focused {
  background-color: var(--c-brand-light, rgba(62, 175, 124, 0.1)) !important;
}

.result-item a {
  color: var(--c-text-lighter);
  display: block;
  text-decoration: none;
  padding: 8px;
}

.result-item a:hover {
  text-decoration: none;
}

.parent-page-title {
  padding: 4px 8px;
  margin: -8px -8px 4px -8px;
  color: var(--c-brand-light, #fff);
  background: var(--c-brand);
  font-size: 0.8rem;
  font-weight: bold;
}

.result-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.page-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--c-text);
}

.result-excerpt {
  font-size: 0.8rem;
  line-height: 1.4;
  color: var(--c-text-lighter);
}

.result-excerpt :deep(.highlight) {
  background-color: var(--c-brand-light, rgba(62, 175, 124, 0.3));
  color: var(--c-text);
  font-weight: bold;
}

/* Inline variant styles */
.embeddable-search-box.inline .search-controls {
  display: inline-flex;
  vertical-align: middle;
}

.embeddable-search-box.inline .search-box input {
  width: 200px;
}

.embeddable-search-box.compact .search-box input {
  width: 300px;
}

/* Show results variant */
.embeddable-search-box.show-results .search-box input {
  border-radius: 2rem 2rem 0 0;
}

.embeddable-search-box.show-results .inline-results {
  border-top: none;
  border-radius: 0 0 6px 6px;
  margin-top: 0;
}
</style>