import { defineNuxtModule, addVitePlugin } from 'nuxt/kit'
import { ExternalFluentPlugin } from 'unplugin-fluent-vue/vite'

export default defineNuxtModule({
    meta: {
        name: 'fluent-vue',
    },
    setup(_, nuxt) {
        addVitePlugin(ExternalFluentPlugin({
            locales: ['en', 'fr'],
            baseDir: nuxt.options.srcDir,
            ftlDir: nuxt.options.srcDir + '/translations',
        }))
    },
});
