import type { Meta, StoryObj } from "@storybook/react";
import { SmartTableSettings } from "./smart_table_settings";

// Sample table data and columns for demonstration
const sampleColumns = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
];

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
];

const defaultTableState = {
  searchTerm: '',
  filters: [],
  sortBy: [],
  groupBy: [],
  columnVisibility: {},
  pagination: {
    pageIndex: 0,
    pageSize: 10,
  },
};

const meta = {
  title: "Components/SmartTableSettings",
  component: SmartTableSettings,
  tags: ["autodocs"],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A configurable table settings component that provides search, filter, sort, group, and column visibility controls. Can be positioned in various ways around the table.',
      },
    },
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['left-drawer', 'right-drawer', 'top', 'bottom', 'floating'],
      description: 'Position of the settings panel',
      table: {
        defaultValue: { summary: 'right-drawer' },
      },
    },
    onSearch: { action: 'search' },
    onFilter: { action: 'filter' },
    onSort: { action: 'sort' },
    onGroup: { action: 'group' },
    onColumnVisibilityChange: { action: 'columnVisibility' },
  },
} satisfies Meta<typeof SmartTableSettings>;

export default meta;
type Story = StoryObj<typeof meta>;

// Base story with all features enabled
export const AllFeatures: Story = {
  args: {
    position: "right-drawer",
    tableInstance: {
      columns: sampleColumns,
      data: sampleData,
    },
    tableState: defaultTableState,
  },
};

// Different position variants
export const LeftDrawer: Story = {
  args: {
    ...AllFeatures.args,
    position: "left-drawer",
  },
};

export const RightDrawer: Story = {
  args: {
    ...AllFeatures.args,
    position: "right-drawer",
  },
};

export const TopBar: Story = {
  args: {
    ...AllFeatures.args,
    position: "top",
  },
};

export const BottomBar: Story = {
  args: {
    ...AllFeatures.args,
    position: "bottom",
  },
};