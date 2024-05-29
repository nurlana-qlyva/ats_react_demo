import { createContext, useState } from 'react'

export const PlakaContext = createContext()

export const PlakaProvider = ({ children }) => {
    const [plaka, setPlaka] = useState([])
    const [data, setData] = useState([])

    return (
        <PlakaContext.Provider value={{ plaka, setPlaka, data, setData }}>
            {children}
        </PlakaContext.Provider>
    );
}