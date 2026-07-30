<template>
  <div class="section-item" :class="['level-' + level, {'is-active': isActive, 'has-active': holdsActivePage}]">
    <a class="section-link" :href="href">{{ item.text }}</a>
    <div v-if="item.items?.length" class="section-items">
      <SectionSidebarItem v-for="child in item.items" :key="child.link" :item="child" :level="level + 1"
                          :current-page="currentPage"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import {useData, withBase} from 'vitepress'
import type {SidebarNode} from '../sidebar-tree'

const props = defineProps<{ item: SidebarNode; level: number; currentPage: string }>()
const {site} = useData()

// VitePress appends `.html` (when cleanUrls is off) to links written in markdown, but a link rendered
// by a component bypasses that transform — same reason LandingCard resolves its own href.
const href = computed(() => {
  const link = props.item.link
  const needsSuffix = !site.value.cleanUrls && !link.endsWith('/') && !link.endsWith('.html')
  return withBase(needsSuffix ? link + '.html' : link)
})

const isActive = computed(() => props.currentPage === props.item.link)
const holdsActivePage = computed(
    () => !isActive.value && props.item.link.endsWith('/') && props.currentPage.startsWith(props.item.link))
</script>

<style scoped>
.section-link {
  display: block;
  padding: 3px 0;
  line-height: 22px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: color .25s;
}

.section-item.level-0 > .section-link {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.section-link:hover {
  color: var(--vp-c-brand-1);
}

.section-item.has-active > .section-link {
  color: var(--vp-c-text-1);
}

.section-item.is-active > .section-link {
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.section-items {
  margin: 2px 0 10px;
  padding-left: 16px;
  border-left: 1px solid var(--vp-c-divider);
}
</style>
