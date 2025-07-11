import { Separator } from "@/components/ui/separator.tsx";
import React from "react";

export interface PopupLayoutProps {
  readonly children?: React.ReactNode;
}

export const PopupLayout = (props: PopupLayoutProps) => {
  return (
    <div className="flex min-h-50 min-w-90 flex-col items-stretch gap-3 p-3">
      <h1 className="text-lg font-semibold">MySchedule Calendar Exporter</h1>
      <div className="flex grow flex-col">{props.children}</div>
      <Separator />
      <div className="text-muted-foreground text-xs">Made with ❤️ for Emma</div>
    </div>
  );
};
