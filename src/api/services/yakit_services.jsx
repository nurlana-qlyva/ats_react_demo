import http from "../http";
const YakitGetService = async (page) => {
  return await http.get(`/Fuel/GetFuelList?page=${page}`);
};

const YakitListSearchService = async (page, parameter) => {
  return await http.get(
    `/Fuel/GetFuelList?page=${page}&parameter=${parameter}`
  );
};

// get list
const YakitGetByIdService = async (data, page) => {
  return await http.post(`/Fuel/GetFuelListByVehicleId?page=${page}`, data);
};

const YakitListSearchByIdService = async (data, page, parameter) => {
  return await http.post(
    `/Fuel/GetFuelListByVehicleId?page=${page}&parameter=${parameter}`,
    data
  );
};

// get data for one vehicle
const YakitDataGetByIdService = async (id) => {
  return await http.get(`/Fuel/GetFuelCardContentById?vehicleId=${id}`);
};

const YakitDataGetByDateService = async (data) => {
  return await http.post(`/Fuel/GetKmRangeBeforeDate`, data);
};

const YakitAddService = async (data) => {
  return await http.post(`/Fuel/AddFuel`, data);
};

const YakitHistoryGetService = async (id, date, time) => {
  return await http.get(
    `/Fuel/GetLastThreeFuelRecord?vehicleId=${id}&date=${date}&time=${time}`
  );
};

const YakitTankGetService = async (id, type) => {
  return await http.get(`/WareHouse/GetWareHouseList?tip=${type}&id=${id}`);
};

const YakitKmLogValidateService = async (data) => {
  return await http.post(`/Fuel/ValidateFuelInfoInsertion`, data);
};

const YakitKmLogValidateForUpdateService = async (data) => {
  return await http.post(`/Fuel/ValidateFuelInfoUpdate`, data);
};

const YakitPriceGetService = async (id) => {
  return await http.get(`/Material/GetMaterialPrice?materialId=${id}`);
};

const YakitUpdateDataGetService = async (id) => {
  return await http.get(`/Fuel/GetFuelCardInfoByFuelId?id=${id}`);
};

const YakitUpdateDataUpdateService = async (data) => {
  return await http.post(`/Fuel/UpdateFuel`, data);
};

const YakitDataDeleteService = async (id) => {
  return await http.get(`/Fuel/DeleteFuelCard?fuelId=${id}`);
};


export {
    YakitGetService,
    YakitListSearchService,
    YakitGetByIdService,
    YakitListSearchByIdService,
    YakitDataGetByIdService,
    YakitDataGetByDateService,
    YakitAddService,
    YakitHistoryGetService,
    YakitTankGetService,
    YakitKmLogValidateService,
    YakitKmLogValidateForUpdateService,
    YakitPriceGetService,
    YakitUpdateDataGetService,
    YakitUpdateDataUpdateService,
    YakitDataDeleteService
}