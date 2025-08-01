import { RotateCw } from "lucide-react";
import { Button } from "./ui/button.tsx";
import React from "react";

interface RefreshButtonProps {
  refresh: () => void;
  showText?: boolean;
}

export const RefreshButton = (props: RefreshButtonProps) => {
  return (
    <Button onClick={props.refresh} variant="outline" className="font-semibold" title="Refresh">
      <RotateCw />
      {props.showText ?? "Refresh"}
    </Button>
  );
};
