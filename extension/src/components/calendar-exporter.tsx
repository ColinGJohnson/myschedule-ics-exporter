import { ScheduledShiftsData, Employee } from "@cgj/myschedule-api";
import React, { useState } from "react";
import { CheckboxTree, CheckedState, TreeNode } from "./checkbox-tree.tsx";
import { Switch } from "./ui/switch.tsx";
import { Label } from "./ui/label.tsx";
import { ScrollArea } from "./ui/scroll-area.tsx";
import { Checkbox } from "./ui/checkbox.tsx";
import { Separator } from "./ui/separator.tsx";
import { EventAttributes } from "ics";
import { convertToIcsEvents } from "../utils/convert-ics.ts";
import { DownloadIcsButton } from "./download-ics-button.tsx";
import { RefreshButton } from "./RefreshButton.tsx";

export function CalendarExporter(props: {
  refresh: () => void;
  schedule: ScheduledShiftsData;
  employee: Employee;
}) {
  const [checked, setChecked] = useState<CheckedState>({});
  const [includePlannedLeave, setIncludePlannedLeave] = useState(false);
  const events = convertToIcsEvents(props.schedule, includePlannedLeave);
  const selected = events.filter((event) => checked[event.uid!]);

  const handleCheckAll = (checked: boolean) => {
    setChecked(mapAllTo(events, checked));
  };

  return (
    <div className="flex flex-col gap-3">
      <p>
        Viewing shifts for&#32;
        <span className="text-muted-foreground">{props.employee.work_email}</span>
      </p>
      <div className="flex items-center space-x-2">
        <Switch
          id="include-planned-leave"
          checked={includePlannedLeave}
          onCheckedChange={setIncludePlannedLeave}
        />
        <Label htmlFor="include-planned-leave">Include planned leave</Label>
      </div>
      <ScrollArea className="h-[300px] rounded-md border p-2">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Checkbox id="select-all" onCheckedChange={handleCheckAll} className="ml-7" />
            <label htmlFor="select-all" className="cursor-pointer">
              Select all
            </label>
          </div>
          <Separator />
          <CheckboxTree data={createTree(events)} checked={checked} setChecked={setChecked} />
        </div>
      </ScrollArea>
      <RefreshButton refresh={props.refresh} />
      <DownloadIcsButton events={selected} />
      <p>
        Once you download events, they will not update automatically!&#32;
        <a href="https://www.cgj.dev/" target="_blank" rel="noreferrer" className="underline">
          Need help?
        </a>
      </p>
    </div>
  );
}

function createTree(events: EventAttributes[]): TreeNode[] {
  return Object.entries(groupEventsByMonth(events))
    .map(([month, events]) => buildSubtreeForMonth(month, events))
    .filter((treeNode) => !!treeNode);
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
    children: events
      .sort((a, b) => (a.start as number) - (b.start as number))
      .map((event) => ({
        id: event.uid!,
        label: `${event.title!} ${new Date(event.start as number).toLocaleString()}`,
      })),
  };
}

/**
 * Maps all event UIDs to the given boolean value.
 *
 * @param events - List of events with UIDs.
 * @param checked - The boolean value to map all event UIDs to.
 * @return Record mapping UIDs to `checked`.
 */
function mapAllTo(events: EventAttributes[], checked: boolean): Record<string, boolean> {
  return events.reduce(
    (acc, event) => {
      acc[event.uid!] = checked;
      return acc;
    },
    {} as Record<string, boolean>,
  );
}
