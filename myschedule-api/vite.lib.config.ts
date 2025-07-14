import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      name: "myschedule-api",
      fileName: "main",
      formats: ["es"]
    },
    outDir: "dist/lib",
    emptyOutDir: false,
    sourcemap: true,
    rollupOptions: {
      external: ["window", "document"],
      output: {
        preserveModules: true,
        preserveModulesRoot: "lib"
      }
    }
  }
});
