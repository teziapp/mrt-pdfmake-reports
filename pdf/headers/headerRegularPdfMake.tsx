import { CompanyDetails, PdfHeader } from '../types/PdfMake';
import { getCompanyLogo, LogoOptions } from '../utils/getCompanyLogo';
import { HeaderData } from '../../example/src/data/pdfContent';

export const HeaderRegularPdfMake = async ({
  title,
  companyDetails,
  showLogo = true,
  logoOptions = {},
  headerData = {
    currentDate: new Date().toLocaleDateString('en-IN'),
    totalAmount: '0.00',
    outstandingAmount: '0.00'
  }
}: {
  title: string;
  companyDetails: CompanyDetails;
  showLogo?: boolean;
  logoOptions?: LogoOptions;
  headerData?: HeaderData;
}): Promise<{ header: PdfHeader[], images: { [key: string]: { url: string } } }> => {
  const company: CompanyDetails = companyDetails;

  // Process logo using the new utility
  const logoResult = showLogo && company.logoImage 
    ? await getCompanyLogo(company.logoImage, logoOptions)
    : await getCompanyLogo(undefined, logoOptions);

  // Use provided god name or fall back to default
  const godName = company.godName || '';

  return {
    images: logoResult.images || {},
    header: [
      {
        table: {
          widths: ['20%', '40%', '40%'],
          body: [[
            logoResult.image ? logoResult : { text: '', ...logoResult },
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
                { text: title, alignment: 'right', fontSize: 10, margin: [0, 20, 5, 2] },
                { text: '', margin: [0, 60, 0, 0] },
                { text: `Total: ${headerData.totalAmount}`, alignment: 'right', fontSize: 8, margin: [0, 0, 5, 2] },
                { text: `As on: ${headerData.currentDate}`, alignment: 'right', fontSize: 8, margin: [0, 0, 5, 2] },
                { text: `Total Outstanding Amt.: ${headerData.outstandingAmount}`, alignment: 'right', fontSize: 8, margin: [0, 0, 5, 2] }
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