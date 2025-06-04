import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    viteReact(),
    tailwindcss(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    watch: {
      // Use polling, with a reasonable interval in ms
      usePolling: true,
      interval: 1000,
    },
    fs: {
      // Allow serving files from outside the root if needed
      strict: false,
    },
    host: true, // equivalent to --host
    port: 3000,
  },
})
