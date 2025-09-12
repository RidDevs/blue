import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 👈 listen on all network interfaces
    port: 5173,      // you can change port if needed
    open: true       // auto open browser on your machine
  }
})
