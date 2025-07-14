import { Employee } from "./api/employee.ts";
import { fetchScheduledShifts } from "./api/scheduled-shifts-api.ts";
import {
  REFRESH_REQUEST_MESSAGE,
  RefreshMessageResponse,
} from "./refresh-message-response.ts";

const cache: Map<string, { data: RefreshMessageResponse; timestamp: number }> = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

export default defineContentScript({
  matches: [
    "https://myschedule.islandhealth.ca/*",
    "https://myschedule.fraserhealth.ca/*",
    "https://myschedule.vch.ca/*",
  ],
  main() {
    const employee = getEmployeeData();

    browser.runtime.onMessage.addListener(
      (message, sender, sendResponse: (response: RefreshMessageResponse) => void) => {
        if (message?.type !== REFRESH_REQUEST_MESSAGE) {
          return;
        }

        if (!employee) {
          console.info("No employee data found on the current page.");
          sendResponse({});
          return;
        }

        const today = new Date();
        const cacheKey = `${employee.id}-${today.getFullYear()}-${today.getMonth()}`;
        const cachedData = cache.get(cacheKey);

        // Check if cached data exists and is still valid
        if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
          sendResponse(cachedData.data);
          return;
        }

        // Fetch and cache a new response
        fetchScheduledShifts(employee.id, today.getFullYear(), today.getMonth())
          .then((ApiResponse) => {
            const refreshResponse: RefreshMessageResponse = {
              employee: employee,
              shifts: ApiResponse.body,
              error: !!ApiResponse.error,
            };

            cache.set(cacheKey, {
              data: refreshResponse,
              timestamp: Date.now(),
            });
            sendResponse(refreshResponse);
          })
          .catch((error) => {
            console.error("An unexpected error occurred while fetching shifts.", error);
            sendResponse({ error: true });
          });

        // Return true to keep the message channel open until sendResponse is called asynchronously
        // https://developer.chrome.com/docs/extensions/develop/concepts/messaging
        return true;
      },
    );
  },
});

function getEmployeeData() {
  const employeeBase64 = document.getElementById("react")?.dataset?.targetEmployee;
  return employeeBase64 ? (JSON.parse(atob(employeeBase64)) as Employee) : undefined;
}
