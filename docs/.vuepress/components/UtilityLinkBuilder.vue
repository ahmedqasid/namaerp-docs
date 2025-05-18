<template>
  <div class="utility-link-builder">
    <h4>{{ className }} </h4>

    <div
        v-for="(param, index) in paramInputs"
        :key="index"
        class="param-input"
    >
      <label :for="'param-' + index">{{ param.title }}:</label>
      <input
          :id="'param-' + index"
          v-model="paramInputs[index].value"
          type="text"
          :placeholder="param.title"
      />
    </div>

    <p><strong>Generated URL:</strong>
      <button @click="copyUrl">Copy</button>
    </p>
    <div class="code-block">

      <code>{{ generatedUrl }}</code>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue'

const props = defineProps({
  className: {
    type: String,
    required: true,
  },
  params: {
    type: Array, // array of { title: string, default: string }
    required: true,
  },
})

const SERVER_KEY = 'serverBaseUrl'
const DEFAULT_SERVER_URL = 'http://localhost:8080/erp/'

const serverBaseUrl = ref(DEFAULT_SERVER_URL)
const paramInputs = ref([])

onMounted(() => {
  const savedBaseUrl = localStorage.getItem(SERVER_KEY)
  if (savedBaseUrl) {
    serverBaseUrl.value = savedBaseUrl
  }
  paramInputs.value = props.params.map(p => ({
    title: p.title,
    value: p.default || '',
  }))
})

const generatedUrl = computed(() => {
  const values = paramInputs.value.map(p => p.value)
  const query = `${props.className}-${values.join(',')}`
  return `${serverBaseUrl.value.replace(/\/$/, '')}/utils?${query}`
})

function copyUrl() {
  navigator.clipboard.writeText(generatedUrl.value)
}
</script>

<style scoped>
.utility-link-builder {
  margin: 1rem 0;
}

.param-input {
  margin-bottom: 0.5rem;
  display: inline-block;
}

.param-input label {
  font-weight: bold;
  margin-right: 0.5rem;
}

.param-input input {
  padding: 0.3rem;
  width: 300px;
}

.code-block {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid var(--c-border);
  background-color: var(--c-bg-soft);
}

.code-block code {
  font-family: var(--font-family-code);
  font-size: 0.95em;
  white-space: break-spaces;
}

.code-block button {
  padding: 0.3rem 0.6rem;
  font-size: 0.85em;
  border: 1px solid var(--c-border);
  border-radius: 4px;
  cursor: pointer;
  background: none;
}
</style>
