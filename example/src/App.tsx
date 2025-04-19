import { useState } from 'react';
import { openPdf } from '../../pdf/generatePdf';
import { getPdfMakeDocDefinition } from '../../pdf/getPdfMakeDocDefinition';
import type { CompanyDetails, HeaderSettings } from '../../pdf/types/PdfMake';
import './App.css';
import { defaultCompanyDetails, defaultPdfSettings, sampleContent } from './data/pdfContent';

function App() {
  const [companyName, setCompanyName] = useState(defaultCompanyDetails.name);
  const [godName, setGodName] = useState(defaultCompanyDetails.godName);
  const [showHeader, setShowHeader] = useState(defaultPdfSettings.showHeader);
  const [headerOnEveryPage, setHeaderOnEveryPage] = useState(defaultPdfSettings.headerOnEveryPage);
  const [showLogo, setShowLogo] = useState(defaultPdfSettings.showLogo);

    // Company details with godName included
  const companyDetails: CompanyDetails = {
    ...defaultCompanyDetails,
    name: companyName,
    godName: godName,
  };

  // PDF generation options using HeaderSettings
  const headerSettings: HeaderSettings = {
    template: defaultPdfSettings.template,
    companyDetails,
    headerOnEveryPage,
    headerRightStrings: defaultPdfSettings.headerRightStrings,
  };

  const handleGeneratePDF = async () => {

    // Generate the PDF
    const docDefinition = await getPdfMakeDocDefinition(
      { content: sampleContent }, 
      headerSettings
    );
    console.log(docDefinition);

    return openPdf(docDefinition);
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
