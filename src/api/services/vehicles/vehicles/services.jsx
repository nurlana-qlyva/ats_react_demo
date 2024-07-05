import http from "../../../http";

export const GetVehiclesListService = async (search, page, data) => {
    return await http.post(`/Vehicle/GetVehicles?parameter=${search}&page=${page}`, data);
};

export const VehiclesReadForFilterService = async (search, data) => {
    return await http.post(`/Vehicle/GetVehicles?parameter=${search}`, data);
};

export const AddVehicleService = async (data) => {
    return await http.post(`Vehicle/AddVehicle`, data);
};

export const GetVehicleByIdService = async (id) => {
    return await http.get(`/Vehicle/GetVehicleById?id=${id}`);
};

export const UpdateVehicleService = async (data) => {
    return await http.post(`/Vehicle/UpdateVehicle`, data);
};

export const GetVehicleDetailsInfo = async (id) => {
    return await http.get(`/VehicleDetail/GetVehicleDetailsInfo?vehicleId=${id}`);
};

export const UpdateVehicleDetailsInfoService = async (data) => {
    return await http.post(`/VehicleDetail/UpdateVehicleDetailsInfo`, data);
};

export const UpdateKmLogService = async (data) => {
    return await http.post(`/KmLog/UpdateKmLog`, data);
};
