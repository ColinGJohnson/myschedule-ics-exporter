import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  CheckboxTree as CheckboxTreeComponent,
  TreeCheckedState,
  TreeNode,
} from "../components/checkbox-tree.tsx";

const sampleTreeData: TreeNode[] = [
  {
    id: "parent1",
    label: "Parent Node 1",
    children: [
      { id: "child1-1", label: "Child 1.1" },
      { id: "child1-2", label: "Child 1.2" },
      {
        id: "child1-3",
        label: "Child 1.3 with Children",
        children: [
          { id: "grandchild1-3-1", label: "Grandchild 1.3.1" },
          { id: "grandchild1-3-2", label: "Grandchild 1.3.2" },
        ],
      },
    ],
  },
  {
    id: "parent2",
    label: "Parent Node 2",
    children: [
      { id: "child2-1", label: "Child 2.1" },
      { id: "child2-2", label: "Child 2.2" },
    ],
  },
  { id: "parent3", label: "Parent Node 3 (No Children)" },
];

const initialCheckedState: TreeCheckedState = {
  parent1: true,
  "child1-1": true,
  "child1-2": true,
  "child1-3": true,
  "grandchild1-3-1": true,
  "grandchild1-3-2": true,
};

const CheckboxTreeWithState = ({
  data,
  initialChecked,
}: {
  data: TreeNode[];
  initialChecked: TreeCheckedState;
}) => {
  const [checked, setChecked] = useState<TreeCheckedState>(initialChecked);
  return <CheckboxTreeComponent data={data} checked={checked} setChecked={setChecked} />;
};

// https://storybook.js.org/docs/
const meta = {
  title: "components/CheckboxTree",
  component: CheckboxTreeWithState,
  argTypes: {
    data: { control: "object" },
    initialChecked: { control: "object" },
  },
  args: {
    data: sampleTreeData,
    initialChecked: initialCheckedState,
  },
} satisfies Meta<typeof CheckboxTreeWithState>;

// noinspection JSUnusedGlobalSymbols (used by Storybook)
export default meta;
type Story = StoryObj<typeof meta>;

// noinspection JSUnusedGlobalSymbols (used by Storybook)
export const CheckboxTree: Story = {};
