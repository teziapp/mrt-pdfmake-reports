import { Routes, Route } from 'react-router-dom';
import DataTable from './pages/DataTable';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DataTable />} />
      </Routes>
    </div>
  );
}

export default App; 