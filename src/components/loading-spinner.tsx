import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="flex flex-row items-center gap-2">
      <Loader2 className="animate-spin" />
      <p>Looking for your shifts...</p>
    </div>
  );
}
