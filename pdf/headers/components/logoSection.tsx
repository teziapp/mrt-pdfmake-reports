import { CompanyDetails } from '../../types/PdfMake';
import { getCompanyLogo, LogoOptions } from '../../utils/getCompanyLogo';

// Function to get the logo section of the header
export const getLogoSection = async (company: CompanyDetails, showLogo: boolean, logoOptions: LogoOptions) => {
  // Process logo using the utility
  const logoResult = showLogo && company.logoImage 
    ? await getCompanyLogo(company.logoImage, logoOptions)
    : await getCompanyLogo(undefined, logoOptions);
  return logoResult.image ? logoResult : { text: '', ...logoResult };
}; 