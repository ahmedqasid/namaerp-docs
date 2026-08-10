<template>
  <button class="docs-search-nav-button" :title="label" @click="open = true">
    <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.3-4.3"/>
    </svg>
    <span class="search-label">{{ label }}</span>
    <kbd v-if="shortcutHint" class="search-shortcut">{{ shortcutHint }}</kbd>
  </button>

  <Teleport to="body">
    <div v-if="open" class="docs-search-overlay" @click.self="open = false">
      <div class="docs-search-dialog" role="dialog" aria-modal="true" :aria-label="label">
        <button class="docs-search-close" :title="closeLabel" @click="open = false">✕</button>
        <EmbeddableSearchBox @close="open = false"/>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref, watch} from 'vue'
import {useData} from 'vitepress'
import EmbeddableSearchBox from './EmbeddableSearchBox.vue'

const {lang} = useData()
const open = ref(false)

// This button IS site search now — the VitePress built-in `local` provider was removed
// (it shipped an 18.7 MB minisearch index to the browser). The label is deliberately
// neutral rather than "AI Search": the dialog defaults to keyword search via
// Meilisearch, with AI as one mode among several.
const label = computed(() => lang.value === 'ar' ? 'بحث' : 'Search')
const closeLabel = computed(() => lang.value === 'ar' ? 'إغلاق' : 'Close')

// Rendered only after mount: the platform is unknowable during SSR, and guessing would
// hydrate a Mac hint onto a Windows browser.
const shortcutHint = ref('')

onMounted(() => {
  const isApple = /Mac|iPhone|iPod|iPad/i.test(navigator.platform)
  shortcutHint.value = isApple ? '⌘K' : 'Ctrl K'
  window.addEventListener('keydown', onGlobalKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onGlobalKeydown)
  window.removeEventListener('keydown', onDialogKeydown)
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

function onDialogKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape')
    open.value = false
}

watch(open, (isOpen) => {
  if (isOpen)
    window.addEventListener('keydown', onDialogKeydown)
  else
    window.removeEventListener('keydown', onDialogKeydown)
})
</script>

<style scoped>
.docs-search-nav-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  margin: 0 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 500;
  transition: border-color 0.25s, color 0.25s;
}

.docs-search-nav-button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
}

.search-icon {
  color: var(--vp-c-brand-1);
}

.search-shortcut {
  padding: 1px 5px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-base);
  font-size: 11px;
  line-height: 1.4;
}

@media (max-width: 767px) {
  .search-label,
  .search-shortcut {
    display: none;
  }
}

.docs-search-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 64px 16px 16px;
}

.docs-search-dialog {
  position: relative;
  width: min(720px, 100%);
  max-height: calc(100vh - 96px);
  overflow-y: auto;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  box-shadow: var(--vp-shadow-3);
  padding: 8px 12px;
}

/* rtl:begin:ignore */
.docs-search-close {
  position: absolute;
  top: 10px;
  inset-inline-end: 12px;
  z-index: 1;
  padding: 4px 8px;
  border-radius: 6px;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

/* rtl:end:ignore */

.docs-search-close:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

.docs-search-dialog .embeddable-search-box {
  border: none;
  margin: 0;
  padding: 8px 4px;
}
</style>
