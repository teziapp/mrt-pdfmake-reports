import { HeaderSettings } from '../../types/PdfMake';
import { getheaderContent } from '../../components/headerContentSection';
import { headerRightStringsRegular } from '../../components/headerRightStrings';
import { headerImageSection } from '../../components/headerImageSection';
import { headerTopSection } from '../../components/headerTopSection';
import { StyleDictionary } from 'pdfmake/interfaces';

// Main function to assemble the header
export const getHeaderRegularDocDef = async ({
  headerContent,
  headerRightStrings
}: HeaderSettings) => {
  // Get individual sections
  let logoSection;
  
  try {
    if (headerContent.image) {
      logoSection = await headerImageSection(
        {
          image: 'headerLogo',  // This key will be used in the images dictionary
          fit: [100, 100],  
        }, 
        headerContent.image
      );
    }
  } catch (error) {
    console.error('Error loading logo:', error);
    logoSection = undefined;
  }
  
  const headerContentSection = getheaderContent(headerContent.content);
  const headerRightSection = headerRightStrings ? headerRightStringsRegular(headerRightStrings) : undefined;
  
  // Get the top section if available
  const topSection = headerContent.topSection
    ? headerTopSection(headerContent.topSection) 
    : undefined;

  const styles: StyleDictionary = {
    headerContent: {
      alignment: 'left',
      margin: [0, 0, 0, 5],
      fontSize: 10,
      bold: false
    },
    headerImage: {
      alignment: 'center',
      margin: [10, 10, 0, 0]
    },
    headerRightStrings: {
      alignment: 'right',
      fontSize: 10,
      bold: false
    },
    headerTopSection: {
      alignment: 'center',
      color: 'green',
      fontSize: 8,
      bold: true,
      margin: [0, 2, 0, 10]
    }
  };

  const docDef = {
    image: logoSection?.image,
    content: [
      // Add top section above the table if it exists
      ...(topSection ? [topSection] : []),
      {
        table: {
          widths: ['20%', '40%', '40%'],
          body: [[
            ...(logoSection?.imageDef ? [logoSection.imageDef] : [{ text: '' }]),
            headerContentSection ? headerContentSection : { text: '' },
            headerRightSection 
              ? headerRightSection
              : { text: '' }
          ]]
        },
        layout: 'noBorders'
      },
      {
        table: {
          headerRows: 1,
          widths: ['*'],
          body: [
            [''],
            ['']
          ],
        },
        layout: 'headerLineOnly'
      }
    ],
    styles
  };

  return docDef;
};