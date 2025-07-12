import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { CalendarExporter } from "@/entrypoints/popup/calendar-exporter.tsx";

// https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "CalendarExporter",
  component: CalendarExporter,

  // https://storybook.js.org/docs/configure/story-layout
  parameters: {
    layout: "centered",
  },

  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    schedule: { control: "object" },
    employee: { control: "object" },
  },

  // Track refresh invocations: https://storybook.js.org/docs/essentials/actions#action-args
  args: { refresh: fn() },
} satisfies Meta<typeof CalendarExporter>;

// noinspection JSUnusedGlobalSymbols (used by Storybook)
export default meta;
type Story = StoryObj<typeof meta>;

// noinspection JSUnusedGlobalSymbols (used by Storybook)
export const Primary: Story = {
  // https://storybook.js.org/docs/writing-stories/args
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
      work_email: "",
      external_employee_number: "",
      display_str: "",
      links: {
        department: "",
      },
    },
  },
};
