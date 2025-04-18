import { useMemo } from 'react';
import { useTheme } from '@mui/material';
import type { SmartTableThemeOverrides } from '../types/theme';

export const useTableTheme = (themeOverrides?: SmartTableThemeOverrides) => {
  const theme = useTheme();

  const muiProps = useMemo(() => {
    const defaultProps = {
      muiTablePaperProps: {
        elevation: 0,
        sx: {
          borderRadius: themeOverrides?.global?.borderRadius ?? '0.5rem',
          border: '1px solid',
          borderColor: theme.palette.divider,
          boxShadow: themeOverrides?.global?.boxShadow,
          fontFamily: themeOverrides?.global?.fontFamily,
          ...(themeOverrides?.row && {
            '& .MuiTableRow-root': {
              backgroundColor: themeOverrides.row.backgroundColor,
              height: themeOverrides.row.height,
              '&:hover': {
                backgroundColor: themeOverrides.row.hoverBackgroundColor,
              },
              '&.Mui-selected': {
                backgroundColor: themeOverrides.row.selectedBackgroundColor,
              },
              borderColor: themeOverrides.row.borderColor,
            },
          }),
          ...(themeOverrides?.cell && {
            '& .MuiTableCell-root': {
              padding: themeOverrides.cell.padding,
              fontSize: themeOverrides.cell.fontSize,
              borderColor: themeOverrides.cell.borderColor,
              textAlign: themeOverrides.cell.textAlign,
            },
          }),
          ...(themeOverrides?.header && {
            '& .MuiTableHead-root .MuiTableCell-root': {
              backgroundColor: themeOverrides.header.backgroundColor,
              color: themeOverrides.header.color,
              fontSize: themeOverrides.header.fontSize,
              fontWeight: themeOverrides.header.fontWeight,
              borderColor: themeOverrides.header.borderColor,
              height: themeOverrides.header.height,
            },
          }),
        },
      },
      muiTopToolbarProps: {
        sx: {
          ...(themeOverrides?.toolbar && {
            backgroundColor: themeOverrides.toolbar.backgroundColor,
            borderColor: themeOverrides.toolbar.borderColor,
            height: themeOverrides.toolbar.height,
            padding: themeOverrides.toolbar.padding,
            '& .MuiButton-root': {
              variant: themeOverrides.toolbar.buttonVariant,
              size: themeOverrides.toolbar.buttonSize,
            },
          }),
        },
      },
      muiBottomToolbarProps: {
        sx: {
          ...(themeOverrides?.toolbar && {
            backgroundColor: themeOverrides.toolbar.backgroundColor,
            borderColor: themeOverrides.toolbar.borderColor,
            height: themeOverrides.toolbar.height,
            padding: themeOverrides.toolbar.padding,
          }),
          ...(themeOverrides?.pagination && {
            '& .MuiButton-root': {
              variant: themeOverrides.pagination.buttonVariant,
              size: themeOverrides.pagination.buttonSize,
            },
            backgroundColor: themeOverrides.pagination.backgroundColor,
            borderColor: themeOverrides.pagination.borderColor,
            height: themeOverrides.pagination.height,
          }),
        },
      },
      muiFilterTextFieldProps: {
        sx: {
          ...(themeOverrides?.filter && {
            backgroundColor: themeOverrides.filter.backgroundColor,
            borderColor: themeOverrides.filter.borderColor,
            '& .MuiInputBase-root': {
              variant: themeOverrides.filter.inputVariant,
              size: themeOverrides.filter.inputSize,
            },
          }),
        },
      },
      muiTableBodyCellProps: {
        sx: {
          ...(themeOverrides?.cell && {
            padding: themeOverrides.cell.padding,
            fontSize: themeOverrides.cell.fontSize,
            borderColor: themeOverrides.cell.borderColor,
            textAlign: themeOverrides.cell.textAlign,
          }),
        },
      },
      muiTableHeadCellProps: {
        sx: {
          ...(themeOverrides?.header && {
            backgroundColor: themeOverrides.header.backgroundColor,
            color: themeOverrides.header.color,
            fontSize: themeOverrides.header.fontSize,
            fontWeight: themeOverrides.header.fontWeight,
            borderColor: themeOverrides.header.borderColor,
            height: themeOverrides.header.height,
          }),
        },
      },
      muiTableBodyProps: {
        sx: {
          ...(themeOverrides?.loadingOverlay && {
            '& .MuiLinearProgress-root': {
              backgroundColor: themeOverrides.loadingOverlay.backgroundColor,
              opacity: themeOverrides.loadingOverlay.opacity,
              '& .MuiLinearProgress-bar': {
                backgroundColor: themeOverrides.loadingOverlay.spinnerColor,
              },
            },
          }),
        },
      },
      muiTableDetailPanelProps: {
        sx: {
          ...(themeOverrides?.detailPanel && {
            backgroundColor: themeOverrides.detailPanel.backgroundColor,
            borderColor: themeOverrides.detailPanel.borderColor,
            padding: themeOverrides.detailPanel.padding,
          }),
        },
      },
    };

    return defaultProps;
  }, [theme, themeOverrides]);

  return muiProps;
}; 