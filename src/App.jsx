import {Routes, Route, Navigate} from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import {useUser} from "./context/UserContext";

import LoginPage from "./pages/LoginPage";
import DashboardPage  from "./pages/DashboardPage";

function App() {
    const { user } =useUser()

    return (
        <>
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
            <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
         </Routes> 
        </>
    )
}

export default App;