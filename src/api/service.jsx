import http from './http'

// login
export const LoginUserService = (data) => {
  return http.post("/Login", data)
};

// vehicles --> araclar
export const VehiclesReadForSearchService = async (search) => {
  return await http.post(`/Vehicle/GetVehicles?parameter=${search}`)
};

export const VehiclesReadForPageService = (search, page) => {
  return http.post(`/Vehicle/GetVehicles?parameter=${search}&page=${page}`)
};

export const VehiclesReadForFilterService = (search, data) => {
  return http.post(`/Vehicle/GetVehicles?parameter=${search}`, data);
};

// add vehicle 
export const NewVehicleAddService = (data) => {
  return http.post(`Vehicle/AddVehicle`, data)
};

// update vehicles
export const VehiclesUpdateReadService = (id) => {
  return http.get(`/Vehicle/GetVehicleById?id=${id}`)
};

export const VehiclesUpdateSetService = (data) => {
  return http.post(`/Vehicle/UpdateVehicle`, data)
};

// code control data --> kod yonetimi
export const CodeControlService = (id) => {
  return http.get(`/Code/GetCodeTextById?codeNumber=${id}`)
};

export const CustomCodeControlService = (url) => {
  return http.get(`/${url}`)
};
export const MaterialListSelectService = (type) => {
  return http.get(`/Material/GetMaterialListByType?type=${type}`)
};

// upload photo
export const PhotoUploadService = (id, group, data) => {
  return http.post(`/Photo/UploadPhoto?refId=${id}&refGroup=${group}`, data)
}

export const PhotoReadService = (id, group) => {
  return http.get(`/Photo/GetPhotosByRefGroup?refId=${id}&refGroup=${group}`)
}

export const PhotoDownloadService = (data) => {
  return http.post(`/Photo/DownloadPhotoById`, data, {
    responseType: 'blob'
  })
}

// upload file 
export const FileUploadService = (id, group, data) => {
  return http.post(`/Document/UploadDocument?refId=${id}&refGroup=${group}`, data)
}

export const FileReadService = (id, group) => {
  return http.get(`/Document/GetDocumentsByRefGroup?refId=${id}&refGroup=${group}`)
}

export const FileDownloadService = (data) => {
  return http.post(`/Document/DownloadDocumentById`, data, {
    responseType: 'blob'
  })
}

// custom inputs 
export const CustomInputsReadService = (form) => {
  return http.get(`/CustomField/GetCustomFields?form=${form}`)
}

export const CustomInputsUpdateService = (form, topic, field) => {
  return http.post(`/CustomField/AddCustomFieldTopic?form=${form}&topic=${topic}&field=${field}`,)
}

// personal fields --> ozel alanlar
export const PersonalFieldsReadService = (form) => {
  return http.get(`/CustomField/GetCustomFields?form=${form}`)
}
export const PersonalFieldsUpdateService = (form, topic, field) => {
  return http.post(`/CustomField/AddCustomFieldTopic?form=${form}&topic=${topic}&field=${field}`,)
}

// Ruhsat
export const DetailInfoGetService = (id) => {
  return http.get(`/VehicleDetail/GetVehicleDetailsInfo?vehicleId=${id}`)
}

export const DetailInfoUpdateService = (data) => {
  return http.post(`/VehicleDetail/UpdateVehicleDetailsInfo`, data)
}

// km 
export const KMGetService = async (page, data) => {
  return await http.post(`/QuickKmUpdate/GetKmUpdateList?page=${page}`, data)
}

export const KMValidateService = (data) => {
  return http.post(`/KmLog/ValidateKmLogForAdd`, data)
}

export const KMAddService = (data) => {
  return http.post(`/KmLog/AddKmLog`, data)
}

export const KMResetService = (data) => {
  return http.post(`/KmLog/ResetKmLog`, data)
}

export const KMEditService = (data) => {
  return http.post(`/KmLog/EditKmLog`, data)
}

// km history
export const KMLogListGetService = (page) => {
  return http.get(`/KmLog/GetKmLogList?page=${page}`)
}

export const KMLogListGetByIdService = (id, page) => {
  return http.get(`/KmLog/GetKmLogListByVehicleId?vehicleId=${id}&page=${page}`)
}

export const KMLogListDeleteService = (data) => {
  return http.post(`/KmLog/DeleteKmLog`, data)
}

export const KMLogListValidateService = (data) => {
  return http.post(`/KmLog/ValidateKmLogForUpdate`, data)
}

export const KMLogListUpdateService = (data) => {
  return http.post(`/KmLog/UpdateKmLog`, data)
}

// yakit
export const YakitGetService = (page) => {
  return http.get(`/Fuel/GetFuelList?page=${page}`)
}

// get list
export const YakitGetByIdService = async (data, page) => {
  return await http.post(`/Fuel/GetFuelListByVehicleId?page=${page}`, data)
}

// get data for one vehicle
export const YakitDataGetByIdService = async (id) => {
  return await http.get(`/Fuel/GetFuelCardContentById?vehicleId=${id}`)
}

export const YakitDataGetByDateService = async (data) => {
  return await http.post(`/Fuel/GetKmRangeBeforeDate`, data)
}

export const YakitAddService = (data) => {
  return http.post(`/Fuel/AddFuel`, data)
}

export const YakitHistoryGetService = (id, date, time) => {
  return http.get(`/Fuel/GetLastThreeFuelRecord?vehicleId=${id}&date=${date}&time=${time}`)
}

export const YakitTankGetService = (id, type) => {
  return http.get(`/WareHouse/GetWareHouseList?tip=${type}&id=${id}`)
}

export const YakitKmLogValidateService = async (data) => {
  return await http.post(`/Fuel/ValidateFuelInfoInsertion`, data)
}

export const YakitKmLogValidateForUpdateService = async (data) => {
  return await http.post(`/Fuel/ValidateFuelInfoUpdate`, data)
}

export const YakitPriceGetService = (id) => {
  return http.get(`/Material/GetMaterialPrice?materialId=${id}`)
}


export const YakitUpdateDataGetService = (id) => {
  return http.get(`/Fuel/GetFuelCardInfoByFuelId?id=${id}`)
}

export const YakitUpdateDataUpdateService = (data) => {
  return http.post(`/Fuel/UpdateFuel`, data)
}

export const YakitDataDeleteService = (id) => {
  return http.get(`/Fuel/DeleteFuelCard?fuelId=${id}`)
}

// Vehicle/GetUserId
// demo
export const DemoService = () => {
  return http.get(`/Vehicle/GetUserId`)
}

// malzeme
export const MalzemeListGetService = (page) => {
  return http.post(`/Material/GetMaterialList?page=${page}`)
}