import http from "./http";

export const LoginUserService = (data) => {
  return http.post("/Login", data);
};

// all vehicles get
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

// Arac add 
export const AracAddService = (data) => {
  return http.post(`Vehicle/AddVehicle`, data);
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

// image upload

export const PhotoUploadService = (id, group, data) => {
  return http.post(`/Photo/UploadPhoto?refId=${id}&refGroup=${group}`, data)
}

// file upload
export const FileUploadService = (id, group, data) => {
  return http.post(`/Document/UploadDocument?refId=${id}&refGroup=${group}`, data)
}

// ozel alan
export const OzelAlanReadService = (form) => {
  return http.get(`/CustomField/GetCustomFields?form=${form}`)
}
export const OzelAlanUpdateService = (form, topic, field) => {
  return http.post(`/CustomField/AddCustomFieldTopic?form=${form}&topic=${topic}&field=${field}`,)
}