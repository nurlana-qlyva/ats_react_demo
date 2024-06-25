import http from "../http";

export const MalzemeListGetService = async (page) => {
  return await http.post(`/Material/GetMaterialList?page=${page}`);
};

export const MalzemeListSearchService = async (page, parameter) => {
  return await http.post(
    `/Material/GetMaterialList?page=${page}&parameter=${parameter}`
  );
};

export const MalzemeAddService = async (data) => {
  return await http.post(`/Material/AddMaterial`, data);
};

export const MalzemeUpdateService = async (data) => {
  return await http.post(`/Material/UpdateMaterialCard`, data);
};

export const MalzemeDepoListGetService = async () => {
  return await http.get(`/WareHouse/GetWareHouseListByTip?tip=MALZEME`);
};

export const MalzemeCodeGetService = async () => {
  return await http.get(`/Numbering/GetModuleCodeByCode?code=MALZEME_KOD`);
};

export const MalzemeDataByIdGetService = async (id) => {
  return await http.get(`/Material/GetMaterialCardById?id=${id}`);
};
