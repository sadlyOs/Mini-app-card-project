import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import svgr from 'vite-plugin-svgr'
// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [react(), tailwindcss(), svgr()],
  server: {
    host: '0.0.0.0',  // Доступ снаружи
    port: 5173,       // Порт разработки
    strictPort: true, // Не менять порт
    // Важно для работы через прокси
    hmr: {
      host: 'localhost'
    },
    // server: {
    //   proxy: {
    //     '/api': {
    //       target: 'http://10.2.2.2:4850',
    //       changeOrigin: true,
    //       secure: false,
    //     },
    //     '/ws': {
    //       target: 'http://10.2.2.2:4850',
    //       ws: true, // Включает проксирование веб-сокетов
    //     },
    //   }
    // },
    allowedHosts: ['pinguincode.com', "b5f753307645.ngrok-free.app"]
  }
})
