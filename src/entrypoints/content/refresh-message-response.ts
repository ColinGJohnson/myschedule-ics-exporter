import {Employee} from "@/entrypoints/content/api/employee.ts";
import {ScheduledShiftsResponse} from "@/entrypoints/content/api/scheduled-shifts-response.ts";

export const REFRESH_REQUEST_MESSAGE = "REFRESH_DATA"

export interface RefreshMessageResponse {
  employee?: Employee
  shifts?: ScheduledShiftsResponse
  error?: boolean
}
