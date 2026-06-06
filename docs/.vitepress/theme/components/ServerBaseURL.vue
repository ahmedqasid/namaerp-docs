<template>
  <div v-if="!simple" class="server-base-url" dir="ltr">
    <label for="baseUrlInput">Server URL:</label>
    <input
        id="baseUrlInput"
        v-model="serverUrl"
        @input="updateBaseURL"
        type="text"
        placeholder="http://localhost:8080/erp/"
    />
  </div>
  <div class="server-base-url" :class="simpleServerUrlVisible?'':'inline-block'" v-else>
    <button @click="simpleServerUrlVisible=!simpleServerUrlVisible" :title="simpleServerUrlVisible?'Hide Server URL':'Show Server URL' "  class="icon-button">
      <svg v-if="simpleServerUrlVisible" xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M17.94 17.94A10.93 10.93 0 0112 20c-7 0-11-8-11-8a21.55 21.55 0 014.22-5.89M9.88 9.88A3 3 0 0114.12 14.12M3 3l18 18" />
      </svg>
    </button>
    <label v-if="simpleServerUrlVisible" for="baseUrlInput">Server URL:</label>
    <input v-if="simpleServerUrlVisible"
        id="baseUrlInput"
        v-model="serverUrl"
        @input="updateBaseURL"
        type="text"
        placeholder="http://localhost:8080/erp/"
    />
  </div>
</template>

<script setup lang="ts">
import {serverUrl, updateServerURL} from "./server-url";
import {ref} from "vue";
const simpleServerUrlVisible = ref(false);
const props = defineProps({
  simple: {
    type: Boolean,
    required: false,
  }
})
function updateBaseURL(){
  updateServerURL(serverUrl.value)
}

</script>

<style scoped>
.server-base-url {
  direction: ltr;
}
.inline-block {
  display: inline-block;
}

.server-base-url label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

.server-base-url input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.icon {
  width: 24px;
  height: 24px;
  stroke-width: 2;
}
</style>
