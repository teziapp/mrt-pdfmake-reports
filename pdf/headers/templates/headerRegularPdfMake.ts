import { HeaderSettings } from '../../types/PdfMake';
import { getCompanyDetailsSectionRegular } from '../../components/companyDetailsSection';
import { headerRightStringsRegular } from '../../components/headerRightStrings';
import { getLogoImageSection } from '../../components/logoSection';

// Main function to assemble the header
export const getHeaderRegularDocDef = async ({
  companyDetails,
  headerRightStrings
}: HeaderSettings) => {
  // Get individual sections
  const logoSection = companyDetails.logoImage 
    ? await getLogoImageSection(
        {
          image: 'logo',
        },
        companyDetails.logoImage
      )
    : undefined;

  const companySection = getCompanyDetailsSectionRegular(companyDetails);
  const headerRightSection = headerRightStrings ? headerRightStringsRegular(headerRightStrings) : undefined;

  return {
    image: logoSection?.image,
    header: [
      {
        table: {
          widths: ['20%', '40%', '40%'],
          body: [[
            ...(logoSection?.imageDef ? [logoSection.imageDef] : []),
            companySection,
            ...(headerRightSection ? [headerRightSection] : [])
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