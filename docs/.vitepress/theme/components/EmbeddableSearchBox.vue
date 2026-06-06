<template>
  <div class="embeddable-search-box-placeholder">
    <p>
      The full-text / AI search is being migrated. Meanwhile, use the search box in the
      navigation bar (or press <kbd>Ctrl</kbd>+<kbd>K</kbd>).
    </p>
    <p dir="rtl">
      البحث الكامل / الذكي قيد النقل حاليًا. يمكنك استخدام مربع البحث في الشريط العلوي
      (أو الضغط على <kbd>Ctrl</kbd>+<kbd>K</kbd>).
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ fullHeight?: boolean }>()
</script>

<style scoped>
.embeddable-search-box-placeholder {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px 24px;
  margin: 16px 0;
}
</style>
