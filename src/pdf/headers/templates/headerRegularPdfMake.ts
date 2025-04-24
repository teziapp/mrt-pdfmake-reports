import { HeaderSettings } from '../../types/PdfMake';
import { getheaderContent } from '../../components/headerContentSection';
import { headerRightStringsRegular } from '../../components/headerRightStrings';
import { headerImageSection } from '../../components/headerImageSection';
import { headerTopSection } from '../../components/headerTopSection';
import { StyleDictionary, ImageDefinition } from 'pdfmake/interfaces';

// Main function to assemble the header
export const getHeaderRegularDocDef = async ({
  headerContent,
  headerRightStrings,
}: HeaderSettings) => {
  // Get individual sections
  const logoSection = headerContent.image
    ? await headerImageSection({
        url: headerContent.image.url,
        ...(headerContent.image.headers && { headers: headerContent.image.headers }),
      } as ImageDefinition)
    : undefined;

  const headerContentSection = getheaderContent(headerContent.content);
  const headerRightSection = headerRightStrings
    ? headerRightStringsRegular(headerRightStrings)
    : undefined;

  // Get the top section if available
  const topSection = headerContent.topSection
    ? headerTopSection(headerContent.topSection)
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
      ...(topSection ? [topSection] : []),
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
              headerContentSection ? headerContentSection : { text: '' },
              headerRightSection ? headerRightSection : { text: '' },
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