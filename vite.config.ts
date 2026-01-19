
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    // This correctly configures the test server to process ESM dependencies from jsdom and its dependency, parse5
    server: {
      deps: {
        inline: [/jsdom/, /parse5/],
      },
    },
  },
});
