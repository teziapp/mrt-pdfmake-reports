// Define types for the godName section style
interface GodNameStyle {
  fontSize?: number;
  bold?: boolean;
  color?: string;
  margin?: [number, number, number, number];
}

// Default style for godName
const defaultStyle: GodNameStyle = {
  fontSize: 8,
  bold: true,
  color: 'red',
  margin: [0, 2, 0, 10]
};

// Function to get the godName section
export const getGodNameSection = (godName: string = '', customStyle: Partial<GodNameStyle> = {}) => {
  // If no godName is provided, return undefined
  if (!godName) return undefined;
  
  // Merge default style with custom style
  const style = { ...defaultStyle, ...customStyle };
  
  return {
    text: godName,
    alignment: 'center',
    ...style
  };
}; 