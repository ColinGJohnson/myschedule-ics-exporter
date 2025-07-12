import type { Meta, StoryObj } from "@storybook/react-vite";
import { PopupLayout } from "@/components/popup-layout.tsx";
import { LoadingSpinner as LoadingSpinnerComponent } from "@/components/loading-spinner.tsx";

// https://storybook.js.org/docs/
const meta = {
  title: "LoadingSpinnerStories",
  component: LoadingSpinnerComponent,
  decorators: [
    (Story) => (
      <PopupLayout className="border-2">
        <Story />
      </PopupLayout>
    ),
  ],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof LoadingSpinnerComponent>;

// noinspection JSUnusedGlobalSymbols (used by Storybook)
export default meta;
type Story = StoryObj<typeof meta>;

export const LoadingSpinnerStories: Story = {
  args: {},
};
