import {Routes, Route, Navigate} from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import {useUser} from "./context/UserContext";
import "./App.css"

import LoginPage from "./pages/LoginPage";
// import DashboardPage  from "./pages/DashboardPages";

function App() {
    const { user } =useUser()

    return (
        <>
        <div className="nav-bar">
         <Navbar />
         <Routes>
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
            {/* <Route
            path="/dashboard"
            element={
                <ProtectedRoute>
                    <DashboardPage />
                </ProtectedRoute>
            }
            />  */}
            {/* {<Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />} */}
         </Routes> 
         </div>
        </>
    )
}

export default App;