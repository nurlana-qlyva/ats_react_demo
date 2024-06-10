import { createContext, useState } from 'react'

export const PlakaContext = createContext()

export const PlakaProvider = ({ children }) => {
    const [plaka, setPlaka] = useState([])
    const [data, setData] = useState([])
    const [history, setHistory] = useState(false)

    return (
        <PlakaContext.Provider value={{ plaka, setPlaka, data, setData, setHistory, history }}>
            {children}
        </PlakaContext.Provider>
    );
}