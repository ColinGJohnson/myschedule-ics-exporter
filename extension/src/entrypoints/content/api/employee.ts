/**
 * Observed structure of data-target-employee attribute on
 * https://myschedule.islandhealth.ca/api/v1/schedule-calendar/me div#react element.
 */
export interface Employee {
  id: number;
  position_number: number;
  hsms_user: HsmsUser;
  union: number;
  seniority_sort: number;
  seniority_display: string;
  vacation_bank_required_hours: number;
  employee_assignment_type: string;
  additional_properties: string;
  home_occupation: number;
  work_phone: string | null;
  contact_email: string;
  work_email: string;
  external_employee_number: string;
  display_str: string;
  links: Links;
}

interface HsmsUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  personal_email: string | null;
  is_multiuser_guest: boolean;
  is_staff: boolean;
  is_active: boolean;
  is_registered: boolean;
  is_saml_login_enabled: boolean;
  is_hsms_login_enabled: boolean;
  current_user_profile: string;
  joined_timestamp: string;
  first_login_timestamp: string;
  last_login_timestamp: string;
  number_of_successful_logins: number;
  last_activity_timestamp: string;
  last_password_reset_timestamp: string;
  display_str: string;
}

interface Links {
  department: string;
}
