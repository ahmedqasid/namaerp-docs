<template>
  {{ generatedUrl }}
  <button @click="copyUrl">Copy</button>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import {serverUrl} from "./server-url";


const props = defineProps({
  url: {
    type: String,
    required: true,
  }
})

const generatedUrl = computed(() => {
  return `${serverUrl.value.replace(/\/$/, '')}/${props.url}`
})

function copyUrl() {
  navigator.clipboard.writeText(generatedUrl.value)
}
</script>

<style scoped>

</style>
