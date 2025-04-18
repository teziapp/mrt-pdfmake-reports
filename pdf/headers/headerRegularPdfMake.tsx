import { CompanyDetails, PdfHeader } from '../types/PdfMake';
import { LogoOptions } from '../utils/getCompanyLogo';
import { HeaderData } from '../../example/src/data/pdfContent';
import { getLogoSection } from './components/logoSection';
import { getCompanyDetailsSection } from './components/companyDetailsSection';
import { getTitleSection } from './components/titleSection';

// Main function to assemble the header
export const HeaderRegularPdfMake = async ({
  title,
  companyDetails,
  showLogo = true,
  logoOptions = {},
  headerData = {}
}: {
  title: string;
  companyDetails: CompanyDetails;
  showLogo?: boolean;
  logoOptions?: LogoOptions;
  headerData?: HeaderData;
}): Promise<{ header: PdfHeader[], images: { [key: string]: { url: string } } }> => {
  const company: CompanyDetails = companyDetails;

  // Get individual sections
  const logoSection = await getLogoSection(company, showLogo, logoOptions);
  const companySection = getCompanyDetailsSection(company);
  const titleSection = getTitleSection(title, headerData);

  return {
    images: logoSection.images || {},
    header: [
      {
        table: {
          widths: ['20%', '40%', '40%'],
          body: [[
            logoSection,
            companySection,
            titleSection
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