// import { fetchValidImageUrl } from '../utils/fetchValidImageURL';
// import { SaOwnercompany, SaSessionOgCompany } from '../validators/yup_ownercompany';
// import { getCompanyDetails } from '../utils/getCompanyDetails';
// import { generalSettingsCache, sessionOgCompanyCache } from '../utils/localCacheAPI';
// import { PdfHeader } from '../types/PdfMake';

// Types for the header
interface PdfHeader {
  table: {
    widths: string[] | number[];
    body: any[][];
    headerRows?: number;
  };
  layout: string;
}

interface CompanyDetails {
  name: string;
  address: string;
  phoneNumber: string;
  website: string;
  gstNumber: string;
  logoImage?: string;
}

export const HeaderRegularPdfMake = async ({
  title
}: {
  title: string
}): Promise<{ header: PdfHeader[], images: { [key: string]: { url: string } } }> => {
  // Static company details
  const company: CompanyDetails = {
    name: "Sample Company Name",
    address: "123 Business Street, City, State, ZIP",
    phoneNumber: "+1 234-567-8900",
    website: "www.samplecompany.com",
    gstNumber: "GST123456789",
    logoImage: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsmartagent.one%2F&psig=AOvVaw2LFxQmCuHfYwsNc7a_ctSL&ust=1744897392917000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCODbwLvX3IwDFQAAAAAdAAAAABAE" // Optional: Remove if not needed
  };

  let images: { [key: string]: { url: string } } = {};
  
  // Static logo validation - set to true if you want to show a logo
  const logoImageValid = false;
  
  if (logoImageValid) {
    images.logo = { url: company.logoImage || '' };
  }

  // Static god name
  const godName = '** !! Shree Ganeshay Namah !! **';

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
                { text: godName, alignment: 'center', margin: [50, 5, 0, 0], fontSize: 8, bold: true, color: 'red' },
                { text: company.name, alignment: 'left', margin: [0, 20, 0, 5], fontSize: 14, bold: true },
                { text: company.address, alignment: 'left', fontSize: 8 },
                { text: company.phoneNumber ? `Phone: ${company.phoneNumber}` : '', alignment: 'left', fontSize: 8 },
                { text: 'Website: ' + company.website, alignment: 'left', fontSize: 8 },
                { text: 'GSTIN: ' + company.gstNumber, alignment: 'left', fontSize: 8 }
              ]
            },
            {
              text: title,
              fontSize: 8,
              alignment: 'right',
              margin: [0, 5, 10, 0],
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