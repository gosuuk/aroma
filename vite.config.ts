import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const indexHtml = fileURLToPath(new URL('./index.html', import.meta.url))
const ncHtml = fileURLToPath(new URL('./nc.html', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: indexHtml,
        nc: ncHtml,
      },
    },
  },
})
