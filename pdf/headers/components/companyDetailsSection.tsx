import { CompanyDetails } from '../../types/PdfMake';

// Function to get the company details section of the header
export const getCompanyDetailsSection = (company: CompanyDetails) => {
  // Use provided god name or fall back to default
  const godName = company.godName || '';
  return {
    stack: [
      { text: godName, alignment: 'center', margin: [50, 5, 0, 5], fontSize: 10, bold: true, color: 'red' },
      { text: company.name, alignment: 'left', margin: [0, 20, 0, 5], fontSize: 14, bold: true },
      { text: company.address, alignment: 'left', fontSize: 10 },
      { text: company.phoneNumber ? `ph:${company.phoneNumber}` : '', alignment: 'left', margin: [0, 2, 0, 0], fontSize: 10 },
      { text: 'Website: ' + company.website, alignment: 'left', fontSize: 10 , margin: [0, 2, 0, 0],},
      { text: 'GSTIN: ' + company.gstNumber, alignment: 'left', fontSize: 10 , margin: [0, 2, 0, 0],}
    ]
  };
}; 