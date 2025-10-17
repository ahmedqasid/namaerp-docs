
# Search

You can use this page to search for any content inside our documentation site

## Full-Text Search

<EmbeddableSearchBox fullHeight />

## Google Search

<ClientOnly>
  <div>
    <div class="gcse-search"></div>
  </div>
</ClientOnly>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // Load Google Custom Search script
  if (typeof window !== 'undefined' && !document.querySelector('script[src*="cse.google.com"]')) {
    const script = document.createElement('script')
    script.src = 'https://cse.google.com/cse.js?cx=42d3e4966ff20431e'
    script.async = true
    document.head.appendChild(script)
  }
})
</script>



