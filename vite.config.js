import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // sockjs-client 등이 브라우저에서 기대하는 global 폴리필
    global: 'globalThis',
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) =>{
          if(id.includes('node_modules'))
            return 'vendor';
        }
      },
    },
  },
});
