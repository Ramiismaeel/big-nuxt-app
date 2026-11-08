<script setup lang="ts">
useSeoMeta({ title: 'Products', description: 'Browse all products.' })

const route = useRoute()
const { data, status, error } = await useProducts()
</script>

<template>
  <UContainer class="py-10">
    <RenderInfo mode="SWR" />

    <div class="mb-6">
      <h1 class="text-3xl font-bold text-highlighted">
        Products
      </h1>
      <p
        v-if="data"
        class="mt-1 text-muted"
      >
        {{ data.total }} products
      </p>
    </div>

    <UAlert
      v-if="error"
      color="error"
      variant="subtle"
      icon="i-lucide-triangle-alert"
      title="Could not load products"
      :description="error.statusMessage"
    />

    <div
      v-else
      class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 transition-opacity"
      :class="{ 'opacity-50': status === 'pending' }"
    >
      <ProductsCard
        v-for="product in data?.items"
        :key="product.id"
        :product="product"
      />
    </div>

    <div
      v-if="data && data.totalPages > 1"
      class="mt-8 flex justify-center"
    >
      <UPagination
        :page="data.page"
        :total="data.total"
        :items-per-page="data.limit"
        :to="(p: number) => ({ query: { ...route.query, page: p } })"
      />
    </div>
  </UContainer>
</template>
