<template>
  <div class="landing-grid ignore-in-full-text-search">
    <slot/>
  </div>
</template>

<script setup lang="ts">
// Pure layout wrapper. The `ignore-in-full-text-search` class keeps the navigational
// card text out of the search index (see search-index-builder.mts) while the page's
// surrounding prose stays searchable.
</script>

<style scoped>
.landing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
  margin: 20px 0 32px;
}

@media (max-width: 640px) {
  .landing-grid {
    grid-template-columns: 1fr;
  }
}
</style>
