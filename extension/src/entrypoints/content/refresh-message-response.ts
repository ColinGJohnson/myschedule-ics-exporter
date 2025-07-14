import { Employee } from "./api/employee.ts";
import { ScheduledShiftsResponse } from "./api/scheduled-shifts-response.ts";

export const REFRESH_REQUEST_MESSAGE = "REFRESH_DATA";

export interface RefreshMessageResponse {
  employee?: Employee;
  shifts?: ScheduledShiftsResponse;
  error?: boolean;
}
