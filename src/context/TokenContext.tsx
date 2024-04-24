import { createContext, useEffect, useState } from "react";

interface TokenContextType {
    token: string
}


export const TokenContext = createContext<TokenContextType | string>('')

export const TokenProvider: React.FC = ({ children }) => {
    const [token, setToken] = useState('')


    return (
        <TokenContext.Provider value={{token, setToken}}>
            {children}
        </TokenContext.Provider>
    )
}