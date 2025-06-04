import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";


function Navbar() {
    const {user, logout} = useUser()
    const navigate = useNavigate()

    function handleLogout() {
        logout();
        navigate("/login")
    }

    return (
        <nav>
            {user && (
            <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/inventory">Inventory</Link>
            <Link to="/add-item">Add Item</Link>
            <Link to="/edit-item/:id">Edit Item</Link>
            <Link to="/suppliers">Suppliers</Link>
            <Link to="shipments">Shipments</Link>
            {user.role === "admin" && <Link>Users</Link>}
            <span>
            {user.username} ({user.role}) <button onClick={handleLogout}>Logout</button>
            </span>
            </>
            )}
            {!user && <Link to="/login">Login</Link>}
        </nav>
    )
}

export default Navbar;