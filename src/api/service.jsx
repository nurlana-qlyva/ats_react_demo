import http from "./http";

export const LoginUserService = (data) => {
  return http.post("/Login", data);
};

// all vehicles
export const AraclarSearchService = (search, page) => {
  if (page) {
    return http.post(`/Vehicle/GetVehicles?parameter=${search}&page=${page}`);
  } else {
    return http.post(`/Vehicle/GetVehicles?parameter=${search}`);
  }
};

// filter vehicles
export const AraclarFilterService = (search, data) => {
  return http.post(`/Vehicle/GetVehicles?parameter=${search}`, data);
};

// kod yonetimi
export const CodeSelectService = (id) => {
  return http.get(`/Code/GetCodeTextById?codeNumber=${id}`);
};
export const CodeCustomSelectService = (url) => {
  return http.get(`/${url}`);
};
export const MaterialListSelectService = (type) => {
  return http.get(`/Material/GetMaterialListByType?type=${type}`);
};
