<template>
  {{ generatedUrl }}
  <button @click="copyUrl" title="Copy URL"><CopyIcon/></button>
  <ServerBaseURL simple/>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import {serverUrl} from "./server-url";
import CopyIcon from "./CopyIcon.vue";
import ServerBaseURL from "./ServerBaseURL.vue";


const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  removeERPPart: {
    type: Boolean,
    required: false,
  }
})

const generatedUrl = computed(() => {
  let url = `${serverUrl.value.replace(/\/$/, '')}/`;
  if (props.removeERPPart) {
    url = url.replace("/erp/", "/");
  }
  return `${url}${props.url}`
})

function copyUrl() {
  navigator.clipboard.writeText(generatedUrl.value)
}
</script>

<style scoped>

</style>
