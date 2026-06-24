<template>
  <a class="landing-card" :href="resolvedLink">
    <span v-if="icon" class="landing-card__icon" aria-hidden="true">{{ icon }}</span>
    <span class="landing-card__body">
      <span class="landing-card__title">{{ title }}</span>
      <span v-if="details" class="landing-card__details">{{ details }}</span>
    </span>
  </a>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import {withBase} from 'vitepress'

const props = defineProps<{
  icon?: string
  title: string
  link: string
  details?: string
}>()

const isExternal = (href: string) => /^(https?:)?\/\//.test(href) || href.startsWith('mailto:')

const resolvedLink = computed(() => (isExternal(props.link) ? props.link : withBase(props.link)))
</script>

<style scoped>
.landing-card {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 18px 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  text-decoration: none !important;
  font-weight: initial;
  transition: border-color .25s, background-color .25s, transform .25s, box-shadow .25s;
  height: 100%;
}

.landing-card:hover {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-soft-up, var(--vp-c-bg-soft));
  transform: translateY(-2px);
  box-shadow: var(--vp-shadow-2);
}

.landing-card__icon {
  font-size: 26px;
  line-height: 1.2;
  flex-shrink: 0;
}

.landing-card__body {
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
}

.landing-card__title {
  font-size: 15px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--vp-c-text-1);
}

.landing-card:hover .landing-card__title {
  color: var(--vp-c-brand-1);
}

.landing-card__details {
  font-size: 13px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}
</style>
