import { ContentImage } from 'pdfmake/interfaces';
import { checkImageValidGetDef } from '../utils/fetchValidImageURL';

export const getLogoImageSection = (
  inputImageDef: ContentImage,
  imageUrl: string
) => {
  return checkImageValidGetDef(
    {
      width: 100,
      height: 100,
      alignment: 'center',
      margin: [10, 20, 0, 0],
      // FIXME: This is a workaround to fix the issue with the image not being displayed
      // preserveAspectRatio: true,
      ...inputImageDef,
    }, 
    imageUrl
  );
}