<script setup lang="ts">

import NamaOptionURL from "./NamaOptionURL.vue";

const props = defineProps({
  entityType: {
    type: String,
    required: true,
  }
})
</script>

<template>
  <NamaOptionURL :entity-type="entityType" new-mode link-title=""/>
</template>

<style scoped>

</style>