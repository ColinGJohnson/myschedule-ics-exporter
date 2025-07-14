import type { ScheduledShiftsResponse } from "./types/scheduled-shifts-response";

interface ApiResponse {
  body?: ScheduledShiftsResponse;
  error?: string;
}

export async function fetchScheduledShifts(
  employeeId: number,
  year: number,
  monthIndex: number,
): Promise<ApiResponse> {
  try {
    const response = await fetch(buildFetchUrl(employeeId, year, monthIndex), {
      method: "GET",
      credentials: "include",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Scheduled shifts API responded with status=${response.status}`);
    }

    return { body: await response.json() };
  } catch (error: unknown) {
    console.error(
      `Error fetching shifts for employeeId=${employeeId} year=${year} monthIndex=${monthIndex}`,
      error,
    );
    return {
      error: error instanceof Error ? error.message : "A network error occurred.",
    };
  }
}

function buildFetchUrl(employeeId: number, year: number, monthIndex: number, limit = 1000) {
  const base = window.location.origin;
  const url = new URL(`/api/v1/employee/${employeeId}/scheduled-shifts/`, base);

  const firstDayOfMonth = new Date(year, monthIndex, 1);

  // Passing 0 as the date gives the last day of the previous month.
  const lastDayOfMonth = new Date(firstDayOfMonth.getFullYear() + 1, firstDayOfMonth.getMonth(), 0);

  // API expects just the date part, so drop the time and time zone
  url.searchParams.append("start_date", firstDayOfMonth.toISOString().split("T")[0]);
  url.searchParams.append("end_date", lastDayOfMonth.toISOString().split("T")[0]);

  // Not sure what this query param does, but "real" requests from the MySchedule website use it, so I'll keep it.
  url.searchParams.append("use_resident_shift_override", "0");
  url.searchParams.append("limit", limit.toString());

  return url.toString();
}
