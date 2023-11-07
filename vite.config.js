import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    basicSsl(),
  ],
  base: `/sip`,
  build: {
      outDir: './build'
  },
  test: {
    environment: 'jsdom',
    testMatch: ['./tests/**/*.test.tsx'],
    setupFiles: ['./vitest.setup.js'],
    globals: true
  },
  server: {
    port: 443,
    host: 'sip-dev.semantics.cancer.gov',
    //https: true
    proxy: {
      '/evssip': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/evssip/, ''),
      }
    },
  }
})
