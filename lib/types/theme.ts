import { Theme } from '@mui/material/styles';

/**
 * Theme overrides for different parts of the SmartTable
 */
export interface SmartTableThemeOverrides {
  /**
   * Table header styles
   */
  header?: {
    backgroundColor?: string;
    color?: string;
    fontSize?: string | number;
    fontWeight?: string | number;
    borderColor?: string;
    height?: string | number;
    padding?: string | number;
    hoverBackgroundColor?: string;
    selectedBackgroundColor?: string;
    sortIconColor?: string;
    filterIconColor?: string;
  };
  
  /**
   * Table row styles
   */
  row?: {
    backgroundColor?: string;
    hoverBackgroundColor?: string;
    selectedBackgroundColor?: string;
    borderColor?: string;
    height?: string | number;
    padding?: string | number;
    fontSize?: string | number;
    fontWeight?: string | number;
    evenRowBackgroundColor?: string;
    oddRowBackgroundColor?: string;
  };
  
  /**
   * Table cell styles
   */
  cell?: {
    padding?: string | number;
    fontSize?: string | number;
    borderColor?: string;
    textAlign?: 'left' | 'center' | 'right';
    backgroundColor?: string;
    hoverBackgroundColor?: string;
    selectedBackgroundColor?: string;
    height?: string | number;
    minWidth?: string | number;
    maxWidth?: string | number;
  };
  
  /**
   * Toolbar styles
   */
  toolbar?: {
    backgroundColor?: string;
    borderColor?: string;
    buttonVariant?: 'text' | 'outlined' | 'contained';
    buttonSize?: 'small' | 'medium' | 'large';
    height?: string | number;
    padding?: string | number;
    spacing?: number;
    iconColor?: string;
    iconSize?: 'small' | 'medium' | 'large';
    actionButtonsPosition?: 'left' | 'right' | 'center';
  };
  
  /**
   * Pagination styles
   */
  pagination?: {
    buttonVariant?: 'text' | 'outlined' | 'contained';
    buttonSize?: 'small' | 'medium' | 'large';
    backgroundColor?: string;
    borderColor?: string;
    height?: string | number;
    padding?: string | number;
    spacing?: number;
    iconColor?: string;
    iconSize?: 'small' | 'medium' | 'large';
    textColor?: string;
    selectedTextColor?: string;
    position?: 'left' | 'right' | 'center';
  };

  /**
   * Filter styles
   */
  filter?: {
    backgroundColor?: string;
    borderColor?: string;
    inputVariant?: 'outlined' | 'filled' | 'standard';
    inputSize?: 'small' | 'medium';
    iconColor?: string;
    iconSize?: 'small' | 'medium' | 'large';
    chipBackgroundColor?: string;
    chipTextColor?: string;
    chipBorderColor?: string;
    chipSpacing?: number;
  };

  /**
   * Loading overlay styles
   */
  loadingOverlay?: {
    backgroundColor?: string;
    opacity?: number;
    spinnerColor?: string;
    spinnerSize?: number;
    spinnerVariant?: 'indeterminate' | 'determinate';
    spinnerThickness?: number;
    messageColor?: string;
    messageFontSize?: string | number;
  };

  /**
   * Detail panel styles
   */
  detailPanel?: {
    backgroundColor?: string;
    borderColor?: string;
    padding?: string | number;
    margin?: string | number;
    boxShadow?: string;
    borderRadius?: string | number;
    transitionDuration?: number;
  };

  /**
   * Column resizer styles
   */
  columnResizer?: {
    color?: string;
    hoverColor?: string;
    width?: number;
    hoverWidth?: number;
    activeColor?: string;
    activeWidth?: number;
  };

  /**
   * Selection styles
   */
  selection?: {
    checkboxColor?: string;
    checkboxSize?: 'small' | 'medium';
    selectedRowBackgroundColor?: string;
    selectedRowTextColor?: string;
    selectedRowBorderColor?: string;
  };

  /**
   * Global style overrides
   */
  global?: {
    borderRadius?: string | number;
    boxShadow?: string;
    fontFamily?: string;
    transition?: string;
    animation?: string;
    zIndex?: number;
    spacing?: number | ((factor: number) => number | string);
  };
}

/**
 * Extended Material-UI Theme with SmartTable specific overrides
 */
export interface SmartTableTheme extends Theme {
  smartTable?: SmartTableThemeOverrides;
} 