import { createEvents, EventAttributes } from "ics";

export async function downloadIcs(events: EventAttributes[]) {
  if (events.length > 0) {
    const today = new Date().toISOString().split("T")[0]; // E.g. 2025-12-25
    await downloadIcsWithFilename(`MySchedule_${today}.ics`, events);
  }
}

/**
 * Downloads an iCalendar (ICS) file containing the specified events.
 *
 * @param filename - The name of the file to be downloaded, including the file extension.
 * @param events - An array of events formatted as attributes to be included in the ICS file.
 * @return A promise that resolves when the ICS file has been successfully downloaded, or rejects if
 * an error occurs during the process.
 */
export async function downloadIcsWithFilename(filename: string, events: EventAttributes[]) {
  const data: Blob = await new Promise((resolve, reject) => {
    createEvents(events, (error, value) => {
      if (error) {
        reject(error);
      }
      resolve(new Blob([value], { type: "text/calendar" }));
    });
  });
  const url = URL.createObjectURL(data);
  await browser.downloads.download({ url, filename, saveAs: false });
}
