import { HeaderSettings } from "../types/PdfMake";
import { getHeaderRegularDocDef } from "./templates/headerRegularPdfMake";

export const headerTemplates = {
  regular: getHeaderRegularDocDef
}

export const getHeaderDefinition = (headerSettings: HeaderSettings) => {
  const { template } = headerSettings;
  return headerTemplates[template](headerSettings);
}