import http from "../http";

export const GetFirmaCodeService = async () => {
    return await http.get(`/Numbering/GetModuleCodeByCode?code=FIRMA_KOD `);
};

export const GetFirmaListService = async (page) => {
    return await http.get(`/Company/GetCompaniesList?page=${page}`);
};

export const SearchFirmaListService = async (page, parameter) => {
    return await http.get(`/Company/GetCompaniesList?page=${page}&parameter=${parameter}`);
};

export const DeleteFirmaService = async (id) => {
    return await http.get(`/Company/DeleteCompanyItem?id=${id}`);
};

export const AddFirmaService = async (data) => {
    return await http.post(`/Company/AddCompanyItem`, data);
};

export const UpdateFirmaService = async (data) => {
    return await http.post(`/Company/UpdateCompanyItem`, data);
};

export const GetFirmaByIdService = async (id) => {
    return await http.get(`/Company/GetCompanyById?id=${id}`);
};