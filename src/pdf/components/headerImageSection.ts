import { ImageDefinition } from 'pdfmake/interfaces';
import { checkImageValidGetDef } from '../utils/fetchValidImageURL';

export const headerImageSection = (
  inputImageDef: ImageDefinition,
) => {
  return checkImageValidGetDef(
    inputImageDef 
  );
}