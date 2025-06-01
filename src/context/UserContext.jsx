import { createContext, useContext, useState } from "react";

const UserContext = createContext()

 function UserProvider({children}) {
    const [user, setUser] = useState(null)

    const login = (username, role) => setUser({username, role})
    const logout = () => setUser(null)

    return(
        <UserContext.Provider value={{user, login, logout}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
  return useContext(UserContext);
}

export default UserProvider;