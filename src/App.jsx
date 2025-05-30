import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SuppliersPage from './pages/SuppliersPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/suppliers" />} />
        <Route path="/suppliers" element={<SuppliersPage />} />
      </Routes>
    </Router>
  );
};

export default App;
