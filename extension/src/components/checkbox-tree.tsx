import React, { Dispatch, SetStateAction } from "react";
import { CheckboxTreeNode } from "./checkbox-tree-node.tsx";

/**
 * A key-value mapping where each key is the ID of a node, and the value is the check state
 * applied to that node.
 */
export type TreeCheckedState = Record<string, boolean>;

export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

export interface CheckboxTreeProps {
  data: TreeNode[];
  checked: TreeCheckedState;
  setChecked: Dispatch<SetStateAction<TreeCheckedState>>;
}

export const CheckboxTree = ({ data, checked, setChecked }: CheckboxTreeProps) => {
  const toggleCheck = ({ id, children }: TreeNode) => {
    setChecked((prev) => {
      if (children && children.length > 0) {
        // If the node is a parent, the children determine the checked state
        const newCheckState = noChildrenChecked(children, checked);
        return Object.assign({ ...prev }, getUpdatesForChildren(children, newCheckState));
      }
      // If the node is a child, it determines its own checked state
      const newCheckState = !prev[id];
      return { ...prev, [id]: newCheckState };
    });
  };

  return (
    <div>
      {data.map((node) => (
        <CheckboxTreeNode key={node.id} node={node} checked={checked} toggleCheck={toggleCheck} />
      ))}
    </div>
  );
};

function noChildrenChecked(children: TreeNode[] | undefined, checked: TreeCheckedState) {
  return !children ? true : children.every((child) => !checked[child.id]);
}

/**
 * Recursively generates a record of updates for the check state of a tree's child nodes.
 *
 * @param nodes - The array of tree nodes to process. If undefined, no updates are made.
 * @param checkState - The desired check state to apply to each node and its children.
 * @returns Updates to the checkbox tree's TreeCheckedState.
 */
function getUpdatesForChildren(
  nodes: TreeNode[] | undefined,
  checkState: boolean,
): TreeCheckedState {
  const updates: TreeCheckedState = {};

  nodes?.forEach((node) => {
    if (!node.children || node.children.length === 0) {
      updates[node.id] = checkState;
    } else {
      Object.assign(updates, getUpdatesForChildren(node.children, checkState));
    }
  });

  return updates;
}
