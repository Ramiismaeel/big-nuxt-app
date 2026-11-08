// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui'],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    // server only, never sent to the browser
    dummyjson: {
      baseUrl: process.env.NUXT_DUMMYJSON_BASE_URL || 'https://dummyjson.com',
    },
    sessionSecret: process.env.NUXT_SESSION_SECRET,
    // exposed to client AND server
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      siteName: 'Big Nuxt App',
    },
  },
  routeRules: {
    '/': { prerender: true }, // SSG: HTML built at build time
    '/about': { prerender: true }, // SSG
    '/products': { swr: 60 }, // SWR: cached on server 60s, revalidated in background
    '/products/**': { isr: 3600 }, // ISR: cached on CDN, revalidated hourly
    '/blog/**': { isr: 3600 }, // ISR
    '/dashboard/**': { ssr: false }, // CSR: server sends an empty shell, browser renders
    '/explorer': { ssr: false }, // CSR
  // everything else: SSR (the default), rendered fresh on every request
  },
  compatibilityDate: '2026-08-11',
  eslint: {
    config: { stylistic: true },
  },
  image: {
    domains: ['cdn.dummyjson.com'],
  },
})
