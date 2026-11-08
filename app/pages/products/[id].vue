<script setup lang="ts">
import { formatPrice } from '~~/server/utils/format'

useSeoMeta({ title: 'Products', description: 'Browse all products.' })

const { data: product, error } = await useProduct()

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.statusMessage,
    fatal: true,
  })
}

useSeoMeta({
  title: () => product.value?.title,
  description: () => product.value?.description,
})
</script>

<template>
  <UContainer
    v-if="product"
    class="py-10"
  >
    <RenderInfo mode="ISR" />

    <UButton
      to="/products"
      icon="i-lucide-arrow-left"
      label="Back to products"
      color="neutral"
      variant="ghost"
      class="mb-6 -ml-2.5"
    />

    <div class="grid gap-10 lg:grid-cols-2">
      <NuxtImg
        :src="product.images[0] ?? product.thumbnail"
        :alt="product.title"
        width="600"
        height="600"
        class="aspect-square w-full rounded-lg bg-muted object-contain"
      />

      <div>
        <p class="text-sm uppercase text-muted">
          {{ product.brand ?? product.category }}
        </p>
        <h1 class="mt-1 text-3xl font-bold text-highlighted">
          {{ product.title }}
        </h1>

        <div class="mt-3 flex flex-wrap items-center gap-3">
          <span class="text-2xl font-bold">{{ formatPrice(product.price) }}</span>
          <UBadge
            v-if="product.discountPercentage > 0"
            :label="`-${Math.round(product.discountPercentage)}%`"
            color="success"
            variant="subtle"
          />
          <UBadge
            :label="product.availabilityStatus"
            color="neutral"
            variant="outline"
          />
        </div>

        <p class="mt-6 text-muted">
          {{ product.description }}
        </p>

        <div class="mt-6 flex flex-wrap gap-2">
          <UBadge
            v-for="tag in product.tags"
            :key="tag"
            :label="tag"
            color="neutral"
            variant="soft"
          />
        </div>
      </div>
    </div>

    <section
      v-if="product.reviews.length"
      class="mt-12"
    >
      <h2 class="mb-4 text-xl font-semibold text-highlighted">
        Reviews
      </h2>
      <div class="grid gap-4 md:grid-cols-3">
        <UCard
          v-for="review in product.reviews"
          :key="review.reviewerEmail + review.date"
        >
          <div class="flex gap-0.5 text-warning">
            <UIcon
              v-for="n in review.rating"
              :key="n"
              name="i-lucide-star"
              class="size-4"
            />
          </div>
          <p class="mt-2">
            {{ review.comment }}
          </p>
          <p class="mt-3 text-sm text-muted">
            {{ review.reviewerName }} · <NuxtTime
              :datetime="review.date"
              date-style="medium"
            />
          </p>
        </UCard>
      </div>
    </section>
  </UContainer>
</template>
