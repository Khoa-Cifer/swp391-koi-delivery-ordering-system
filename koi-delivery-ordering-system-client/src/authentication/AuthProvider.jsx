import { createContext, useContext, useState } from "react";

export const AuthContext = createContext({
    user: null,
    handleLogin: (userData) => { },
    handleLogout: () => { }
})

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const handleLogin = (userData) => {
        setUser(userData);
        localStorage.setItem("userData", JSON.stringify(userData));
    }

    const handleLogout = () => {
        localStorage.removeItem("userData");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => {
	return useContext(AuthContext)
}
