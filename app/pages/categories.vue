<script setup lang="ts">
useSeoMeta({ title: 'Categories' })

const { data: categories } = await useFetch('/api/categories')
</script>

<template>
  <UContainer
    v-if="categories"
    class="py-10"
  >
    <RenderInfo mode="SSR" />
    <h1 class="mb-6 text-3xl font-bold text-highlighted">
      Categories
    </h1>
    <div class="flex flex-wrap gap-2">
      <UBadge
        v-for="category in categories"
        :key="category.slug"
        :label="category.name"
        size="lg"
        color="neutral"
        variant="outline"
      />
    </div>
  </UContainer>
</template>
