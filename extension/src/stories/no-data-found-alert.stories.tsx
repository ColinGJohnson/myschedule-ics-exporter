import type { Meta, StoryObj } from "@storybook/react-vite";
import { PopupLayout } from "../components/popup-layout.tsx";
import { NoDataFoundAlert as DataNotFoundAlertComponent } from "../components/no-data-found-alert.tsx";
import { fn } from "storybook/test";

// https://storybook.js.org/docs/
const meta = {
  title: "popup/NoDataFoundAlert",
  component: DataNotFoundAlertComponent,
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
  args: { refresh: fn() },
} satisfies Meta<typeof DataNotFoundAlertComponent>;

// noinspection JSUnusedGlobalSymbols (used by Storybook)
export default meta;
type Story = StoryObj<typeof meta>;

export const NoDataFoundAlert: Story = {};
