import { ContentImage, Style } from 'pdfmake/interfaces';
import { checkImageValidGetDef } from '../utils/fetchValidImageURL';

export const headerImageSection = (
  inputImageDef: ContentImage,
  imageUrl: string,
  style?: Style
) => {
  const defaultStyle: Style = {
    alignment: 'center',
    margin: [10, 20, 0, 0],
  };
  return checkImageValidGetDef(
    {
      ...inputImageDef,
      style: style || defaultStyle,
    }, 
    imageUrl
  );
}