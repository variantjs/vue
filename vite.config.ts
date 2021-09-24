import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import typescript from '@rollup/plugin-typescript'

export default defineConfig({
  plugins: [vue()],
  build: {
    minify: false,
    sourcemap: true,
    lib: {
      formats: ['es', 'cjs'],
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'VariantJS',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      plugins: [
        typescript({
          "exclude": ["node_modules", 'src/__tests/**/*']
        }),
      ],
      external: ['vue', '@popperjs/core'],
      output: {
        globals: {
          vue: 'Vue'
        },
      }
    }
  }
})
