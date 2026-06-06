<template>
  <button class="ai-search-nav-button" :title="label" @click="open = true">
    <svg class="ai-icon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3l1.9 5.7a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3z"/>
    </svg>
    <span class="ai-label">{{ label }}</span>
  </button>

  <Teleport to="body">
    <div v-if="open" class="ai-search-overlay" @click.self="open = false">
      <div class="ai-search-dialog" role="dialog" aria-modal="true" :aria-label="label">
        <button class="ai-search-close" :title="closeLabel" @click="open = false">✕</button>
        <EmbeddableSearchBox @close="open = false"/>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import {computed, onUnmounted, ref, watch} from 'vue'
import {useData} from 'vitepress'
import EmbeddableSearchBox from './EmbeddableSearchBox.vue'

const {lang} = useData()
const open = ref(false)

const label = computed(() => lang.value === 'ar' ? 'بحث ذكي' : 'AI Search')
const closeLabel = computed(() => lang.value === 'ar' ? 'إغلاق' : 'Close')

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape')
    open.value = false
}

watch(open, (isOpen) => {
  if (isOpen)
    window.addEventListener('keydown', onKeydown)
  else
    window.removeEventListener('keydown', onKeydown)
})

onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<style scoped>
.ai-search-nav-button {
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

.ai-search-nav-button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
}

.ai-icon {
  color: var(--vp-c-brand-1);
}

@media (max-width: 767px) {
  .ai-label {
    display: none;
  }
}

.ai-search-overlay {
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

.ai-search-dialog {
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
.ai-search-close {
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

.ai-search-close:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

.ai-search-dialog .embeddable-search-box {
  border: none;
  margin: 0;
  padding: 8px 4px;
}
</style>
