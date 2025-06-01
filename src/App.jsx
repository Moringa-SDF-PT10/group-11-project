dashboard-and-stats
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {useUser} from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";


import LoginPage from "./pages/LoginPage";
import DashboardPage  from "./pages/DashboardPages";
import InventoryPage from "./pages/InventoryPage";
import AddItemPage from "./pages/AddItemPage";
import EditItemPage from "./pages/EditItemPage";

import "./App.css"




function App() {
  const { user } = useUser();

  return (
    <Router>
      {user && <Navbar />}
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <LoginPage />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <InventoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-item"
          element={
            <ProtectedRoute>
              <AddItemPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-item/:id"
          element={
            <ProtectedRoute>
              <EditItemPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={<div className="p-6 text-center text-red-500 text-xl">404 Page Not Found</div>}
        />
      </Routes>
    </Router>
  );
}

export default App;

