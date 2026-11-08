<script setup lang="ts">
useSeoMeta({ title: 'About', description: 'What this learning project is about.' })
</script>

<template>
  <UContainer class="max-w-3xl py-10">
    <RenderInfo mode="SSG" />
    <h1 class="text-3xl font-bold text-highlighted">
      About this project
    </h1>
    <p class="mt-4 text-muted">
      A Nuxt 4 playground to learn architecture, TypeScript, rendering modes, caching,
      big data handling, performance and testing, using DummyJSON as the data source.
    </p>
    <p class="mt-4 text-muted">
      Every page shows its rendering mode and when it was rendered, so you can see the
      difference between SSG, SSR, SWR, ISR and CSR directly in the browser.
    </p>
  </UContainer>
</template>
