import { createContext, useContext } from "react";

export const AuthContext = createContext({
    handleLogin: (token) => { },
    handleLogout: () => { }
})

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) { 
    const handleLogin = (token) => {
        localStorage.setItem("token", token);
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider value={{ handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => {
	return useContext(AuthContext)
}
