import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/api':{
        target: 'http://localhost:8080',
        rewrite:(path)=>path.replace(/^\/api/,'')
      },
      '/chat':{
        target: 'http://localhost:8081',
        rewrite:(path)=>path.replace(/^\/chat/,'')
      },
    },
    port:parseInt(process.env.VITE_SERVER_PORT) || 3000,
  },
  
  define:{
    'process.env':process.env,
    global:{}
  },

  optimizeDeps: {
    exclude: ['socket.io-client']
  }
})
