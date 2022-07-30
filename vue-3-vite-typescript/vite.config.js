import vue from '@vitejs/plugin-vue'
import { SFCFluentPlugin } from 'unplugin-fluent-vue/vite'

export default {
  plugins: [
    vue(),
    SFCFluentPlugin(),
  ]
}
