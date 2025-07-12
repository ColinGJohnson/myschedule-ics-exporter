import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { PopupLayout } from "@/components/popup-layout.tsx";
import { CalendarExporter as CalendarExporterComponent } from "@/components/calendar-exporter.tsx";

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
    schedule: {
      payroll_codes: [],
      occupations: [],
      region_departments: [],
      scheduled_shifts: [],
      meta: {
        page: 0,
        per_page: 0,
        total_results: 0,
        total_pages: 0,
      },
    },
    employee: {
      id: 0,
      position_number: 0,
      hsms_user: {
        id: 0,
        username: "",
        first_name: "",
        last_name: "",
        personal_email: null,
        is_multiuser_guest: false,
        is_staff: false,
        is_active: false,
        is_registered: false,
        is_saml_login_enabled: false,
        is_hsms_login_enabled: false,
        current_user_profile: "",
        joined_timestamp: "",
        first_login_timestamp: "",
        last_login_timestamp: "",
        number_of_successful_logins: 0,
        last_activity_timestamp: "",
        last_password_reset_timestamp: "",
        display_str: "",
      },
      union: 0,
      seniority_sort: 0,
      seniority_display: "",
      vacation_bank_required_hours: 0,
      employee_assignment_type: "",
      additional_properties: "",
      home_occupation: 0,
      work_phone: null,
      contact_email: "",
      work_email: "employee@example.com",
      external_employee_number: "",
      display_str: "",
      links: {
        department: "",
      },
    },
  },
};
