import React, { Dispatch, SetStateAction, useState } from "react";
import { CheckboxTreeNode } from "./checkbox-tree-node.tsx";

export type ExpandedState = Record<string, boolean>;
export type CheckedState = Record<string, boolean>;

export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

interface CheckboxTreeProps {
  data: TreeNode[];
  checked: CheckedState;
  setChecked: Dispatch<SetStateAction<CheckedState>>;
}

export function CheckboxTree({ data, checked, setChecked }: CheckboxTreeProps) {
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCheck = (id: string, isParent: boolean, children?: TreeNode[]) => {
    setChecked((prev) => {
      const newCheckState = !prev[id];
      const newChecked = { ...prev, [id]: newCheckState };

      if (isParent && children) {
        Object.assign(newChecked, getUpdatesForChildren(children, newCheckState));
      }

      return newChecked;
    });
  };

  return (
    <div>
      {data.map((node) => (
        <CheckboxTreeNode
          key={node.id}
          node={node}
          checked={checked}
          expanded={expanded}
          toggleExpand={toggleExpand}
          toggleCheck={toggleCheck}
        />
      ))}
    </div>
  );
}

/**
 * Recursively generates a record of updates for the check state of a tree's child nodes.
 *
 * @param nodes - The array of tree nodes to process. If undefined, no updates are made.
 * @param checkState - The desired check state to apply to each node and its children.
 * @returns A key-value mapping where each key is the ID of a node, and the value is the check
 *          state applied to that node.
 */
const getUpdatesForChildren = (
  nodes: TreeNode[] | undefined,
  checkState: boolean,
): CheckedState => {
  const updates: CheckedState = {};

  nodes?.forEach((node) => {
    updates[node.id] = checkState;
    Object.assign(updates, getUpdatesForChildren(node.children, checkState));
  });

  return updates;
};
