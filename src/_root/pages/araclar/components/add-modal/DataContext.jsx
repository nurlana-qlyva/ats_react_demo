import { createContext, useState } from "react";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [isLoaded, setIsLoaded] = useState({
        iseLoad: false,
        selectId: ''
    });

    return (
        <DataContext.Provider value={{ data, setData, isLoaded, setIsLoaded }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContextProvider;
