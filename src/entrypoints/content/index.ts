import {Employee} from "@/entrypoints/content/api/employee.ts";
import {fetchScheduledShifts} from "@/entrypoints/content/api/scheduled-shifts-api.ts";
import {browser} from '@wxt-dev/browser';
import {REFRESH_REQUEST_MESSAGE, RefreshMessageResponse} from "@/entrypoints/content/refresh-message-response.ts";

export default defineContentScript({
  matches: [
      'https://myschedule.islandhealth.ca/*',
      'https://myschedule.fraserhealth.ca/*',
      'https://myschedule.vch.ca/*',
      'https://www.cgj.dev/*'
  ],
  main() {
    const employeeBase64 = document.getElementById("react")?.dataset?.targetEmployee;
    const employee = employeeBase64 ? JSON.parse(atob(employeeBase64)) as Employee : undefined;

    browser.runtime.onMessage.addListener((message, sender, sendResponse: (response: RefreshMessageResponse) => void) => {
      if (message?.type !== REFRESH_REQUEST_MESSAGE) {
        return
      }

      if (!employee) {
        console.info("No employee data found on the current page.")
        sendResponse({ });
        return
      }

      fetchScheduledShifts(employee.id, 2025, 6).then(ApiResponse => {
        const refreshResponse: RefreshMessageResponse = {
          employee: employee,
          shifts: ApiResponse.body,
          error: !!ApiResponse.error
        };
        sendResponse(refreshResponse);
      }).catch(error => {
        console.error("Unexpected error while fetching shifts!", error);
        sendResponse({ error: true });
      })

      // From https://developer.chrome.com/docs/extensions/develop/concepts/messaging:
      // If you want to do asynchronous work to get the value passed to sendResponse, you must return a literal true
      // (not just a truthy value) from the event listener. Doing so will keep the message channel open to the other
      // end until sendResponse is called.
      return true
    });
  },
});
