import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarArrowDown, RotateCw } from "lucide-react";
import { downloadICS } from "@/utils/download-ics.ts";
import { CheckboxTree, TreeNode } from "@/components/checkbox-tree.tsx";
import { useContentScriptData } from "@/hooks/useContentScriptData.ts";
import { EventAttributes } from "ics";
import {
  REFRESH_REQUEST_MESSAGE,
  RefreshMessageResponse,
} from "@/entrypoints/content/refresh-message-response.ts";
import { ReactNode, useState } from "react";
import {
  PayrollCode,
  ScheduledShift,
  ScheduledShiftsData,
} from "@/entrypoints/content/api/scheduled-shifts-response.ts";
import { NoDataFoundAlert } from "@/components/no-data-found-alert.tsx";
import { LoadingSpinner } from "@/components/loading-spinner.tsx";

export default function App() {
  const { response, error, isLoading, refresh } = useContentScriptData<RefreshMessageResponse>({
    type: REFRESH_REQUEST_MESSAGE,
  });

  let content: ReactNode;
  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (error || response?.error || !response?.shifts?.data) {
    content = <NoDataFoundAlert />;
  } else {
    content = <CalendarExporter refresh={refresh} schedule={response.shifts.data} />;
  }

  return (
    <div className="flex min-h-50 min-w-90 flex-col items-stretch gap-3 p-3">
      <h1 className="text-lg font-semibold">MySchedule Calendar Exporter</h1>
      <div className="flex grow flex-col">{content}</div>
      <Separator />
      <div className="text-muted-foreground text-xs">Made with ❤️ for Emma</div>
    </div>
  );
}

function CalendarExporter(props: { refresh: () => void; schedule: ScheduledShiftsData }) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const events = convertToEventAttributes(props.schedule);

  const eventsTreeData: TreeNode[] = Object.entries(groupEventsByMonth(events))
    .map(([month, events]) => buildSubtreeForMonth(month, events))
    .filter((treeNode) => !!treeNode);

  const handleDownload = async () => {
    const selectedEvents = events.filter((event) => checked[event.uid!]);
    if (selectedEvents.length > 0) {
      const today = new Date().toISOString().split("T")[0]; // E.g. 2025-12-25
      await downloadICS(`MySchedule_${today}.ics`, events);
    }
  };

  return (
    <div className="flex flex-col gap-3">
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
        <CalendarArrowDown />
        Download as .ics
      </Button>
      <p>
        Once you download events, they will not update automatically! &nbsp;
        <a href="https://www.cgj.dev/" target="_blank" rel="noreferrer" className="underline">
          Need help?
        </a>
      </p>
    </div>
  );
}

function groupEventsByMonth(events: EventAttributes[]) {
  return Object.groupBy(events, (event) => {
    const startDate = new Date(event.start as number); // Epoch milliseconds - see convertToEventAttributes()
    return startDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  });
}

function buildSubtreeForMonth(month: string, events?: EventAttributes[]) {
  if (!events || events.length === 0) return undefined;
  return {
    id: month,
    label: month,
    children: events.map((event) => ({
      id: event.uid!,
      label: `${event.title!} ${new Date(event.start as number).toLocaleString()}`,
    })),
  };
}

function convertToEventAttributes(schedule: ScheduledShiftsData): EventAttributes[] {
  return schedule.scheduled_shifts
    .filter((shift) => isWorkingShift(schedule.payroll_codes, shift))
    .map((shift) => convertToEventAttribute(schedule, shift));
}

function convertToEventAttribute(
  schedule: ScheduledShiftsData,
  shift: ScheduledShift,
): EventAttributes {
  const department = schedule.region_departments.find(
    (department) => department.id === shift.department,
  );
  const occupation = schedule.occupations.find((occupation) => occupation.id === shift.occupation);
  return {
    start: new Date(shift.start_timestamp).getTime(),
    end: new Date(shift.end_timestamp).getTime(),
    title: `${occupation?.desc} ${shift.shift_class} Shift ${shift.shift_icon}`,
    description: `${shift.duration_hours} hours ${shift.payroll_code}.`,
    uid: shift.id.toString(),
    categories: [shift.shift_icon],
    status: "CONFIRMED",
    busyStatus: "BUSY",
    classification: "PUBLIC",
    location: department?.name,
  };
}

function isWorkingShift(payroll_codes: PayrollCode[], shift: ScheduledShift) {
  const payrollCode = payroll_codes.find((code) => code.id === shift.payroll_code);
  return (
    payrollCode?.classification.find((code) => {
      return code.toLowerCase() === "planned leave";
    }) === undefined
  );
}
