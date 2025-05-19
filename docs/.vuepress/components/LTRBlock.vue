<template>
  <div dir="ltr" class="ltr-block">
    <slot/>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.ltr-block {
  text-align: left;
  direction: ltr;
}
</style>
