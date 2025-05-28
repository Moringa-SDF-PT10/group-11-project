import {Routes, Route, Navigate} from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import {useUser} from "./context/UserContext";

import LoginPage from "./pages/LoginPage";
import DashBoardPage from "./pages/DashBoardPage";

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
                    <DashBoardPage />
                </ProtectedRoute>
            }
            />
         </Routes> 
        </>
    )
}