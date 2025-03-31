import { defineConfig } from 'vite'
import dotenv from 'dotenv'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

// Load environment variables from .env file
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  base: process.env.VITE_EVSSIP_BASENAME || '/',
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
  test: {
    environment: 'jsdom',
    testMatch: ['./tests/**/*.test.tsx'],
    setupFiles: ['./vitest.setup.js'],
    globals: true,
  },
  resolve: {
    alias: [
      { find: '@', replacement: new URL('src/', import.meta.url).pathname },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
})
