import path from 'path'
import vue from '@vitejs/plugin-vue'
import { ExternalFluentPlugin } from 'unplugin-fluent-vue/vite'

export default {
  plugins: [
    vue(),
    ExternalFluentPlugin({
      baseDir: path.resolve('src'),
      ftlDir: path.resolve('src/translations'),
      locales: ['en']
    }),
  ]
}
