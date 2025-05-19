<template>
  <div dir="rtl" class="rtl-block">
    <slot />
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.rtl-block {
  text-align: right;
  direction: rtl;
}
</style>
