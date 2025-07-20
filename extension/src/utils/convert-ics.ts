import { ScheduledShift, ScheduledShiftsData } from "@cgj/myschedule-api";
import { EventAttributes } from "ics";

/**
 * Converts scheduled shift data retrieved from the MySchedule API into event attributes consumable
 * by https://www.npmjs.com/package/ics.
 *
 * @param schedule - Scheduled shifts from MySchedule.
 * @param selectedPayrollCodeIds - Other payroll codes are filtered out.
 * @return A list of ICS calendar events.
 */
export function convertToIcsEvents(
  schedule: ScheduledShiftsData,
  selectedPayrollCodeIds: number[],
): EventAttributes[] {
  return schedule.scheduled_shifts
    .filter((shift) => selectedPayrollCodeIds.includes(shift.payroll_code))
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
