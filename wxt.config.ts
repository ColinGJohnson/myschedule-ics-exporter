import { defineConfig } from 'wxt';
import path from "path"
import tailwindcss from "@tailwindcss/vite"

// See https://wxt.dev/api/config.html
export default defineConfig({
  vite: () => ({
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./"),
      },
    },
  }),
  modules: [
      '@wxt-dev/module-react',
      '@wxt-dev/auto-icons',
  ],
  autoIcons: {
    grayscaleOnDevelopment: false,
    baseIconPath: "assets/calendar-plus.svg"
  },
  manifest: {
    action: {
      default_title: 'MySchedule ICS Downloader',
    },
  },
});
