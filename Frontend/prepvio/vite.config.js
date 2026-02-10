import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    proxy: {
      // 🟢 AdminBackend Routes (Port 8000)
      '/api/services': { target: 'https://prepvio-admin-backend.vercel.app', changeOrigin: true },
      '/api/courses': { target: 'https://prepvio-admin-backend.vercel.app', changeOrigin: true },
      '/api/aptitude': { target: 'https://prepvio-admin-backend.vercel.app', changeOrigin: true },
      '/api/categories': { target: 'https://prepvio-admin-backend.vercel.app', changeOrigin: true },
      '/api/dashboard': { target: 'https://prepvio-admin-backend.vercel.app', changeOrigin: true },
      '/api/channels': { target: 'https://prepvio-admin-backend.vercel.app', changeOrigin: true },
      '/api/playlists': { target: 'https://prepvio-admin-backend.vercel.app', changeOrigin: true },
      '/api/quizzes': { target: 'https://prepvio-admin-backend.vercel.app', changeOrigin: true },
      '/api/videos': { target: 'https://prepvio-admin-backend.vercel.app', changeOrigin: true },

      // 🔵 Main Backend Routes (Port 5000)
      '/api': {
        target: 'https://prepvio-main-backend.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
