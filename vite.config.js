// vite.config.js — SRS §1.3 + buenas-practicas §5 (code splitting)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'gsap-vendor': ['gsap', '@gsap/react'],
          'mui-vendor': ['@mui/material', '@emotion/react', '@emotion/styled'],
          // three.js: lazy loaded via React.lazy() — auto-splits en chunk propio
        },
      },
    },
  },
});
