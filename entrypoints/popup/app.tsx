import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Info } from "lucide-react";
import {downloadICS} from "@/utils/ics-example.ts";
import {CheckboxTree} from "@/components/checkbox-tree.tsx";


const treeData = [
  {
    id: "1",
    label: "2025",
    children: [
      { id: "2025-January", label: "January"},
      { id: "2025-February", label: "February"},
      { id: "2025-March", label: "March"},
      { id: "2025-April", label: "April"},
      { id: "2025-May", label: "May"},
      { id: "2025-June", label: "June"},
      { id: "2025-July", label: "July"},
      { id: "2025-August", label: "August"},
      { id: "2025-September", label: "September"},
      { id: "2025-October", label: "October"},
      { id: "2025-November", label: "November"},
      { id: "2025-December", label: "December"},
    ]
  },
  {
    id: "2",
    label: "2026",
    children: [
      { id: "2026-January", label: "January"},
      { id: "2026-February", label: "February"},
      { id: "2026-March", label: "March"},
      { id: "2026-April", label: "April"},
      { id: "2026-May", label: "May"},
      { id: "2026-June", label: "June"},
      { id: "2026-July", label: "July"},
      { id: "2026-August", label: "August"},
      { id: "2026-September", label: "September"},
      { id: "2026-October", label: "October"},
      { id: "2026-November", label: "November"},
      { id: "2026-December", label: "December"},
    ]
  }
];


function App() {
  const handleDownload = async () => {
    await downloadICS('ExampleEvent.ics')
  }

  const handleTreeChange = (selected: string[]) => {
    console.log("Selected nodes:", selected);
  };

  if (!treeData) {
    return (
        <div className="flex flex-col items-stretch p-3 gap-3">
          <Alert variant="default">
            <Info />
            <AlertTitle>No data found on this page</AlertTitle>
            <AlertDescription>
              Shifts are available to download here once you've viewed the MySchedule calendar page.
            </AlertDescription>
          </Alert>
        </div>
      )
  }

  return (
    <div className="flex flex-col items-stretch p-3 gap-3">
      <h1 className="text-lg font-semibold">
        Select months to download
      </h1>
      <ScrollArea className="h-[235px] rounded-md border p-3">
        <div className="flex flex-col gap-2">
          <CheckboxTree data={treeData} onChange={handleTreeChange} />
        </div>
      </ScrollArea>
      <Button onClick={handleDownload}>Download as .ics</Button>
      <div className="text-muted-foreground text-xs">
        Made with ❤️ for Emma
      </div>
    </div>
  );
}

export default App;
