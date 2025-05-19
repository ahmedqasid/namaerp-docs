<template>
  <div class="server-base-url">
    <label for="baseUrlInput">Server URL:</label>
    <input
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

function updateBaseURL(){
  updateServerURL(serverUrl.value)
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
