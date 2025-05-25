<template>
  <a :href="generatedUrl" target="_blank">{{ linkTitle || optionCode || entityType }}</a>
  <button @click="copyUrl" title="Copy URL"><CopyIcon/></button>
  <ServerBaseURL simple/>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import {serverUrl} from "./server-url";
import CopyIcon from "./CopyIcon.vue";
import ServerBaseURL from "./ServerBaseURL.vue";


const props = defineProps({
  entityType: {
    type: String,
    required: true,
  },
  optionCode: {
    type:String,
    required: false,
  },
  entityCode:{
    type: String,
    required: false,
  }, linkTitle:{
    type: String,
    required: false
  }, newMode: {
    type: Boolean,
    required: false
  }
})

const generatedUrl = computed(() => {
  return `${serverUrl.value.replace(/\/$/, '')}#/edit?${urlPart('code', props.entityCode)}&entity=${props.entityType}&view=${props.newMode ? "NEW" : "EDIT"}&${urlPart('focusOnField', props.optionCode)}`
})

function urlPart(name: string, part?: string): string {
  if (part)
    return `${name}=${part}&`;
  return '';
}
function copyUrl() {
  navigator.clipboard.writeText(generatedUrl.value)
}
</script>

<style scoped>

</style>
