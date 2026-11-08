<script setup lang="ts">
const { public: { siteName } } = useRuntimeConfig()

useHead({
  htmlAttrs: { lang: 'en' },
  titleTemplate: title => (title ? `${title} · ${siteName}` : siteName),
})
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator color="var(--ui-primary)" />
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
