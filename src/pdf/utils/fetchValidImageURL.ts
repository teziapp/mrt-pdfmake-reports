import { ImageDefinition } from 'pdfmake/interfaces';

export const checkImageValidGetDef = async (inputImageDef: ImageDefinition) => {
  try {
    const response = await fetch(inputImageDef.url, {
      headers: inputImageDef.headers || {},
      method: 'HEAD', // Use HEAD to validate without downloading the image
    });

    if (!response.ok) {
      throw new Error('Image URL is invalid');
    }

    const validUrl = inputImageDef.url;
    const imageValue = inputImageDef.headers
      ? { url: validUrl, headers: inputImageDef.headers }
      : validUrl;

    return {
      imageDef: inputImageDef,
      image: { headerLogo: imageValue }, // Use 'headerLogo' as the key for pdfmake
    };
  } catch (error) {
    console.error('Error validating image URL:', error);
    return {
      imageDef: {
        ...inputImageDef,
        text: '', // Fallback if URL is invalid
      } as ImageDefinition,
      image: {},
    };
  }
};