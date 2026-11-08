<script setup lang="ts">
import type { ProductSummary } from '#shared/products'
import { formatPrice } from '~~/server/utils/format'

defineProps<{ product: ProductSummary }>()
</script>

<template>
  <NuxtLink
    :to="`/products/${product.id}`"
    class="group"
  >
    <UCard
      class="h-full transition group-hover:ring-primary"
      :ui="{ body: 'p-0 sm:p-0' }"
    >
      <NuxtImg
        :src="product.thumbnail"
        :alt="product.title"
        width="300"
        height="300"
        loading="lazy"
        class="aspect-square w-full object-contain bg-muted"
      />
      <div class="p-4">
        <p class="text-xs uppercase text-muted">{{ product.brand ?? product.category }}</p>
        <h3 class="mt-1 font-semibold text-highlighted line-clamp-1">{{ product.title }}</h3>
        <div class="mt-2 flex items-center justify-between">
          <span class="font-bold">{{ formatPrice(product.price) }}</span>
          <span class="flex items-center gap-1 text-sm text-muted">
            <UIcon
              name="i-lucide-star"
              class="size-4 text-warning"
            />
            {{ product.rating.toFixed(1) }}
          </span>
        </div>
      </div>
    </UCard>
  </NuxtLink>
</template>
