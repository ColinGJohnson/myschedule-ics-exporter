import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert.tsx";
import { Info } from "lucide-react";
import { RefreshButton } from "./refresh-button.tsx";

export interface NoDataFoundAlertProps {
  refresh: () => void;
}

export function NoDataFoundAlert(props: NoDataFoundAlertProps) {
  return (
    <div className="flex flex-col gap-3">
      <Alert variant="default">
        <Info />
        <AlertTitle>No shifts found on this page</AlertTitle>
        <AlertDescription>
          Ensure you are logged in to MySchedule and on the shift calendar page.
        </AlertDescription>
      </Alert>
      <RefreshButton refresh={props.refresh} />
    </div>
  );
}
