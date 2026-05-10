import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // This tells TanStack to prepare files for a static host like Netlify
    deployment: 'static' 
  },
  vite: {
    build: {
      // This forces the output into a folder Netlify can find
      outDir: 'dist', 
    }
  }
});