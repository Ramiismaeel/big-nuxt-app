export default defineAppConfig({
  ui: {
    colors: {
      primary: 'violet',
      neutral: 'zinc',
    },
  },
  pagination: {
    defaultLimit: 20,
    limits: [10, 20, 50, 100],
  },
  cache: {
    // client-side data freshness in ms, used later in Task 08
    staleTime: 60_000,
  },
})
