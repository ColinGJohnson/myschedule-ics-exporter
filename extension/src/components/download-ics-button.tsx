import { Button } from "./ui/button.tsx";
import { CalendarArrowDown } from "lucide-react";
import React from "react";
import { downloadIcs } from "../utils/download-ics.ts";
import { EventAttributes } from "ics";
import { toast } from "sonner";

interface DownloadIcsButtonProps {
  events: EventAttributes[];
}

export const DownloadIcsButton = ({ events }: DownloadIcsButtonProps) => {
  const disabled = events.length === 0;

  const handleDownload = async () => {
    if (disabled) {
      toast.error("Please select at least one event to download.");
    } else {
      await downloadIcs(events);
    }
  };

  return (
    <Button onClick={handleDownload} className="font-semibold shadow">
      <CalendarArrowDown />
      Download as .ics
    </Button>
  );
};
