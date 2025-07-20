import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu.tsx";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button.tsx";
import { PayrollCode } from "@cgj/myschedule-api";
import { ListFilter } from "lucide-react";

type Checked = DropdownMenuCheckboxItemProps["checked"];

interface ShiftTypeFilterProps {
  payrollCodes: PayrollCode[];
  selectedPayrollCodeIds: number[];
  setSelectedPayrollCodeIds: (shiftTypes: number[]) => void;
}

export const ShiftTypeFilter = (props: ShiftTypeFilterProps) => {
  const handleCheckedChange = (payrollCodeId: number, checked: Checked) => {
    const newSelection = checked
      ? [...props.selectedPayrollCodeIds, payrollCodeId]
      : props.selectedPayrollCodeIds.filter((id) => id !== payrollCodeId);
    props.setSelectedPayrollCodeIds(newSelection);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <ListFilter />
          Shift types ({props.selectedPayrollCodeIds.length} selected)
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        {props.payrollCodes.sort(comparePayrollCodes).map((payrollCode) => (
          <DropdownMenuCheckboxItem
            checked={props.selectedPayrollCodeIds.includes(payrollCode.id)}
            onCheckedChange={(checked) => handleCheckedChange(payrollCode.id, checked)}
          >
            {payrollCode.desc}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

function comparePayrollCodes(a: PayrollCode, b: PayrollCode) {
  const descA = a.desc.toLowerCase();
  const descB = b.desc.toLowerCase();

  if (descA < descB) {
    return -1;
  }

  if (descA > descB) {
    return 1;
  }

  return 0;
}
