import { useState } from 'react';
import './App.css';
import { generatePDF } from '../../pdf/pdfmaketemplate';
import type { CompanyDetails, HeaderSettings } from '../../pdf/types/PdfMake';

function App() {
  const [companyName, setCompanyName] = useState('Sample Company Name');
  const [godName, setGodName] = useState('** !! Shree Ganeshay Namah !! **');
  const [showHeader, setShowHeader] = useState(true);
  const [headerOnEveryPage, setHeaderOnEveryPage] = useState(true);
  const [showLogo, setShowLogo] = useState(false);

  const handleGeneratePDF = async () => {
    // Company details with godName included
    const companyDetails: CompanyDetails = {
      name: companyName,
      address: '123 Business Street, City, State, ZIP',
      phoneNumber: '+1 234-567-8900',
      website: 'www.samplecompany.com',
      gstNumber: 'GST123456789',
      logoImage:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRQOq_KQn9qYIzTMHclBSe1zQcH3CMxPVBUw&s', // Example logo URL
      godName: godName,
    };

    // PDF generation options using HeaderSettings
    const headerSettings: HeaderSettings = {
      template: 'regular',
      title: 'Sample PDF Report',
      showHeader,
      companyDetails,
      showLogo,
      headerOnEveryPage,
      content: [
        { text: 'Sample Report Content', style: 'header' },
        {
          text: 'This is a dynamically generated PDF with custom header settings.',
          margin: [0, 20, 0, 20],
        },
        {
          text: 'This is a dynamically generated PDF with custom header settings.',
          margin: [0, 20, 0, 20],
        },
        {
          text: 'This is a dynamically generated PDF with custom header settings.',
          margin: [0, 20, 0, 20],
        },
        {
          text: 'This is a dynamically generated PDF with custom header settings.',
          margin: [0, 20, 0, 20],
        },
        {
          text: 'This is a dynamically generated PDF with custom header settings.',
          margin: [0, 20, 0, 20],
        },
        {
          text: 'This is a dynamically generated PDF with custom header settings.',
          margin: [0, 20, 0, 20],
        },
        {
          text: 'This is a dynamically generated PDF with custom header settings.',
          margin: [0, 20, 0, 20],
        },
        {
          text: 'This is a dynamically generated PDF with custom header settings.',
          margin: [0, 20, 0, 20],
        },
        {
          text: 'This is a dynamically generated PDF with custom header settings.',
          margin: [0, 20, 0, 20],
        },
        {
          text: 'This is a dynamically generated PDF with custom header settings.',
          margin: [0, 20, 0, 20],
        },
        {
          text: 'This is a dynamically generated PDF with custom header settings.',
          margin: [0, 20, 0, 20],
        },
        {
          text: 'This is a dynamically generated PDF with custom header settings.',
          margin: [0, 20, 0, 20],
        },
        {
          text: 'This is a dynamically generated PDF with custom header settings.',
          margin: [0, 20, 0, 20],
        },
        {
          text: 'This is a dynamically generated PDF with custom header settings.',
          margin: [0, 20, 0, 20],
        },
        {
          text: 'This is a dynamically generated PDF with custom header settings.',
          margin: [0, 20, 0, 20],
        },
        {
          text: 'This is a dynamically generated PDF with custom header settings.',
          margin: [0, 20, 0, 20],
        },
        {
          text: 'This is a dynamically generated PDF with custom header settings.',
          margin: [0, 20, 0, 20],
        },
      ],
    };

    // Generate the PDF
    await generatePDF(headerSettings);
  };

  return (
    <>
      <h1>PDF Generator</h1>

      <div style={{ margin: '20px 0' }}>
        <label>
          Company Name:
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>

      <div style={{ margin: '20px 0' }}>
        <label>
          God Name:
          <input
            type="text"
            value={godName}
            onChange={(e) => setGodName(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>

      <div style={{ margin: '10px 0' }}>
        <label>
          <input
            type="checkbox"
            checked={showHeader}
            onChange={(e) => setShowHeader(e.target.checked)}
          />
          Show Header
        </label>
      </div>

      <div style={{ margin: '10px 0' }}>
        <label>
          <input
            type="checkbox"
            checked={headerOnEveryPage}
            onChange={(e) => setHeaderOnEveryPage(e.target.checked)}
          />
          Header on Every Page
        </label>
      </div>

      <div style={{ margin: '10px 0' }}>
        <label>
          <input
            type="checkbox"
            checked={showLogo}
            onChange={(e) => setShowLogo(e.target.checked)}
          />
          Show Logo
        </label>
      </div>

      <button
        type="button"
        onClick={handleGeneratePDF}
        style={{
          padding: '10px 20px',
          marginTop: '20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Generate PDF
      </button>
    </>
  );
}

export default App;
