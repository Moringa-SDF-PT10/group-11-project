import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
<<<<<<< HEAD
import {useUser} from "./context/UserContext";
import "./App.css"
import ShipmentUI from "./components/shipmentUI";
=======
import Navbar from "./components/Navbar";

// Pages imports
>>>>>>> main
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import InventoryPage from "./pages/InventoryPage";
import AddItemPage from "./pages/AddItemPage";
import EditItemPage from "./pages/EditItemPage";
import ShipmentsPage from "./pages/ShipmentsPage";
import SuppliersPage from "./pages/SuppliersPage";

import "./App.css";

function App() {
<<<<<<< HEAD
    const { user, loading } =useUser()

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }


    return (
        <>
        <div className="nav-bar">
         <Navbar />
         <Routes>
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
            <Route
            path="/dashboard"
            element={
                <ProtectedRoute>
                    <DashboardPage />
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
                    path="/dummylogic"
                    element={
                        <ProtectedRoute user={user}>
                            <WarehouseShipmentSystem />
                        </ProtectedRoute>
                    }
                />   


            {<Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />}
         </Routes> 
         </div>
        </>
    )
=======
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
    </Router>
  );
>>>>>>> main
}

export default App;
