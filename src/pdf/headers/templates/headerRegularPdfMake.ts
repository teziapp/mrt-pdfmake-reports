import { HeaderSettings } from '../../types/PdfMake';
import { StyleDictionary, ImageDefinition } from 'pdfmake/interfaces';
import { checkImageValidGetDef } from '../../utils/fetchValidImageURL';

// Main function to assemble the header
export const getHeaderRegularDocDef = async ({
  headerContent,
  headerRightStrings,
}: HeaderSettings) => {
  // Get validated image if available
  const logoSection = headerContent.image
    ? await checkImageValidGetDef({
        url: headerContent.image.url,
        ...(headerContent.image.headers && { headers: headerContent.image.headers }),
      } as ImageDefinition)
    : undefined;

  const styles: StyleDictionary = {
    headerContent: {
      alignment: 'left',
      margin: [0, 0, 0, 5],
      fontSize: 10,
      bold: false,
    },
    headerImage: {
      alignment: 'center',
      margin: [10, 10, 0, 0],
    },
    headerRightStrings: {
      margin: [0, 0, 10, 10],
      alignment: 'right',
      fontSize: 10,
      bold: false,
    },
    headerTopSection: {
      alignment: 'center',
      color: 'green',
      fontSize: 8,
      bold: true,
      margin: [0, 2, 0, 10],
    },
  };

  // Set up images dictionary with the validated URL
  const images = logoSection?.image || {};

  const docDef = {
    images, // Use the image dictionary with headerLogo key
    content: [
      // Add top section above the table if it exists
      ...(headerContent.topSection ? [{ stack: headerContent.topSection }] : []),
      {
        table: {
          widths: ['20%', '40%', '40%'],
          body: [
            [
              ...(logoSection?.imageDef && images.headerLogo
                ? [
                    {
                      image: 'headerLogo', // Reference the image key
                      fit: [100, 100],
                      style: 'headerImage',
                    },
                  ]
                : [{ text: '' }]),
              headerContent.content ? { stack: headerContent.content } : { text: '' },
              headerRightStrings ? { stack: headerRightStrings } : { text: '' },
            ],
          ],
        },
        layout: 'noBorders',
      },
      {
        table: {
          headerRows: 1,
          widths: ['*'],
          body: [[''], ['']],
        },
        layout: 'headerLineOnly',
      },
    ],
    styles,
  };

  return docDef;
};