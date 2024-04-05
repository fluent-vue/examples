// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['unplugin-fluent-vue/nuxt'],
  fluentVue: {
    external: {
      locales: ['en', 'fr'],
      ftlDir: 'translations/',
    }
  },
})
