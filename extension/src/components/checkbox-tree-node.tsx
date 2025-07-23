import { LucideChevronDown, LucideChevronRight } from "lucide-react";
import { Checkbox } from "./ui/checkbox.tsx";
import React, { useState } from "react";
import { TreeNode } from "./checkbox-tree.tsx";

interface CheckboxTreeNodeProps {
  node: TreeNode;
  checked: Record<string, boolean>;
  toggleCheck: (node: TreeNode) => void;
  className?: string;
}

export const CheckboxTreeNode = ({
  node,
  checked,
  toggleCheck,
  className,
}: CheckboxTreeNodeProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasChildren = !!node.children && node.children.length > 0;
  const anyChildChecked = hasChildren && node.children!.some((child) => checked[child.id]);
  const allChildrenChecked = getAllChildrenChecked(hasChildren, node, checked);
  const isChecked = checked[node.id] || anyChildChecked || false;
  const isPartiallyChecked = anyChildChecked && !allChildrenChecked;

  return (
    <div key={node.id} className={className}>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {hasChildren && <ExpanderChevron isExpanded={isExpanded} setIsExpanded={setIsExpanded} />}
          <Checkbox
            id={node.id}
            partiallyChecked={isPartiallyChecked}
            checked={isChecked}
            onCheckedChange={() => toggleCheck(node)}
          />
        </div>
        <label htmlFor={node.id} className="cursor-pointer text-sm">
          {node.label}
        </label>
      </div>

      {isExpanded && hasChildren && (
        <div className="mt-1 mb-2 ml-7 flex flex-col gap-1 border-l-1 border-b-gray-200">
          {node.children!.map((childNode) => (
            <CheckboxTreeNode
              key={childNode.id}
              node={childNode}
              checked={checked}
              toggleCheck={toggleCheck}
              className="ml-4"
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ExpanderChevron = (props: {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}) => {
  return (
    <button
      onClick={() => props.setIsExpanded(!props.isExpanded)}
      aria-label={props.isExpanded ? "Collapse" : "Expand"}
    >
      {props.isExpanded ? (
        <LucideChevronDown className="h-4 w-4" />
      ) : (
        <LucideChevronRight className="h-4 w-4" />
      )}
    </button>
  );
};

function getAllChildrenChecked(
  hasChildren: boolean,
  node: TreeNode,
  checked: Record<string, boolean>,
) {
  return (
    !hasChildren ||
    node.children!.every((child) => checked[child.id] || (child.children?.length ?? 0 > 0))
  );
}
