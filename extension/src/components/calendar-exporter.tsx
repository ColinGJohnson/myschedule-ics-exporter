import { Employee, ScheduledShiftsData } from "@cgj/myschedule-api";
import React, { useState } from "react";
import { CheckboxTree, TreeCheckedState, TreeNode } from "./checkbox-tree.tsx";
import { ScrollArea } from "./ui/scroll-area.tsx";
import { Checkbox } from "./ui/checkbox.tsx";
import { Separator } from "./ui/separator.tsx";
import { EventAttributes } from "ics";
import { convertToIcsEvents } from "../utils/convert-ics.ts";
import { DownloadIcsButton } from "./download-ics-button.tsx";
import { RefreshButton } from "./refresh-button.tsx";
import { ShiftTypeFilter } from "./shift-type-filter.tsx";

export function CalendarExporter(props: {
  refresh: () => void;
  schedule: ScheduledShiftsData;
  employee: Employee;
}) {
  const [checked, setChecked] = useState<TreeCheckedState>({});
  const [selectedPayrollCodeIds, setSelectedPayrollCodeIds] = useState<number[]>(
    getInitialFilter(props.schedule),
  );

  const events = convertToIcsEvents(props.schedule, selectedPayrollCodeIds);
  const selected = events.filter((event) => checked[event.uid!]);

  const handleCheckAll = (checked: boolean) => {
    setChecked(mapAllTo(events, checked));
  };

  return (
    <div className="flex flex-col gap-3">
      <p>
        {props.employee.display_str}
        <span className="text-muted-foreground">({props.employee.work_email})</span>
      </p>
      <ShiftTypeFilter
        payrollCodes={props.schedule.payroll_codes}
        selectedPayrollCodeIds={selectedPayrollCodeIds}
        setSelectedPayrollCodeIds={setSelectedPayrollCodeIds}
      />
      <ScrollArea className="h-[300px] rounded-md border p-2">
        {selectedPayrollCodeIds.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="select-all"
                checked={events.length === selected.length}
                onCheckedChange={handleCheckAll}
                className="ml-7"
              />
              <label htmlFor="select-all" className="cursor-pointer text-sm">
                Select all
              </label>
            </div>
            <Separator />
            <CheckboxTree data={createTree(events)} checked={checked} setChecked={setChecked} />
          </div>
        )}
      </ScrollArea>
      <div className="flex items-center justify-between gap-3">
        <RefreshButton refresh={props.refresh} showText={false} />
        <div className="flex grow flex-col items-stretch justify-center">
          <DownloadIcsButton events={selected} />
        </div>
      </div>
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

/**
 * Determines an initial state for the payroll code filter dropdown.
 */
function getInitialFilter(schedule: ScheduledShiftsData) {
  return schedule.payroll_codes
    .map((code) => code.id)
    .filter((value, index, array) => array.indexOf(value) === index);
}
