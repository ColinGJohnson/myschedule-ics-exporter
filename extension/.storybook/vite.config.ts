import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// WXT's storybook example (https://github.com/wxt-dev/examples/blob/main/examples/storybook/README.md)
// suggests using the WxtVitest() to import vite config from wxt.config.ts, but was causing build errors.
export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
});
