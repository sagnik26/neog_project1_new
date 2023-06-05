import { createContext, useState } from "react";

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isWish, setIsWish] = useState({})

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isWish, setIsWish }}>
            {children}
        </AuthContext.Provider>
    )
}






