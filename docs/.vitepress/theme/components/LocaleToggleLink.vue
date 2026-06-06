<template>
  <a class="locale-toggle-link" :href="counterpartLink">{{ label }}</a>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import {useData} from 'vitepress'

const {page, localeIndex} = useData()

const isEnglish = computed(() => localeIndex.value === 'en')
const label = computed(() => isEnglish.value ? 'العربية' : 'English')

// Link to the same page in the other locale (mirrors what the default
// translations dropdown does — the target may 404 if not yet translated,
// which matches the default theme's behavior)
const counterpartLink = computed(() => {
  const currentPath = page.value.relativePath
  const counterpartPath = isEnglish.value
      ? currentPath.replace(/^en\//, '')
      : 'en/' + currentPath
  return '/' + counterpartPath
      .replace(/(^|\/)index\.md$/, '$1')
      .replace(/\.md$/, '.html')
})
</script>

<style scoped>
.locale-toggle-link {
  display: flex;
  align-items: center;
  padding: 0 12px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  transition: color 0.25s;
}

.locale-toggle-link:hover {
  color: var(--vp-c-brand-1);
}
</style>
