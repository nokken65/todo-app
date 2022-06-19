import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import viteCompression from 'vite-plugin-compression';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    viteCompression({
      algorithm: 'brotliCompress',
    }),
    viteCompression({
      algorithm: 'gzip',
    }),
    chunkSplitPlugin({
      strategy: 'default',
      customSplitting: {
        'react-vendor': ['react', 'react-dom'],
        'effector-vendor': ['effector', 'effector-react', '@effector/reflect'],
        'form-vendor': ['react-hook-form', '@hookform/resolvers', 'yup'],
        'supabase-vendor': ['@supabase/supabase-js'],
      },
    }),
    react(),
    tsconfigPaths(),
  ],
  clearScreen: false,
  build: {
    sourcemap: false,
    cssCodeSplit: true,
    minify: 'esbuild',
  },
  server: {
    hmr: true,
    host: true,
    port: 3000,
  },
  publicDir: resolve(__dirname, 'public'),
  root: '.',
});
