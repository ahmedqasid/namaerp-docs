<script setup lang="ts">

import NamaOptionURL from "./NamaOptionURL.vue";

const props = defineProps({
  optionCode: {
    type: String,
    required: true,
  }
})

</script>

<template>
  <NamaOptionURL entity-code="global" :option-code="optionCode" entity-type="ConfigEntry"/>
</template>

<style scoped>

</style>