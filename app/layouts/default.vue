<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { public: { siteName } } = useRuntimeConfig()

const items: NavigationMenuItem[] = [
  { label: 'Products', to: '/products', icon: 'i-lucide-shopping-bag' },
  { label: 'Categories', to: '/categories', icon: 'i-lucide-tags' },
  { label: 'Blog', to: '/blog', icon: 'i-lucide-newspaper' },
  { label: 'Search', to: '/search', icon: 'i-lucide-search' },
  { label: 'Explorer', to: '/explorer', icon: 'i-lucide-database' },
  { label: 'About', to: '/about', icon: 'i-lucide-info' },
]
</script>

<template>
  <div>
    <UHeader
      :title="siteName"
      to="/"
    >
      <UNavigationMenu :items="items" />

      <template #right>
        <UColorModeButton />
        <UButton
          to="/login"
          label="Login"
          icon="i-lucide-log-in"
          color="neutral"
          variant="outline"
        />
      </template>

      <template #body>
        <UNavigationMenu
          :items="items"
          orientation="vertical"
          class="-mx-2.5"
        />
      </template>
    </UHeader>

    <UMain>
      <slot />
    </UMain>

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          {{ siteName }} · Learning project
        </p>
      </template>
      <template #right>
        <UButton
          to="https://dummyjson.com"
          target="_blank"
          label="Data by DummyJSON"
          color="neutral"
          variant="ghost"
          trailing-icon="i-lucide-external-link"
        />
      </template>
    </UFooter>
  </div>
</template>
