<template>
  <div class="utility-link-builder">
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

    <p>
      <code>{{ generatedUrl }}</code>
      <button @click="copyUrl" title="Copy Full URL"><CopyIcon/></button>
      <ServerBaseURL simple/>
    </p>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import {serverUrl} from "./server-url";
import ServerBaseURL from "./ServerBaseURL.vue";
import CopyIcon from "./CopyIcon.vue";

interface Param {
  title?: string
  default?: string
  id?: string
}
const props = defineProps({
  className: {
    type: String,
    required: true,
  },
  params: {
    type: Array<Param>,
    required: false,
    default: () => [],
  },
  gui: {
    type: Boolean,
    required: false,
    default: false,
  }
})

const paramInputs = ref([])

onMounted(() => {

  paramInputs.value = props.params.map(p => ({
    title: p.title,
    value: p.default || '',
    id: p.id,
  }))
})

const generatedUrl = computed(() => {
  const values = paramInputs.value
      .filter(p => p.id && p.value?.toString().trim())
      .map(p => `${p.id}=${p.value}`);
  const sep = props.params.length > 0 ? '-' : '';
  const query = `${props.className}${sep}${values.join(',')}`;
  const guiPart = props.gui ? "&gui=true" : "";
  return `${serverUrl.value.replace(/\/$/, '')}/utils?util=${query}${guiPart}`;
});

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
