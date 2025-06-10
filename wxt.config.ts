import { defineConfig } from "wxt";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// See: https://wxt.dev/api/config.html
export default defineConfig({
  vite: () => ({
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./"),
      },
    },
  }),
  srcDir: "src",
  modules: ["@wxt-dev/module-react", "@wxt-dev/auto-icons"],
  autoIcons: {
    grayscaleOnDevelopment: false,
    baseIconPath: "assets/calendar-plus.svg",
  },
  manifest: {
    name: "MySchedule ICS Downloader",
    permissions: ["downloads"],
  },
});
