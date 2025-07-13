import { LucideChevronDown, LucideChevronRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import React from "react";
import { ExpandedState, TreeNode } from "@/components/checkbox-tree.tsx";

interface CheckboxTreeNodeProps {
  node: TreeNode;
  checked: Record<string, boolean>;
  expanded: ExpandedState;
  toggleExpand: (id: string) => void;
  toggleCheck: (id: string, isParent: boolean, children?: TreeNode[]) => void;
  className?: string;
}

export const CheckboxTreeNode = ({
  node,
  checked,
  expanded,
  toggleExpand,
  toggleCheck,
  className,
}: CheckboxTreeNodeProps) => {
  const hasChildren = !!node.children && node.children.length > 0;
  const anyChildChecked = hasChildren && node.children!.some((child) => checked[child.id]);
  const allChildrenChecked = !hasChildren || node.children!.every((child) => checked[child.id]);
  const isChecked = checked[node.id] || anyChildChecked || false;
  const isPartiallyChecked = anyChildChecked && !allChildrenChecked;

  return (
    <div key={node.id} className={className}>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {hasChildren && (
            <button
              type="button"
              onClick={() => toggleExpand(node.id)}
              className="p-1"
              aria-label={expanded[node.id] ? "Collapse" : "Expand"}
            >
              {expanded[node.id] ? (
                <LucideChevronDown className="h-4 w-4" />
              ) : (
                <LucideChevronRight className="h-4 w-4" />
              )}
            </button>
          )}
          <Checkbox
            id={node.id}
            partiallyChecked={isPartiallyChecked}
            checked={isChecked}
            onCheckedChange={() => toggleCheck(node.id, hasChildren, node.children)}
          />
        </div>
        <label htmlFor={node.id} className="cursor-pointer">
          {node.label}
        </label>
      </div>

      {expanded[node.id] && hasChildren && (
        <div className="mt-1 mb-2 ml-9 flex flex-col gap-1 border-l-1 border-b-gray-200">
          {node.children!.map((childNode) => (
            <CheckboxTreeNode
              key={childNode.id}
              node={childNode}
              checked={checked}
              expanded={expanded}
              toggleExpand={toggleExpand}
              toggleCheck={toggleCheck}
              className="ml-4"
            />
          ))}
        </div>
      )}
    </div>
  );
};
