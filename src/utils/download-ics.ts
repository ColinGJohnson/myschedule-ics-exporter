import { createEvent, createEvents, EventAttributes } from "ics";

export async function downloadICS(filename: string, events: EventAttributes[]) {
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
