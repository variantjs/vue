import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import typescript from '@rollup/plugin-typescript'
import * as core from '@variantjs/core'

const coreKeys = {}

Object.keys(core).forEach(key => {
  coreKeys[key] = core[key]
})

export default defineConfig({
  plugins: [vue()],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'VariantJS',
      fileName: (format) => `index${format === 'umd' ? '' : `.${format}`}.js`
    },
    rollupOptions: {
      treeshake: true,
      plugins: [
        typescript({
          "exclude": ["node_modules", 'src/__tests/**/*']
        })
      ],
      external: ['vue', '@popperjs/core', '@variantjs/core'],
      output: {
        globals: {
          vue: 'Vue',
          '@variantjs/core': 'variantjs-core',
          '@popperjs/core': 'popperjs-core',
        },
      }
    }
  }
})
