import {Button} from "@/components/ui/button"
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {Separator} from "@/components/ui/separator"
import {ScrollArea} from "@/components/ui/scroll-area"
import {CalendarArrowDown, Info, Loader2, RotateCw} from "lucide-react";
import {downloadICS} from "@/utils/download-ics.ts";
import {CheckboxTree, TreeNode} from "@/components/checkbox-tree.tsx";
import {useContentScriptData} from "@/hooks/useContentScriptData.ts";
import {EventAttributes} from "ics";
import {REFRESH_REQUEST_MESSAGE, RefreshMessageResponse} from "@/entrypoints/content/refresh-message-response.ts";
import {ReactNode, useState} from "react";
import {ScheduledShiftsData} from "@/entrypoints/content/api/scheduled-shifts-response.ts";


export default function App() {
  const {response, error, isLoading, refresh} = useContentScriptData<RefreshMessageResponse>({
    type: REFRESH_REQUEST_MESSAGE
  });

  let content: ReactNode;
  if (isLoading) {
    content = <LoadingSpinner/>
  } else if (error || response?.error || !response?.shifts?.data) {
    content = <NoDataFoundAlert/>
  } else {
    content = <CalendarExporter refresh={refresh} schedule={response.shifts.data} />
  }

  return (
    <div className="min-h-50 min-w-90 flex flex-col items-stretch p-3 gap-3">
      <h1 className="text-lg font-semibold">
        MySchedule Calendar Exporter
      </h1>
      <div className="flex flex-col grow">
        {content}
      </div>
      <Separator />
      <div className="text-muted-foreground text-xs">
        Made with ❤️ for Emma
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex flex-row items-center gap-2">
      <Loader2 className="animate-spin"/>
      <p>Looking for your shifts...</p>
    </div>
  );
}

function NoDataFoundAlert() {
  return (
    <Alert variant="default">
      <Info/>
      <AlertTitle>No shifts found on this page</AlertTitle>
      <AlertDescription>
        Ensure you are logged in to MySchedule and on the shift calendar page.
      </AlertDescription>
    </Alert>
  )
}

function CalendarExporter(props: { refresh: () => void, schedule: ScheduledShiftsData }) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const events = convertToEventAttributes(props.schedule)
  console.log(events)

  const groupedMyMonth = Object.groupBy(events, event => event.start.toString())
  const eventsTreeData: TreeNode[] = Object.entries(groupedMyMonth)
      .map(([month, events]) => {
        if (!events || events.length === 0) {
          return undefined;
        }
        return {
          id: month,
          label: month,
          children: events.map(event => ({ id: event.uid!, label: event.title! }))
        }
      })
      .filter(treeNode => !!treeNode)

  const handleDownload = async () => {
    await downloadICS('ExampleEvent.ics', events)
  }

  return <div className="flex flex-col gap-3">
    <ScrollArea className="h-[235px] rounded-md border p-2">
      <div className="flex flex-col gap-2">
        <CheckboxTree data={eventsTreeData} checked={checked} setChecked={setChecked} />
      </div>
    </ScrollArea>
    <Button onClick={props.refresh} variant="outline" className="font-semibold shadow">
      <RotateCw />
      Refresh shifts
    </Button>
    <Button onClick={handleDownload} className="font-semibold shadow">
      <CalendarArrowDown/>
      Download as .ics
    </Button>
    <p>
      Once you download events, they will not update automatically! &nbsp;
      <a href="https://www.cgj.dev/" target="_blank" className="underline">Need help?</a>
    </p>
  </div>;
}

function convertToEventAttributes(schedule: ScheduledShiftsData): EventAttributes[] {
  console.log("converting", schedule)
  return schedule.scheduled_shifts
      // TODO: Filter out vacation shifts
      // .filter ..filter((shift) => shift.shift_class !== 'Vacation')
      .map((shift) => {
        return {
          start: shift.start_timestamp,
          end: shift.end_timestamp,
          title: shift.display_str,
          description: `Shift Class: ${shift.shift_class}, Payroll Code: ${shift.payroll_code}`,
          uid: shift.id.toString(),
          categories: [shift.shift_icon],
          status: 'CONFIRMED',
          busyStatus: 'BUSY',
          classification: 'PUBLIC',
          location: schedule.region_departments
              .find((department) => department.id === shift.department)?.name,
        };
      });
}
