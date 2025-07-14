import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { PopupLayout } from "../components/popup-layout.tsx";
import { CalendarExporter as CalendarExporterComponent } from "../components/calendar-exporter.tsx";
import { mockEmployee, mockScheduledShiftsData } from "@cgj/myschedule-api";

// https://storybook.js.org/docs/
const meta = {
  title: "CalendarExporter",
  component: CalendarExporterComponent,
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
  argTypes: {
    schedule: { control: "object" },
    employee: { control: "object" },
  },
  args: { refresh: fn() },
} satisfies Meta<typeof CalendarExporterComponent>;

// noinspection JSUnusedGlobalSymbols (used by Storybook)
export default meta;
type Story = StoryObj<typeof meta>;

// noinspection JSUnusedGlobalSymbols (used by Storybook)
export const CalendarExporter: Story = {
  args: {
    schedule: mockScheduledShiftsData,
    employee: mockEmployee,
  },
};
