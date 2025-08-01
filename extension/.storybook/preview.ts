import type { Preview } from "@storybook/react-vite";
import "../src/entrypoints/popup/style.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

// noinspection JSUnusedGlobalSymbols (used by Storybook)
export default preview;
