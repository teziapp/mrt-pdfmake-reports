import { HeaderSettings } from '../../types/PdfMake';
import { getheaderContent } from '../../components/headerContentSection';
import { headerRightStringsRegular } from '../../components/headerRightStrings';
import { headerImageSection } from '../../components/headerImageSection';
import { headerTopSection } from '../../components/headerTopSection';

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
    ? headerTopSection([{ text: headerContent.topSection }]) 
    : undefined;

  return {
    image: logoSection?.image,
    header: [
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
    ]
  };
};