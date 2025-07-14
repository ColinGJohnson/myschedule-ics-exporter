import {
  PayrollCode,
  ScheduledShift,
  ScheduledShiftsData,
} from "@cgj/myschedule-api";
import { EventAttributes } from "ics";

/**
 * Converts scheduled shift data retrieved from the MySchedule API into event attributes consumable
 * by https://www.npmjs.com/package/ics.
 *
 * @param schedule - Scheduled shifts from MySchedule.
 * @param includePlannedLeave - Whether shifts with as payroll code "planned leave" should be included.
 * @return A list of ICS calendar events.
 */
export function convertToIcsEvents(
  schedule: ScheduledShiftsData,
  includePlannedLeave: boolean,
): EventAttributes[] {
  return schedule.scheduled_shifts
    .filter((shift) => includePlannedLeave || isWorkingShift(schedule.payroll_codes, shift))
    .map((shift) => convertToEventAttribute(schedule, shift));
}

function convertToEventAttribute(
  schedule: ScheduledShiftsData,
  shift: ScheduledShift,
): EventAttributes {
  const department = schedule.region_departments.find(
    (department) => department.id === shift.department,
  );
  const occupation = schedule.occupations.find((occupation) => occupation.id === shift.occupation);
  const payrollCode = schedule.payroll_codes.find((code) => code.id === shift.payroll_code);
  const classification = [...new Set(payrollCode?.classification ?? [])].join(",");
  return {
    start: new Date(shift.start_timestamp).getTime(),
    end: new Date(shift.end_timestamp).getTime(),
    title: `${occupation?.desc} ${shift.shift_icon}`,
    description: `${shift.duration_hours} hours ${payrollCode?.desc} ${classification}.`,
    uid: shift.id.toString(),
    categories: [shift.shift_icon],
    status: "CONFIRMED",
    busyStatus: "BUSY",
    classification: "PUBLIC",
    location: department?.name,
  };
}

/**
 * Determines if a scheduled shift is a working shift by checking if its payroll code classification
 * includes "planned leave".
 *
 * @param payroll_codes - An array of payroll code objects used to classify shifts.
 * @param shift - The scheduled shift object that contains details including its payroll code.
 * @return True if the shift is classified as a working shift, otherwise false.
 */
function isWorkingShift(payroll_codes: PayrollCode[], shift: ScheduledShift): boolean {
  const payrollCode = payroll_codes.find((code) => code.id === shift.payroll_code);
  return (
    payrollCode?.classification.find((code) => {
      return code.toLowerCase() === "planned leave";
    }) === undefined
  );
}
