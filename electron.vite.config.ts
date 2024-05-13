import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import wasm from 'vite-plugin-wasm'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    css: {
      postcss: {
        plugins: [tailwindcss]
      }
    },
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@': resolve('src')
      }
    },
    plugins: [react(), wasm(), AutoImport({ imports: ['react'] })]
  }
})
