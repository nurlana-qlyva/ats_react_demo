import http from "../http";

const VehiclesReadForSearchService = async (search) => {
  return await http.post(`/Vehicle/GetVehicles?parameter=${search}`);
};

const VehiclesReadForPageService = async (search, page) => {
  return await http.post(`/Vehicle/GetVehicles?parameter=${search}&page=${page}`);
};

const VehiclesReadForFilterService = async (search, data) => {
  return await http.post(`/Vehicle/GetVehicles?parameter=${search}`, data);
};

// add vehicle
const NewVehicleAddService = async (data) => {
  return await http.post(`Vehicle/AddVehicle`, data);
};

// update vehicles
const VehiclesUpdateReadService = async (id) => {
  return await http.get(`/Vehicle/GetVehicleById?id=${id}`);
};

const VehiclesUpdateSetService = async (data) => {
  return await http.post(`/Vehicle/UpdateVehicle`, data);
};

export {
  VehiclesReadForSearchService,
  VehiclesReadForPageService,
  VehiclesReadForFilterService,
  NewVehicleAddService,
  VehiclesUpdateReadService,
  VehiclesUpdateSetService,
};
