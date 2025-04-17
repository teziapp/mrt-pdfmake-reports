import { fetchValidImageUrl } from '../utils/fetchValidImageURL';
import { CompanyDetails, PdfHeader } from '../types/PdfMake';

export const HeaderRegularPdfMake = async ({
  title,
  companyDetails,
  showLogo = true
}: {
  title: string;
  companyDetails: CompanyDetails;
  showLogo?: boolean;
}): Promise<{ header: PdfHeader[], images: { [key: string]: { url: string } } }> => {
  const company: CompanyDetails = companyDetails

  let images: { [key: string]: { url: string } } = {};
  
  // Check if logo should be shown and validate the URL
  let logoImageValid = false;
  
  if (showLogo && company.logoImage) {
    try {
      const validUrl = await fetchValidImageUrl(company.logoImage);
      if (validUrl) {
        images.logo = { url: validUrl };
        logoImageValid = true;
      }
    } catch (error) {
      console.error('Error validating logo URL:', error);
    }
  }

  // Use provided god name or fall back to default
  const godName = company.godName || '';

  // Static data for right side of header (can be made dynamic later)
  const currentDate = '17-04-2025';
  const totalAmount = '291';
  const outstandingAmount = '8,56,85,735.29';

  return {
    images,
    header: [
      {
        table: {
          widths: ['20%', '40%', '40%'],
          body: [[
            logoImageValid ? { 
              image: 'logo', 
              width: 100,
              height: 100,
              alignment: 'left',
              margin: [10, 20, 0, 0]
            } : { 
              text: '',
              width: 100,
              height: 100,
              alignment: 'left',
              margin: [10, 20, 0, 0]
            },
            {
              stack: [
                { text: godName, alignment: 'center', margin: [50, 5, 0, 0], fontSize: 10, bold: true, color: 'red' },
                { text: company.name, alignment: 'left', margin: [0, 20, 0, 5], fontSize: 14, bold: true },
                { text: company.address, alignment: 'left', fontSize: 8 },
                { text: company.phoneNumber ? `ph:${company.phoneNumber}` : '', alignment: 'left', fontSize: 8 },
                { text: 'Website: ' + company.website, alignment: 'left', fontSize: 8 },
                { text: 'GSTIN: ' + company.gstNumber, alignment: 'left', fontSize: 8 }
              ]
            },
            {
              stack: [
                // Spacer to push remaining content to bottom of header
                { text: title, alignment: 'right', fontSize: 10, margin: [0, 20, 5, 2] },
                { text: '', margin: [0, 60, 0, 0] },
                { text: `Total: ${totalAmount}`, alignment: 'right', fontSize: 8, margin: [0, 0, 5, 2] },
                { text: `As on: ${currentDate}`, alignment: 'right', fontSize: 8, margin: [0, 0, 5, 2] },
                { text: `Total Outstanding Amt.: ${outstandingAmount}`, alignment: 'right', fontSize: 8, margin: [0, 0, 5, 2] }
                ]
            }
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