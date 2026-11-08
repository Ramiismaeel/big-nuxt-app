<script setup lang="ts">
useSeoMeta({
  title: 'Home',
  description: 'A Nuxt 4 playground for rendering modes, caching and big data.',
})

const modes = [
  { title: 'SSG', route: '/', icon: 'i-lucide-file-check', description: 'This page. Built once at build time, served as static HTML.' },
  { title: 'SWR', route: '/products', icon: 'i-lucide-refresh-cw', description: 'Product list cached on the server, revalidated in the background.' },
  { title: 'ISR', route: '/products/1', icon: 'i-lucide-timer', description: 'Product detail cached on the CDN, regenerated hourly.' },
  { title: 'SSR', route: '/search', icon: 'i-lucide-server', description: 'Search results rendered fresh on every request.' },
  { title: 'CSR', route: '/dashboard', icon: 'i-lucide-monitor', description: 'Private dashboard rendered only in the browser.' },
  { title: 'Big data', route: '/explorer', icon: 'i-lucide-database', description: '100k rows with virtual scrolling and client-side processing.' },
]
</script>

<template>
  <UContainer class="py-16 sm:py-24">
    <div class="text-center max-w-2xl mx-auto">
      <UBadge
        label="Nuxt 4 · Learning project"
        variant="subtle"
      />
      <h1 class="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-highlighted">
        Every rendering mode, one app
      </h1>
      <p class="mt-4 text-lg text-muted">
        SSG, SWR, ISR, SSR and CSR side by side, powered by DummyJSON, with caching, big data and tests.
      </p>
      <div class="mt-8 flex flex-wrap justify-center gap-3">
        <UButton
          to="/products"
          size="lg"
          label="Browse products"
          trailing-icon="i-lucide-arrow-right"
        />
        <UButton
          to="/explorer"
          size="lg"
          label="Open explorer"
          color="neutral"
          variant="subtle"
        />
      </div>
    </div>

    <div class="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="mode in modes"
        :key="mode.title"
        :to="mode.route"
        class="group"
      >
        <UCard class="h-full transition group-hover:ring-primary">
          <UIcon
            :name="mode.icon"
            class="size-6 text-primary"
          />
          <h3 class="mt-3 font-semibold text-highlighted">{{ mode.title }}</h3>
          <p class="mt-1 text-sm text-muted">{{ mode.description }}</p>
        </UCard>
      </NuxtLink>
    </div>
  </UContainer>
</template>
