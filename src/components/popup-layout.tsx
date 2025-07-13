import { Separator } from "@/components/ui/separator.tsx";
import React from "react";
import { clsx } from "clsx";
import { Toaster } from "@/components/ui/sonner.tsx";

export interface PopupLayoutProps {
  readonly className?: string;
  readonly children?: React.ReactNode;
}

export const PopupLayout = (props: PopupLayoutProps) => {
  return (
    <div className={clsx(props.className, "flex min-h-50 w-90 flex-col items-stretch gap-3 p-3")}>
      <Toaster />
      <h1 className="text-lg font-semibold">MySchedule Calendar Exporter</h1>
      <div className="flex grow flex-col items-center justify-center">{props.children}</div>
      <Separator />
      <div className="text-muted-foreground text-xs">Made with ❤️ for Emma</div>
    </div>
  );
};
