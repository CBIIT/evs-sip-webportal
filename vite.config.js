import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `/evssip/`,
  build: {
      outDir: './build'
  },
  test: {
    environment: 'jsdom',
    testMatch: ['./tests/**/*.test.tsx'],
    setupFiles: ['./vitest.setup.js'],
    globals: true
  }
})
