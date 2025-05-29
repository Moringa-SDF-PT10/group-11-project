import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InventoryPage from "./pages/InventoryPage";
import AddItemPage from "./pages/AddItemPage";
import EditItemPage from "./pages/EditItemPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/add-item" element={<AddItemPage />} />
        <Route path="/edit-item/:id" element={<EditItemPage />} />
        <Route
          path="*"
          element={<div className="p-6">404 Page Not Found</div>}
        />
      </Routes>
    </Router>
  );
}

export default App;
