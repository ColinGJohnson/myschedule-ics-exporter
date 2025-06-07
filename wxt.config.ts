import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
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
