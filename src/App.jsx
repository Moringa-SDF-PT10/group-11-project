import React from "react";
import {  Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { useUser } from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import "./App.css";

// Pages imports
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import InventoryPage from "./pages/InventoryPage";
import AddItemPage from "./pages/AddItemsPage";
import EditItemPage from "./pages/EditItemPage";
import ShipmentsPage from "./pages/ShipmentsPage";
import SuppliersPage from "./pages/SuppliersPage";



function App() {
  const { user } = useUser();

  return (
    <BrowserRouter>
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
          path="/shipments"
          element={
            <ProtectedRoute>
              <ShipmentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/suppliers"
          element={
            <ProtectedRoute>
              <SuppliersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            user ? (
              <Navigate to="/dashboard" />
            ) : (
              <div className="p-6 text-center text-red-500 text-xl">404 Page Not Found</div>
            )
          }
        />
      </Routes>
   </BrowserRouter>
  );
}

export default App;
