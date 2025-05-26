import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SuppliersPage from './pages/SuppliersPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/suppliers" element={<SuppliersPage />} />
      </Routes>
    </Router>
  );
};

export default App;
