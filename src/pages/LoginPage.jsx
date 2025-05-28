import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"

function LoginPage(){
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
const [role, setRole] = useState("user")
const {login} = useUser()
const navigate = useNavigate()

const  handleSubmit =  (e) => {
    e.preventDefault()
    login(username, role)
    navigate("/dashboard")
}


return (
    <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        />
        <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
        </select>
        <button type="submit">Login</button>
    </form>
)
}

export default LoginPage;