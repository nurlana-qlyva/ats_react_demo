import { createContext, useState } from 'react'

export const SelectContext = createContext()

export const SelectProvider = ({ children }) => {
    const [townId, setTownId] = useState(0);
    const [varisSehirId, setVarisSehirID] = useState(0);

    return (
        <SelectContext.Provider value={{ townId, setTownId, setVarisSehirID, varisSehirId }}>
            {children}
        </SelectContext.Provider>
    );
}