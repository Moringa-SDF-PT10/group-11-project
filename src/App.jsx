import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import {useUser} from "./context/UserContext";
import "./App.css"
import ShipmentUI from "./components/shipmentUI";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";


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
}

export default App;
