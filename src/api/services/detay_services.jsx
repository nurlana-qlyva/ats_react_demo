import http from "../http";

export const DetailInfoGetService = async (id) => {
  return await http.get(`/VehicleDetail/GetVehicleDetailsInfo?vehicleId=${id}`);
};

export const DetailInfoUpdateService = async (data) => {
  return await http.post(`/VehicleDetail/UpdateVehicleDetailsInfo`, data);
};
