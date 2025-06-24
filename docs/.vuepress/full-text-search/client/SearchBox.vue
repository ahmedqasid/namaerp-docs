<template>
  <div class="search-box" role="search">
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
import {useSuggestions} from "./engine";

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
    const el = ref<HTMLElement | null>(null);
    const suggestions = useSuggestions(query);
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

    return {
      query,
      focused,
      focusIndex,
      suggestions,
      activeSuggestion,
      onUp,
      onDown,
      focus,
      unfocus,
      go,
      locale,
      el,
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
