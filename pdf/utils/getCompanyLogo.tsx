import { fetchValidImageUrl } from './fetchValidImageURL';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';

export interface LogoOptions {
  width?: number;
  height?: number;
  alignment?: 'left' | 'center' | 'right';
  margin?: [number, number, number, number];
  opacity?: number;
  fit?: [number, number];
  preserveAspectRatio?: boolean;
  border?: boolean | [boolean, boolean, boolean, boolean];
  borderColor?: string;
  borderStyle?: string;
  borderWidth?: number;
}

interface LogoResult {
  text?: string;
  image?: string;
  width?: number;
  height?: number;
  alignment?: string;
  margin?: number[];
  opacity?: number;
  fit?: number[];
  preserveAspectRatio?: boolean;
  border?: boolean | boolean[];
  borderColor?: string;
  borderStyle?: string;
  borderWidth?: number;
  images?: { [key: string]: { url: string } };
}

interface DocDefinitionWithLogo extends Omit<TDocumentDefinitions, 'content' | 'images'> {
  content: any[];
  images?: TDocumentDefinitions['images'];
}

const defaultLogoOptions: LogoOptions = {
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [10, 20, 0, 0],
  preserveAspectRatio: true
};

export const getCompanyLogo = async (
  logoUrl?: string,
  options: LogoOptions = {}
): Promise<LogoResult> => {
  // Merge default options with provided options
  const finalOptions = { ...defaultLogoOptions, ...options };
  
  // If no logo URL is provided, return empty placeholder with dimensions
  if (!logoUrl) {
    return {
      text: '',
      ...finalOptions
    };
  }

  try {
    const validUrl = await fetchValidImageUrl(logoUrl);
    if (!validUrl) {
      return {
        text: '',
        ...finalOptions
      };
    }

    // Return both the logo configuration and images object for pdfMake
    return {
      image: 'logo',
      ...finalOptions,
      images: {
        logo: { url: validUrl }
      }
    };
  } catch (error) {
    console.error('Error processing logo:', error);
    return {
      text: '',
      ...finalOptions
    };
  }
};

export const getLogoForDocDefinition = async (
  docDefinition: TDocumentDefinitions,
  logoUrl?: string,
  options: LogoOptions = {}
): Promise<DocDefinitionWithLogo> => {
  const logoResult = await getCompanyLogo(logoUrl, options);
  
  return {
    ...docDefinition,
    content: [
      logoResult.image ? { ...logoResult, image: 'logo' } : { text: '', ...logoResult },
      ...(Array.isArray(docDefinition.content) ? docDefinition.content : [docDefinition.content])
    ],
    images: {
      ...(docDefinition.images || {}),
      ...(logoResult.images || {})
    }
  };
}; 