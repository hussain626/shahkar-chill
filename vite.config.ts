import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Build a pure SPA: prerender a single index.html shell that hydrates on the client.
    // Netlify serves dist/index.html for every route via the SPA redirect in netlify.toml.
    spa: {
      enabled: true,
      maskPath: "/",
      prerender: {
        enabled: true,
        outputPath: "/index.html",
      },
    },
  },
  vite: {
    build: {
      outDir: "dist",
    },
  },
});
