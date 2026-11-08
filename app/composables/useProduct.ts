export function useProduct() {
  const route = useRoute()
  const id = computed(() => String(route.params.id))

  return useFetch(() => `/api/products/${id.value}` as const)
}
