<template>
  <div v-if="items.length" class="section-sidebar">
    <SectionSidebarItem v-for="item in items" :key="item.link" :item="item" :level="0" :current-page="currentPage"/>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import {useData} from 'vitepress'
import SectionSidebarItem from './SectionSidebarItem.vue'
import type {SidebarNode} from '../sidebar-tree'

/**
 * Renders the sidebar tree that `transformPageData` attached to this page: the level 1 entries of the
 * locale, the siblings of every folder on the way down to the current one, and the direct children of
 * the current folder. It is kept out of `themeConfig.sidebar` on purpose — VitePress inlines the whole
 * themeConfig into every generated page, while page data travels in the page's own chunk.
 */
const {page, frontmatter} = useData()
const items = computed<SidebarNode[]>(() => frontmatter.value.sectionSidebar ?? [])
// the page's own link in the shape the generator writes: `/platform/` for an index, `/platform/utils` for a page
const currentPage = computed(() => '/' + page.value.relativePath.replace(/index\.md$/, '').replace(/\.md$/, ''))
</script>

<style scoped>
.section-sidebar {
  padding-bottom: 24px;
}
</style>
