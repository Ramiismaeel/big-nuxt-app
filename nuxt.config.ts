// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/icon', '@nuxt/image', '@nuxt/fonts'],
  devtools: { enabled: true },
  compatibilityDate: '2026-08-11',
  eslint: {
    config: { stylistic: true },
  },
})
