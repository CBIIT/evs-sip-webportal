import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint(), basicSsl()],
  base: `/evssip`,
  build: {
    outDir: './build',
  },
  test: {
    environment: 'jsdom',
    testMatch: ['./tests/**/*.test.tsx'],
    setupFiles: ['./vitest.setup.js'],
    globals: true,
  },
  server: {
    port: 443,
    host: 'sip-dev.semantics.cancer.gov',
    // https: true
    proxy: {
      '/evssip/api/': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/evssip/, ''),
      },
      '/evssip/service/search/': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/evssip/, ''),
      },
      '/evssip/auth/': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/evssip/, ''),
      },
    },
  },
  resolve: {
    alias: [
      { find: '@', replacement: new URL('src/', import.meta.url).pathname },
    ],
  },
  // resolve: {
  //   alias: {
  //     assets: new URL('src/assets', import.meta.url).pathname,
  //     components: new URL('src/components', import.meta.url).pathname,
  //     layouts: new URL('src/layouts', import.meta.url).pathname,
  //   },
  // },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
})
