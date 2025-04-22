import { ContentImage } from 'pdfmake/interfaces';
import { checkImageValidGetDef } from '../utils/fetchValidImageURL';

export const headerImageSection = (
  inputImageDef: ContentImage,
  imageUrl: string,
  customStyle?: ContentImage
) => {
  return checkImageValidGetDef(
    {
      ...inputImageDef,
      style: customStyle
    }, 
    imageUrl
  );
}