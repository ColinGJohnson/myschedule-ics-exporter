import React from "react";
import { useContentScriptData } from "@/hooks/useContentScriptData.ts";
import {
  REFRESH_REQUEST_MESSAGE,
  RefreshMessageResponse,
} from "@/entrypoints/content/refresh-message-response.ts";
import { NoDataFoundAlert } from "@/components/no-data-found-alert.tsx";
import { LoadingSpinner } from "@/components/loading-spinner.tsx";
import { CalendarExporter } from "@/components/calendar-exporter.tsx";

export default function App() {
  const { response, error, isLoading, refresh } = useContentScriptData<RefreshMessageResponse>({
    type: REFRESH_REQUEST_MESSAGE,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || response?.error || !response?.shifts?.data || !response?.employee) {
    return <NoDataFoundAlert />;
  }

  return (
    <CalendarExporter
      refresh={refresh}
      schedule={response.shifts.data}
      employee={response.employee}
    />
  );
}
