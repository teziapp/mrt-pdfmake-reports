import './App.css'
import { generatePDF } from '../../pdf/pdfmaketemplate'

function App() {
 
  return (
    <>
      <h1>Hello World</h1>
      <button onClick={generatePDF}>Generate Pdf</button>
    </>
  )
}

export default App
