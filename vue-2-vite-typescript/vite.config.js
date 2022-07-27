import { createVuePlugin } from 'vite-plugin-vue2'
import { SFCFluentPlugin } from 'unplugin-fluent-vue/vite'

export default {
  plugins: [
    createVuePlugin(),
    SFCFluentPlugin()
  ]
}
