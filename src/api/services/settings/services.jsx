import http from "../../http";

export const GetOwnerInfoService = async () => {
    return await http.get(`/Owner/GetOwnerInfo`);
};

export const UpdateOwnerInfoService = async (data) => {
    return await http.post(`/Owner/UpdateOwnerInfo`, data);
};