import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite' // 自動導入 hook
import Components from 'unplugin-vue-components/vite' // 自動引入 components
import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log('====================模式與環境====================')
  console.log('command', command)
  console.log('mode', mode)
  return {
    base: '/',
    plugins: [
      vue(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/, /\.vue\?vue/, // .vue
          /\.md$/ // .md
        ],
        imports: [
          'vue',
          'vue-router',
          {
            swiper: [
              ['Autoplay', 'Autoplay'],
              ['Navigation', 'Navigation'],
              ['Pagination', 'Pagination']
            ]
          }
        ],
        eslintrc: {
          enabled: false
        },
        dts: './auto-imports.d.ts',
        vueTemplate: true
      }),
      Components({
        dts: './components.d.ts',
        resolvers: [
          (componentName) => {
            // where `componentName` is always CapitalCase
            if (componentName.startsWith('Swiper')) {
              return {
                name: componentName,
                from: 'swiper/vue'
              }
            }
          }
        ]
      }),
      Unocss()
    ],
    server: {
      host: '0.0.0.0',
      port: 1803
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  }
})
