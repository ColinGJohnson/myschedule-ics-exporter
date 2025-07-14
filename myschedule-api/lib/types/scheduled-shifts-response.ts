/**
 * Observed in response from https://myschedule.islandhealth.ca//api/v1/employee/${employeeId}/scheduled-shifts/${params}
 */
export interface ScheduledShiftsResponse {
  data: ScheduledShiftsData;
}

export interface ScheduledShiftsData {
  payroll_codes: PayrollCode[];
  occupations: Occupation[];
  region_departments: RegionDepartment[];
  scheduled_shifts: ScheduledShift[];
  meta: Meta;
}

export interface PayrollCode {
  id: number;
  display_code: string;
  desc: string;
  classification: string[];
}

export interface Occupation {
  id: number;
  display_str: string;
  union: number;
  occupation_class: number;
  job_code: number;
  long_description: string;
  desc: string;
  links: {
    home_assignments: string;
    employees: string;
  };
}

export interface RegionDepartment {
  id: number;
  identifier: string;
  name: string;
  short_name: string;
  facility: Facility;
  scheduling_team: SchedulingTeam;
  phone_number: string | null;
  fallback_email: string;
  time_zone: string;
  display_str: string;
  links: {
    employees: string;
    union_department_rules: string;
  };
}

export interface Facility {
  id: number;
  name: string;
  short_name: string;
  display_str: string;
}

export interface SchedulingTeam {
  name: string;
  display_str: string;
  sorting_index: number;
  visible_in_regional_dashboard: boolean;
}

export interface ScheduledShift {
  display_str: string;
  id: number;
  shift_icon: string;
  shift_class: string;
  payroll_code: number;
  start_timestamp: string;
  end_timestamp: string;
  occupation: number;
  department: number;
  employee: number;
  duration_hours: number;
  date: string;
  external_reference_id: string | null;
}

export interface Meta {
  page: number;
  per_page: number;
  total_results: number;
  total_pages: number;
}
