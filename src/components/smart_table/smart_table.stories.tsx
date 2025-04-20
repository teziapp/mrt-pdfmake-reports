import type { Meta, StoryObj } from "@storybook/react";
import { SmartTable } from "./smart_table";

const meta = {
  title: "Example/SmartTable",
  component: SmartTable,
  tags: ["docsPage"],
  argTypes: {
    title: {
      control: { type: "text" },
    },
    description: {
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof SmartTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "Card Title",
    description: "This is a card",
  },
};