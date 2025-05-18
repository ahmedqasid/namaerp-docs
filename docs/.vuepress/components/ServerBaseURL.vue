<template>
  <div class="server-base-url">
    <label for="baseUrlInput">Server Base URL:</label>
    <input
        id="baseUrlInput"
        v-model="baseUrl"
        @input="saveToLocalStorage"
        type="text"
        placeholder="http://localhost:8080/erp/"
    />
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'

const STORAGE_KEY = 'serverBaseUrl'
const baseUrl = ref('')

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    baseUrl.value = saved
  }
})

function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, baseUrl.value)
}
</script>

<style scoped>
.server-base-url {
  margin: 1rem 0;
  padding: 1rem;
  border-left: 4px solid #ccc;
  border-radius: 0.5rem;
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
</style>
