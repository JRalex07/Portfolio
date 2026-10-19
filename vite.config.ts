import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  // OLD (Root domain default):
  // base: '/',
  base: '/',
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  build: {
    target: 'esnext',
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          react: ['react', 'react-dom']
        }
      }
    }
  }
}));
