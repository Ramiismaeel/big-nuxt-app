export const useProducts = () => {
  const route = useRoute()
  const { pagination } = useAppConfig()

  const page = computed(() => Number(route.query.page) || 1)
  const limit = computed(() => Number(route.query.limit) || pagination.defaultLimit || 20)
  return useFetch('/api/products', { query: { page, limit } })
}
