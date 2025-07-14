import { Employee, ScheduledShiftsResponse } from "@cgj/myschedule-api";

export const REFRESH_REQUEST_MESSAGE = "REFRESH_DATA";

export interface RefreshMessageResponse {
  employee?: Employee;
  shifts?: ScheduledShiftsResponse;
  error?: boolean;
}
