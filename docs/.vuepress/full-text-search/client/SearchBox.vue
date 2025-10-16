<template>
  <div class="search-box" role="search">
    <div class="search-controls">
      <input
          ref="input"
          v-model="query"
          aria-label="Search"
          :class="{ focused: focused }"
          :placeholder="locale.placeholder ?? 'Search'"
          autocomplete="off"
          spellcheck="false"
          @focus="() => (focused = true)"
          @blur="() => (focused = false)"
          @keyup.enter="go(focusIndex)"
          @keyup.up="onUp"
          @keyup.down="onDown"
      />
      <button
        class="search-settings-button"
        :class="{ active: showSettings }"
        @click="showSettings = !showSettings"
        title="Search settings"
        aria-label="Search settings"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M12 1v6m0 6v6m5.66-13.66l-4.24 4.24m0 6l4.24 4.24M23 12h-6m-6 0H1m18.66 5.66l-4.24-4.24m0-6l4.24-4.24"></path>
        </svg>
      </button>
    </div>

    <!-- Settings Popup -->
    <div v-if="showSettings" class="search-settings-popup">
      <div class="settings-section" v-if="searchIndexClassNames && searchIndexClassNames.length > 1">
        <label class="settings-label">Search Index:</label>
        <select
          v-model="currentSearchIndex"
          class="search-index-selector"
          @change="onIndexChange"
        >
          <option v-for="indexName in searchIndexClassNames" :key="indexName" :value="indexName">
            {{ searchIndexTitles[indexName] || indexName }}
          </option>
        </select>
      </div>
      <div class="settings-section">
        <label class="semantic-search-toggle">
          <input
            type="checkbox"
            :checked="useSemanticSearch"
            @change="toggleSemanticSearch"
          />
          <span>AI-Powered Semantic Search</span>
        </label>
      </div>
    </div>
    <ul v-if="activeSuggestion" class="suggestions" @mouseleave="unfocus" ref="el">
      <li
          v-for="(s, i) in suggestions"
          :key="i"
          class="suggestion"
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
          <div class="suggestion-row">
            <div class="page-title">{{ s.title || s.path }}</div>
            <div class="suggestion-content">
              <template v-for="(w, wi) in s.display" :key="wi">
                <span :class="w.type">{{ w.str }}</span>
              </template>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {useRouteLocale} from "@vuepress/client";
import type {LocaleConfig} from "@vuepress/shared";
import {PropType, watch} from "vue";
import {defineComponent, ref, computed, toRefs} from "vue";
import {useRouter} from "vue-router";
import {useSuggestions, useSearchIndexManager, useSemanticSearchManager} from "./engine";

type SearchBoxLocales = LocaleConfig<{
  placeholder: string;
}>;

declare const __SEARCH_LOCALES__: SearchBoxLocales;

const defaultLocales = __SEARCH_LOCALES__;


function doSearch(text) {
  document.querySelectorAll('span[data-highlight]').forEach(span => {
    span.replaceWith(...span.childNodes);
  });
  const theme = document.documentElement.dataset.theme;
  const color = theme === "dark" ? "#5e9cff" : "yellow";
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

export default defineComponent({
  name: "SearchBox",
  props: {
    locales: {
      type: Object as PropType<SearchBoxLocales>,
      required: false,
      default: () => defaultLocales,
    },
  },
  setup(props) {
    const {locales} = toRefs(props);
    const query = ref("");
    const focused = ref(false);
    const focusIndex = ref(-1);
    const showSettings = ref(false);
    const el = ref<HTMLElement | null>(null);
    const suggestions = useSuggestions(query);
    const { currentSearchIndex, searchIndexClassNames, searchIndexTitles, setSearchIndex } = useSearchIndexManager();
    const { useSemanticSearch, toggleSemanticSearch } = useSemanticSearchManager();
    watch(focusIndex, (newIndex) => {
      if (newIndex < 0)
        return;
      if (!el.value)
        return;
      let focusedEl = el.value.querySelector("#search-el-" + newIndex);

      if (focusedEl)
        focusedEl.scrollIntoView({
          behavior: 'smooth', // Smooth scrolling animation
          block: 'nearest',   // Scroll to the nearest edge (can also use 'start', 'center', 'end')
          inline: 'nearest'   // Horizontal alignment (optional)
        });
    })
    const activeSuggestion = computed(
        () => query.value && focused.value && suggestions.value.length,
    );

    const router = useRouter();
    const routeLocale = useRouteLocale();

    const locale = computed(() => locales.value[routeLocale.value] ?? {});

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

    return {
      query,
      focused,
      focusIndex,
      showSettings,
      suggestions,
      activeSuggestion,
      onUp,
      onDown,
      focus,
      unfocus,
      go,
      locale,
      el,
      currentSearchIndex,
      searchIndexClassNames,
      searchIndexTitles,
      onIndexChange,
      useSemanticSearch,
      toggleSemanticSearch,
    };
  },
});
</script>

<style scoped>
:global(:root) {
  --search-bg-color: #ffffff;
  --search-accent-color: #3eaf7c;
  --search-accent-text-color: #fff;
  --search-text-color: #2c3e50;
  --search-border-color: #eaecef;

  --search-item-text-color: #5d81a5;
  --search-item-focus-bg-color: #f3f4f5;

  --search-input-width: 8rem;
  --search-result-width: 20rem;
}

.search-box {
  position: relative;
}

.search-controls {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  position: relative;
}

.search-settings-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: 1px solid var(--search-border-color);
  border-radius: 50%;
  background: var(--search-bg-color);
  color: var(--search-text-color);
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
  padding: 0;
}

.search-settings-button:hover {
  border-color: var(--search-accent-color);
  color: var(--search-accent-color);
}

.search-settings-button.active {
  background: var(--search-accent-color);
  border-color: var(--search-accent-color);
  color: var(--search-accent-text-color);
}

.search-settings-popup {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: var(--search-bg-color);
  border: 1px solid var(--search-border-color);
  border-radius: 0.5rem;
  padding: 1rem;
  min-width: 250px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 100;
}

.settings-section {
  margin-bottom: 0.75rem;
}

.settings-section:last-child {
  margin-bottom: 0;
}

.settings-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--search-text-color);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.search-index-selector {
  width: 100%;
  height: 2rem;
  color: var(--search-text-color);
  border: 1px solid var(--search-border-color);
  border-radius: 0.3rem;
  font-size: 0.85rem;
  padding: 0 0.5rem;
  outline: none;
  background: var(--search-bg-color);
}

.search-index-selector:focus {
  border-color: var(--search-accent-color);
}

.semantic-search-toggle {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  color: var(--search-text-color);
  cursor: pointer;
  user-select: none;
}

.semantic-search-toggle input[type="checkbox"] {
  cursor: pointer;
  accent-color: var(--search-accent-color);
}

.semantic-search-toggle span {
  white-space: nowrap;
  font-weight: 500;
}

/* Dark mode support */
:global(html.dark) .semantic-search-toggle span {
  color: #fff;
}

.search-box input {
  cursor: text;
  width: var(--search-input-width);
  height: 2rem;
  color: var(--search-text-color);
  display: inline-block;
  border: 1px solid var(--search-border-color);
  border-radius: 2rem;
  font-size: 0.9rem;
  line-height: 2rem;
  padding: 0 0.5rem 0 2rem;
  outline: none;
  transition: all ease 0.3s;
  background: var(--search-bg-color) url("./search.svg") 0.6rem 0.5rem no-repeat;
  background-size: 1rem;
}

.search-box input:focus {
  cursor: auto;
  border-color: var(--search-accent-color);
}

.suggestions {
  background: var(--search-bg-color);
  max-height: calc(100vh - var(--navbar-line-height) - 50px);
  position: absolute;
  padding: 6px;
  box-sizing: border-box;
  overflow: scroll;
  right: 0;
  max-width: 500px;
  list-style: none;
  border: 1px solid var(--search-border-color);
  border-radius: 6px;
}

.suggestion.focused {
  background-color: var(--search-item-focus-bg-color);
}

.suggestion a {
  color: var(--search-item-text-color);
  display: block;
}

.parent-page-title {
  padding: 4px;
  color: var(--search-accent-text-color);
  background: var(--search-accent-color);
}

.suggestion-row {
  display: flex;
}

.page-title {
  width: 30%;
  padding: 4px;
  flex-grow: 0;
  flex-shrink: 0;
  box-sizing: border-box;
  border-bottom: 1px solid var(--search-border-color);
  border-right: 1px solid var(--search-border-color);
  background: #f5f5f5;
  text-overflow: ellipsis;
  overflow: hidden;
}

.suggestion-content {
  width: 70%;
  padding: 4px;
  flex-grow: 0;
  flex-shrink: 0;
  box-sizing: border-box;
  border-bottom: 1px solid var(--search-border-color);
  white-space: pre-wrap;
}

.suggestion-content :deep(.highlight) {
  background-color: yellow;
}
</style>
