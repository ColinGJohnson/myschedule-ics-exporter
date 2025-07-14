import { defineConfig } from "vite";

// This is a convenience file that points to the appropriate config based on the build mode
// For library build, use vite.lib.config.ts
// For web build, use vite.web.config.ts
export default defineConfig({
  // Default configuration for development mode
  server: {
    open: true
  }
});
