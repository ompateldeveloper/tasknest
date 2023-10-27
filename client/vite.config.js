import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/':{
        target:'https://tasknest-backend.onrender.com/',
        changeOrigin:true
      }
    }
  },
  plugins: [react()],
})
