import http from "../../http";

export const GetMaterialListService = async (search, page, data) => {
  return await http.post(
    `/Material/GetMaterialList?page=${page}&parameter=${search}`,
    data
  );
};

export const GetWareHouseListByTipService = async (type) => {
  return await http.get(`/WareHouse/GetWareHouseListByTip?tip=${type}`);
};

export const AddMaterialService = async (data) => {
  return await http.post(`/Material/AddMaterial`, data);
};
