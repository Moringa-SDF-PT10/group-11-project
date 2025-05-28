import { useUser } from "./context/UserContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({children, adminOnly = false}) {
    const { user } = useUser()
    if (!user) return  <Navigate to="/login" />
    if (adminOnly && user.role === "admin") return <Navigate to="/dashboard" />
    return children
}

export default ProtectedRoute;