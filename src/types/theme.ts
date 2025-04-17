import { Theme, ThemeOptions } from '@mui/material/styles';

export interface SmartTableThemeOverrides {
  /**
   * Table header styles
   */
  header?: {
    backgroundColor?: string;
    color?: string;
    fontSize?: string | number;
    fontWeight?: string | number;
  };
  
  /**
   * Table row styles
   */
  row?: {
    backgroundColor?: string;
    hoverBackgroundColor?: string;
    selectedBackgroundColor?: string;
    borderColor?: string;
  };
  
  /**
   * Table cell styles
   */
  cell?: {
    padding?: string | number;
    fontSize?: string | number;
    borderColor?: string;
  };
  
  /**
   * Toolbar styles
   */
  toolbar?: {
    backgroundColor?: string;
    borderColor?: string;
    buttonVariant?: 'text' | 'outlined' | 'contained';
  };
  
  /**
   * Pagination styles
   */
  pagination?: {
    buttonVariant?: 'text' | 'outlined' | 'contained';
    buttonSize?: 'small' | 'medium' | 'large';
  };
}

export interface SmartTableTheme extends Theme {
  smartTable?: SmartTableThemeOverrides;
}

export interface SmartTableThemeOptions extends ThemeOptions {
  smartTable?: SmartTableThemeOverrides;
} 