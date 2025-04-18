import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SmartTable } from '../SmartTable';
import { type SmartTableProps } from '../types/ISmartTable';
import { MRT_ColumnDef } from 'material-react-table';

interface TestData {
  id: number;
  name: string;
  age: number;
}

describe('SmartTable', () => {
  const mockData: TestData[] = [
    { id: 1, name: 'John', age: 25 },
    { id: 2, name: 'Jane', age: 30 },
  ];

  const mockColumns: MRT_ColumnDef<TestData>[] = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'age', header: 'Age' },
  ];

  const mockFetchData = jest.fn().mockResolvedValue({
    data: mockData,
    pageCount: 1
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderSmartTable = (props: Partial<SmartTableProps<TestData>> = {}) => {
    const defaultProps: SmartTableProps<TestData> = {
      columns: mockColumns,
      fetchData: mockFetchData,
      initialPageSize: 10,
      rowCount: 2
    };
    return render(<SmartTable {...defaultProps} {...props} />);
  };

  it('renders without crashing', () => {
    renderSmartTable();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('fetches data on mount', async () => {
    renderSmartTable();
    await waitFor(() => {
      expect(mockFetchData).toHaveBeenCalledTimes(1);
    });
  });

  it('shows PDF export button when enabled', () => {
    renderSmartTable({ enablePDFExport: true });
    expect(screen.getByTestId('export-pdf-button')).toBeInTheDocument();
  });

  it('hides PDF export button when disabled', () => {
    renderSmartTable({ enablePDFExport: false });
    expect(screen.queryByTestId('export-pdf-button')).not.toBeInTheDocument();
  });

  it('calls onExport callback when exporting', async () => {
    const mockOnExport = jest.fn();
    renderSmartTable({
      enablePDFExport: true,
      onExport: mockOnExport,
    });
    
    fireEvent.click(screen.getByTestId('export-pdf-button'));
    expect(mockOnExport).toHaveBeenCalledTimes(1);
  });
}); 