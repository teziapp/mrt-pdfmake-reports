import { ContentImage } from 'pdfmake/interfaces';
import { checkImageValidGetDef } from '../utils/fetchValidImageURL';

export const headerImageSection = (
  inputImageDef: ContentImage,
  imageUrl: string,
  style?: ContentImage
) => {
  const defaultStyle: ContentImage = {
    alignment: 'center',
    margin: [10, 10, 0, 0],
    image: 'headerLogo',
    width: 50,
    height: 50
  };
  return checkImageValidGetDef(
    {
      ...inputImageDef,
      style: style || defaultStyle,
    }, 
    imageUrl
  );
}