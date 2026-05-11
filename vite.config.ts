import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Disable the Cloudflare Worker build so the standard SSR/prerender pipeline runs.
  // We deploy the SPA shell to Netlify as static files.
  cloudflare: false,
  tanstackStart: {
    // Pure SPA: prerender a single index.html shell that hydrates on the client.
    // Netlify's SPA redirect (netlify.toml) serves it for every route.
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
