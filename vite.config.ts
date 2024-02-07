import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as dotenv from 'dotenv';
dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/api':{
        target: 'http://localhost:8080',
        rewrite:(path)=>path.replace(/^\/api/,'')
      }
    }
  },
  define:{
    'process.env':process.env
  }
})
