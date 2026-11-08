<script setup lang="ts">
defineProps<{ mode: 'SSG' | 'SSR' | 'SWR' | 'ISR' | 'CSR' }>()

const route = useRoute()

// useState: the value created on the server is sent to the browser in the payload,
// so the client reuses it instead of creating a new one (no hydration mismatch)
const renderedAt = useState(`rendered-at:${route.path}`, () => new Date().toISOString())
const renderedOn = useState(`rendered-on:${route.path}`, () => (import.meta.server ? 'server' : 'client'))
</script>

<template>
  <UAlert
    :title="`Rendering mode: ${mode}`"
    icon="i-lucide-info"
    color="neutral"
    variant="subtle"
    class="mb-6"
  >
    <template #description>
      Rendered on the <strong>{{ renderedOn }}</strong> at
      <NuxtTime
        :datetime="renderedAt"
        date-style="short"
        time-style="medium"
      />
    </template>
  </UAlert>
</template>
