import { createContext, useState } from "react";

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isWish, setIsWish] = useState({})
    const [inputVal, setInputVal] = useState("")
    const [products, setProducts] = useState([])

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isWish, setIsWish, inputVal, setInputVal, products, setProducts }}>
            {children}
        </AuthContext.Provider>
    )
}






