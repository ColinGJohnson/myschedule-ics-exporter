import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert.tsx";
import { Info } from "lucide-react";

export function NoDataFoundAlert() {
  return (
    <Alert variant="default">
      <Info />
      <AlertTitle>No shifts found on this page</AlertTitle>
      <AlertDescription>
        Ensure you are logged in to MySchedule and on the shift calendar page.
      </AlertDescription>
    </Alert>
  );
}
