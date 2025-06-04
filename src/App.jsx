import React from "react";
import {  Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { useUser } from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css"
import ShipmentUI from "./components/shipmentUI";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import SuppliersPage from "./pages/SuppliersPage";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import InventoryPage from "./pages/InventoryPage";
import EditItemPage from "./pages/EditItemPage";
import AddItemPage from "./pages/AddItemsPage";


import "./App.css";

function App() {
    const { user, loading } =useUser()

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }


    
  return (
    <BrowserRouter>
    {user && <Navbar />}
      <Routes>
         <Route
           path="/"
           element={<Navigate to={user ? "/dashboard" : "/login"} />}
         />
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
                        <ProtectedRoute user={user}>
                            <ShipmentUI />
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
