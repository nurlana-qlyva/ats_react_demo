import http from "../../http";

export const GetFuelMaterialListService = async (search, page, data) => {
    return await http.post(`/Material/GetFuelMaterialList?page=${page}&parameter=${search}`, data);
};

export const AddMaterialService = async (data) => {
    return await http.post(`/Material/AddMaterial`, data);
};

export const GetMaterialCardByIdService = async (id) => {
    return await http.get(`/Material/GetFuelMaterialCardById?id=${id}`);
};

export const UpdateMaterialCardService = async (data) => {
    return await http.post(`/Material/UpdateMaterialCard`, data);
};