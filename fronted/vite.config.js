import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config for React project
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Ensure the output folder is set to 'dist'
    emptyOutDir: true,  // Clears the dist folder before building
  },
});
