import React, { Dispatch, SetStateAction, useState } from "react";
import { LucideChevronDown, LucideChevronRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

interface CheckboxTreeProps {
  data: TreeNode[];
  checked: Record<string, boolean>;
  setChecked: Dispatch<SetStateAction<Record<string, boolean>>>;
}

export function CheckboxTree({ data, checked, setChecked }: CheckboxTreeProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCheck = (id: string, isParent: boolean, children?: TreeNode[]) => {
    const updateChildren = (nodes: TreeNode[] | undefined, state: boolean) => {
      const updates: Record<string, boolean> = {};
      nodes?.forEach((node) => {
        updates[node.id] = state;
        Object.assign(updates, updateChildren(node.children, state));
      });
      return updates;
    };

    setChecked((prev) => {
      const newChecked = { ...prev, [id]: !prev[id] };

      if (isParent && children) {
        Object.assign(newChecked, updateChildren(children, !prev[id]));
      }

      return newChecked;
    });
  };

  const renderTree = (nodes: TreeNode[], className?: string | undefined) =>
    nodes.map((node) => {
      const anyChildrenChecked = node.children?.some((child) => checked[child.id]);
      const allChildrenChecked =
        !node.children || node.children?.every((child) => checked[child.id]);
      return (
        <div key={node.id} className={className}>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {node.children && (
                <button type="button" onClick={() => toggleExpand(node.id)} className="p-1">
                  {expanded[node.id] ? (
                    <LucideChevronDown className="h-4 w-4" />
                  ) : (
                    <LucideChevronRight className="h-4 w-4" />
                  )}
                </button>
              )}
              <Checkbox
                id={node.id}
                partiallyChecked={!allChildrenChecked}
                checked={checked[node.id] || anyChildrenChecked || false}
                onCheckedChange={() => toggleCheck(node.id, !!node.children, node.children)}
              />
            </div>
            <label htmlFor={node.id} className="cursor-pointer">
              {node.label}
            </label>
          </div>

          {expanded[node.id] && node.children && (
            <div className="mt-1 mb-2 ml-9 flex flex-col gap-1 border-l-1 border-b-gray-200">
              {renderTree(node.children, "ml-4")}
            </div>
          )}
        </div>
      );
    });

  // return <div>
  //   <Checkbox id="all" partiallyChecked={false} checked={false} onCheckedChange={() => toggleCheck('all', false, data)}/>
  //   <label htmlFor="all" className="cursor-pointer">
  //     Select All
  //   </label>
  //   <Separator />
  //   {renderTree(data)}
  // </div>;

  return <div>{renderTree(data)}</div>;
}
