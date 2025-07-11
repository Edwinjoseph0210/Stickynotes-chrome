import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'src/popup/index.html'),
        content: resolve(__dirname, 'src/content/index.ts'),
        background: resolve(__dirname, 'src/background/index.ts'),
      },
      output: {
        entryFileNames: 'src/[name]/[name].js',
        chunkFileNames: 'src/[name]/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
    emptyOutDir: true,
  },
}); 