import React, {useState} from "react";
import {LucideChevronDown, LucideChevronRight} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox";

interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

interface CheckboxTreeProps {
  data: TreeNode[];
  onChange?: (selected: string[]) => void;
}

export function CheckboxTree({data, onChange}: CheckboxTreeProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({...prev, [id]: !prev[id]}));
  };

  const toggleCheck = (id: string, isParent: boolean, children?: TreeNode[]) => {
    const updateChildren = (nodes: TreeNode[] | undefined, state: boolean) => {
      let updates: Record<string, boolean> = {};
      nodes?.forEach((node) => {
        updates[node.id] = state;
        Object.assign(updates, updateChildren(node.children, state));
      });
      return updates;
    };

    setChecked((prev) => {
      const newChecked = {...prev, [id]: !prev[id]};

      if (isParent && children) {
        Object.assign(newChecked, updateChildren(children, !prev[id]));
      }

      // Send checked nodes to parent
      if (onChange) {
        const selectedNodes = Object.entries(newChecked)
            .filter(([, value]) => value)
            .map(([key]) => key);
        onChange(selectedNodes);
      }

      return newChecked;
    });
  };

  const renderTree = (nodes: TreeNode[], className?: string | undefined) =>
      nodes.map((node) => {
        const allChildrenChecked = !node.children || node.children?.every((child) => checked[child.id]);
        return (
            <div key={node.id} className={className}>
              <div className="flex items-center gap-2">
                {node.children && (
                    <button
                        type="button"
                        onClick={() => toggleExpand(node.id)}
                        className="p-1"
                    >
                      {expanded[node.id] ? (
                          <LucideChevronDown className="w-4 h-4"/>
                      ) : (
                          <LucideChevronRight className="w-4 h-4"/>
                      )}
                    </button>
                )}
                <Checkbox
                    id={node.id}
                    partiallyChecked={!allChildrenChecked}
                    checked={checked[node.id] || false}
                    onCheckedChange={() => toggleCheck(node.id, !!node.children, node.children)}
                />
                <label htmlFor={node.id} className="cursor-pointer">
                  {node.label}
                </label>
              </div>

              {expanded[node.id] && node.children && (
                  <div className="pl-6 flex flex-col gap-1">
                    {renderTree(node.children, 'ml-4')}
                  </div>
              )}
            </div>
        )
      });

  return <div>{renderTree(data)}</div>;
}
