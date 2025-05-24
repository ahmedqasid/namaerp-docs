<template>
  <a :href="generatedUrl" target="_blank">{{ linkTitle || optionCode }}</a>
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
    required: true,
  },
  entityCode:{
    type: String,
    required: true,
  }, linkTitle:{
    type: String,
    required: false
  }
})

const generatedUrl = computed(() => {
  return `${serverUrl.value.replace(/\/$/, '')}#/edit?code=${props.entityCode}&entity=${props.entityType}&view==EDIT&focusOnField=${props.optionCode}`
})

function copyUrl() {
  navigator.clipboard.writeText(generatedUrl.value)
}
</script>

<style scoped>

</style>
