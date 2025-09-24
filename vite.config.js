import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Доступ снаружи
    port: 5173,       // Порт разработки
    strictPort: true, // Не менять порт
    // Важно для работы через прокси
    hmr: {
      host: 'localhost'
    },
    allowedHosts: ['pinguincode.com']
  }
})
