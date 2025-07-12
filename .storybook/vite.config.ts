import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// WXT's storybook example (https://github.com/wxt-dev/examples/blob/main/examples/storybook/README.md)
// suggests using the WxtVitest() to import vite config from wxt.config.ts, but was causing build errors.
// Instead, some config is redefined here.
export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
  optimizeDeps: {
    exclude: ["fsevents", "lightningcss"],
  },
  build: {
    rollupOptions: {
      external: [/\.node$/, "lightningcss"],
    },
  },
  // Explicitly exclude node native modules
  ssr: {
    noExternal: true,
    external: ["fsevents", "lightningcss"],
  },
});
