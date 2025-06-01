import {Routes, Route, Navigate} from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import {useUser} from "./context/UserContext";
import "./App.css"

// Pages imports
import LoginPage from "./pages/LoginPage";
import DashboardPage  from "./pages/DashboardPage";
import InventoryPage from "./pages/InventoryPage"
import AddItemPage  from "./pages/AddItemPage";
import EditItemPage  from "./pages/EditItemPage";
import ShipmentsPage  from "./pages/ShipmentsPage";
import SuppliersPage  from "./pages/SuppliersPage";

function App() {
    const { user } =useUser()

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
            path="/inventory"
            element={
                <ProtectedRoute>
                    <InventoryPage />
                </ProtectedRoute>
            }
            /> 
             <Route
            path="/additem"
            element={
                <ProtectedRoute>
                    <AddItemPage />
                </ProtectedRoute>
            }
            /> 
             <Route
            path="/edititem"
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
            {<Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />}
         </Routes> 
         </div>
        </>
    )
}

export default App;