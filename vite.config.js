import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy para RAWG API
      '/api/rawg': {
        target: 'https://api.rawg.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/rawg/, '/api'),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('🎯 Enviando solicitud a RAWG:', req.url);
          });
        }
      }
    }
  }
})