import http from "./http";

export const LoginUserService = (data) => {
  return http.post("/Login", data);
};

export const AraclarSearchService = (search, page) => {
  if (page) {
    return http.post(`/Vehicle/GetVehicles?parameter=${search}&page=${page}`);
  }else {
    return http.post(`/Vehicle/GetVehicles?parameter=${search}`);
  }
  
};

export const AraclarFilterService = (search, data) => {
  return http.post(`/Vehicle/GetVehicles?parameter=${search}`, data);
};

export const CodeSelectService = (id) => {
  return http.get(`/Code/GetCodeTextById?codeNumber=${id}`);
};

export const CodeCustomSelectService = (url) => {
  return http.get(`/${url}`);
};
