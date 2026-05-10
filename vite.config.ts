import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    // This tells TanStack Start to specifically package for Netlify
    deployment: 'netlify' 
  },
  vite: {
    // This ensures the build output is clean
    build: {
      outDir: 'dist/client',
    }
  }
});