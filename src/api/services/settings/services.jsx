import http from "../../http";

export const GetSettingByTypeService = async (type) => {
  return await http.get(`/CommonSettings/GetSettingByType?type=${type}`);
};

export const UpdateSettingByTypeService = async (type, data) => {
  return await http.post(
    `/CommonSettings/UpdateSettingByType?type=${type}`,
    data
  );
};
