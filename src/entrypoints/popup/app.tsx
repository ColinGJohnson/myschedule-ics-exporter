import React, { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import { useContentScriptData } from "@/hooks/useContentScriptData.ts";
import {
  REFRESH_REQUEST_MESSAGE,
  RefreshMessageResponse,
} from "@/entrypoints/content/refresh-message-response.ts";
import { NoDataFoundAlert } from "@/components/no-data-found-alert.tsx";
import { LoadingSpinner } from "@/components/loading-spinner.tsx";
import { CalendarExporter } from "@/entrypoints/popup/calendar-exporter.tsx";

export default function App() {
  const { response, error, isLoading, refresh } = useContentScriptData<RefreshMessageResponse>({
    type: REFRESH_REQUEST_MESSAGE,
  });

  let content: ReactNode;
  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (error || response?.error || !response?.shifts?.data || !response?.employee) {
    content = <NoDataFoundAlert />;
  } else {
    content = (
      <CalendarExporter
        refresh={refresh}
        schedule={response.shifts.data}
        employee={response.employee}
      />
    );
  }

  return (
    <div className="flex min-h-50 min-w-90 flex-col items-stretch gap-3 p-3">
      <h1 className="text-lg font-semibold">MySchedule Calendar Exporter</h1>
      <div className="flex grow flex-col">{content}</div>
      <Separator />
      <div className="text-muted-foreground text-xs">Made with ❤️ for Emma</div>
    </div>
  );
}
