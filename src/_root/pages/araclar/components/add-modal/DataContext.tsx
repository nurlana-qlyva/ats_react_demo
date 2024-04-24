import React, { createContext, useState, ReactNode } from "react";
import { AracData } from "../../../../../types";


interface DataContextType {
    data: AracData | null;
    setData: React.Dispatch<React.SetStateAction<AracData | null>>;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

const DataContextProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<AracData | null>(null);
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
