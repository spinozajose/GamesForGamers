// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './setupTests.js',
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    css: true,
    // Aumentar timeouts para evitar errores
    testTimeout: 10000,
    hookTimeout: 10000,
    // Para mejor rendimiento
    pool: 'forks',
    poolOptions: {
      forks: {
        maxForks: 1,
        minForks: 1
      }
    }
  },
  server: {
    proxy: {
      '/api/rawg': {
        target: 'https://api.rawg.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/rawg/, '/api'),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Enviando solicitud a RAWG:', req.url);
          });
        }
      }
    }
  }
})