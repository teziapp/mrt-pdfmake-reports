import { ContentImage } from 'pdfmake/interfaces';
import { checkImageValidGetDef } from '../utils/fetchValidImageURL';

interface ImageHeaders {
  [key: string]: string;
}

export const headerImageSection = (
  inputImageDef: ContentImage,
  imageUrl: string,
  headers?: ImageHeaders
) => {
  return checkImageValidGetDef(
    {
      ...inputImageDef,
    }, 
    imageUrl,
    headers
  );
}