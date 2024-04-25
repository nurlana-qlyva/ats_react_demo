import React, { createContext, useState, ReactNode } from "react";
import { AracData } from "../../../../../types";


interface VehicleContextType {
    data: AracData | null;
    setData: React.Dispatch<React.SetStateAction<AracData | null>>;
}

export const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

const VehicleContextProvider = ({ children }: { children: ReactNode }) => {
    const [vehicles, setVehicles] = useState([]);
    const [vehiclesCount, setVehiclesCount] = useState<number>(0);
    const [search, setSearch] = useState("")
    // pagination
    const [first, setFirst] = useState<number[]>([0, 0, 0]);
    const [rows, setRows] = useState([10, 10, 10]);
    const [currentPage, setCurrentPage] = useState<number>(1);


    return (
        <VehicleContext.Provider value={{vehicles, setVehicles,vehiclesCount,setVehiclesCount, search, setSearch}}>
            {children}
        </VehicleContext.Provider>
    );
};

export default VehicleContextProvider;
