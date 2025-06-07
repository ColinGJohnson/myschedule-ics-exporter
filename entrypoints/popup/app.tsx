import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react";
import {downloadICS} from "@/utils/ics-example.ts";

function App() {

  const handleDownload = async () => {
    await downloadICS('ExampleEvent.ics')
  }

  return (
    <div className="flex flex-col items-start p-3 gap-3">
      <Alert variant="default">
        <Info />
        <AlertTitle>Nothing here?</AlertTitle>
        <AlertDescription>
          Months are available to download here once you've viewed the MySchedule calendar.
        </AlertDescription>
      </Alert>
      <Button onClick={handleDownload}>Download as .ics</Button>
      <p className="text-muted-foreground text-xs">
        Made with ❤️ for Emma
      </p>
    </div>
  );
}

export default App;
