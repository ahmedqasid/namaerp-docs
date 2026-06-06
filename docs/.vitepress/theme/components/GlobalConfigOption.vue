<script setup lang="ts">

import NamaOptionURL from "./NamaOptionURL.vue";

const props = defineProps({
  optionCode: {
    type: String,
    required: true,
  }, linkTitle:{
    type: String,
    required: false,
  }
})

</script>

<template>
  <NamaOptionURL entity-code="global" :option-code="optionCode" entity-type="ConfigEntry" :link-title="linkTitle"/>
</template>

<style scoped>

</style>