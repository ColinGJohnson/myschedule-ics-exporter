import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  // Must match the GitHub repository name for hosting via GitHub Pages
  base: "/myschedule-ics-exporter/",
  build: {
    outDir: "dist/web",
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html")
      }
    }
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  }
});