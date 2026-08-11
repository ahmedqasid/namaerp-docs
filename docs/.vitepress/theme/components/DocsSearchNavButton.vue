<template>
  <button type="button" class="docs-search-nav-button" :aria-label="label" :title="label" @click="open = true">
    <span class="button-container">
      <span aria-hidden="true" class="vpi-search button-search-icon"/>
      <span class="button-placeholder">{{ label }}</span>
    </span>
    <span v-if="shortcutModifier" class="button-keys">
      <kbd class="button-key">{{ shortcutModifier }}</kbd>
      <kbd class="button-key">K</kbd>
    </span>
  </button>

  <Teleport to="body">
    <div
        v-if="open"
        ref="dialogRoot"
        class="DocsSearchModal"
        role="dialog"
        aria-modal="true"
        :aria-label="label"
        @keydown="onDialogKeydown"
    >
      <div class="backdrop" @click="open = false"/>
      <div ref="shellRef" class="shell">
        <EmbeddableSearchBox modal @close="open = false"/>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import {computed, nextTick, onMounted, onUnmounted, ref, watch} from 'vue'
import {useData} from 'vitepress'
import EmbeddableSearchBox from './EmbeddableSearchBox.vue'

const {lang} = useData()
const open = ref(false)
const shellRef = ref<HTMLElement>()

// This button IS site search now — the VitePress built-in `local` provider was removed
// (it shipped an 18.7 MB minisearch index to the browser). The label is deliberately
// neutral rather than "AI Search": the dialog defaults to keyword search via
// Meilisearch, with AI as one mode among several.
const label = computed(() => lang.value === 'ar' ? 'بحث' : 'Search')

// Rendered only after mount: the platform is unknowable during SSR, and guessing would
// hydrate a Mac hint onto a Windows browser.
const shortcutModifier = ref('')

onMounted(() => {
  shortcutModifier.value = /Mac|iPhone|iPod|iPad/i.test(navigator.platform) ? '⌘' : 'Ctrl'
  window.addEventListener('keydown', onGlobalKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onGlobalKeydown)
  window.removeEventListener('popstate', onPopState)
  unlockScroll()
})

/**
 * Ctrl/Cmd+K and `/` open search — the same bindings the built-in box had, so replacing
 * it is not a regression in muscle memory.
 */
function onGlobalKeydown(event: KeyboardEvent) {
  if (open.value)
    return
  const isShortcut = (event.key === 'k' && (event.metaKey || event.ctrlKey))
      || (event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey)
  if (!isShortcut)
    return
  // `/` is a literal character while the reader is typing somewhere else.
  if (event.key === '/' && isTypingTarget(event.target))
    return
  event.preventDefault()
  open.value = true
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement))
    return false
  return target.isContentEditable
      || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
}

/**
 * Escape closes; Tab cycles inside the dialog. Trapping Tab by hand rather than pulling in
 * @vueuse/integrations' focus-trap: that package is only present here as a transitive
 * dependency of VitePress, so importing it would be relying on npm hoisting.
 */
function onDialogKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    open.value = false
    return
  }
  if (event.key !== 'Tab' || !shellRef.value)
    return
  const focusable = [...shellRef.value.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input, select')]
      .filter((element) => element.offsetParent !== null)
  if (!focusable.length)
    return
  const edge = event.shiftKey ? focusable[0] : focusable[focusable.length - 1]
  if (document.activeElement !== edge)
    return
  event.preventDefault()
  const wrapTarget = event.shiftKey ? focusable[focusable.length - 1] : focusable[0]
  wrapTarget.focus()
}

/**
 * The dialog pushes a history entry so that Back closes search instead of leaving the
 * page the reader was searching from.
 */
function onPopState(event: PopStateEvent) {
  event.preventDefault()
  open.value = false
}

let scrollLockedAt = 0

function lockScroll() {
  scrollLockedAt = window.scrollY
  document.body.style.top = `-${scrollLockedAt}px`
  document.body.classList.add('docs-search-scroll-locked')
}

function unlockScroll() {
  if (!document.body.classList.contains('docs-search-scroll-locked'))
    return
  document.body.classList.remove('docs-search-scroll-locked')
  document.body.style.top = ''
  window.scrollTo(0, scrollLockedAt)
}

watch(open, (isOpen) => {
  if (isOpen) {
    lockScroll()
    window.history.pushState(null, '', null)
    nextTick(() => window.addEventListener('popstate', onPopState))
  }
  else {
    unlockScroll()
    window.removeEventListener('popstate', onPopState)
  }
})
</script>

<style scoped>
/* Metrics copied from VitePress's own DocSearch button so this sits in the navbar exactly
   where the built-in search button did. */
.docs-search-nav-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 55px;
  margin: 0;
  padding: 0;
  background: transparent;
  transition: border-color 0.25s;
}

@media (min-width: 768px) {
  .docs-search-nav-button {
    justify-content: flex-start;
    width: 100%;
    height: 40px;
    padding: 0 10px 0 12px;
    border: 1px solid transparent;
    border-radius: 8px;
    background-color: var(--vp-c-bg-alt);
  }

  .docs-search-nav-button:hover {
    border-color: var(--vp-c-brand-1);
  }
}

.button-container {
  display: flex;
  align-items: center;
}

.button-search-icon {
  width: 16px;
  height: 16px;
  color: var(--vp-c-text-1);
  transition: color 0.5s;
}

@media (min-width: 768px) {
  .button-search-icon {
    width: 14px;
    height: 14px;
    /* rtl:begin:ignore */
    margin-right: 8px;
    /* rtl:end:ignore */
    color: var(--vp-c-text-2);
  }
}

.docs-search-nav-button:hover .button-search-icon,
.docs-search-nav-button:hover .button-placeholder {
  color: var(--vp-c-text-1);
}

.button-placeholder {
  display: none;
  margin-top: 2px;
  padding-inline-end: 16px;
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 500;
  transition: color 0.5s;
}

.button-keys {
  /* rtl:ignore */
  direction: ltr;
  display: none;
  align-items: center;
}

@media (min-width: 768px) {
  .button-placeholder,
  .button-keys {
    display: flex;
  }
}

.button-key {
  display: block;
  height: 22px;
  margin-top: 2px;
  border: 1px solid var(--vp-c-divider);
  /* rtl:begin:ignore */
  border-right: none;
  border-radius: 4px 0 0 4px;
  padding-left: 6px;
  /* rtl:end:ignore */
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-base);
  font-size: 12px;
  font-weight: 500;
  line-height: 22px;
  transition: color 0.5s, border-color 0.5s;
}

.button-key + .button-key {
  /* rtl:begin:ignore */
  border-right: 1px solid var(--vp-c-divider);
  border-left: none;
  border-radius: 0 4px 4px 0;
  padding-left: 2px;
  padding-right: 6px;
  /* rtl:end:ignore */
}

/* Modal shell — the same geometry as VitePress's VPLocalSearchBox, including the
   full-screen treatment below 768px. */
.DocsSearchModal {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
}

.backdrop {
  position: absolute;
  inset: 0;
  background: var(--vp-backdrop-bg-color);
  transition: opacity 0.5s;
}

.shell {
  position: relative;
  display: flex;
  flex-direction: column;
  width: min(100vw - 60px, 900px);
  height: min-content;
  max-height: min(100vh - 128px, 900px);
  margin: 64px auto;
  padding: 12px;
  border-radius: 6px;
  background: var(--vp-local-search-bg);
}

/* Lets the results list — and only the results list — take the leftover height and
   scroll, instead of the whole dialog growing past its max-height. */
.shell > :deep(.embeddable-search-box) {
  flex: 1 1 auto;
  min-height: 0;
}

@media (max-width: 767px) {
  .shell {
    width: 100vw;
    height: 100vh;
    max-height: none;
    margin: 0;
    border-radius: 0;
  }
}
</style>
