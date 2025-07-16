import { Separator } from "./ui/separator.tsx";
import React from "react";
import { clsx } from "clsx";
import { Toaster } from "./ui/sonner.tsx";

export interface PopupLayoutProps {
  readonly className?: string;
  readonly children?: React.ReactNode;
}

export const PopupLayout = (props: PopupLayoutProps) => {
  const className = clsx(props.className, "flex min-h-50 w-100 flex-col items-stretch gap-3 p-3");
  return (
    <>
      <Toaster />
      <div className={className}>
        <h1 className="text-lg font-semibold">MySchedule Calendar Exporter</h1>
        <div className="flex grow flex-col items-stretch justify-center">{props.children}</div>
        <Separator />
        <div className="text-muted-foreground text-xs">Made with ❤️ for Emma</div>
      </div>
    </>
  );
};
