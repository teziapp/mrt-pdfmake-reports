import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GroupingPanel } from './index';
import { MRT_TableInstance } from 'material-react-table';

const meta: Meta<typeof GroupingPanel> = {
  title: 'Components/GroupingPanel',
  component: GroupingPanel,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof GroupingPanel>;

// Mock table instance
const createMockInstance = (grouping: string[]) => ({
  getState: () => ({ grouping }),
  getAllLeafColumns: () => [
    { id: 'name', columnDef: { header: 'Name' } },
    { id: 'age', columnDef: { header: 'Age' } },
    { id: 'city', columnDef: { header: 'City' } },
    { id: 'country', columnDef: { header: 'Country' } },
  ],
  setGrouping: () => {},
}) as unknown as MRT_TableInstance<any>;

export const NoGrouping: Story = {
  args: {
    instance: createMockInstance([]),
  },
};

export const SingleGrouping: Story = {
  args: {
    instance: createMockInstance(['city']),
  },
};

export const MultipleGrouping: Story = {
  args: {
    instance: createMockInstance(['country', 'city']),
  },
}; 