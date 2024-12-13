import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@studio-freight/lenis': '@studio-freight/lenis/dist/lenis.esm.js',
    },
  },
  build: {
    rollupOptions: {
      external: ["@studio-freight/lenis"], // Externalize if needed
    },
  },
});
