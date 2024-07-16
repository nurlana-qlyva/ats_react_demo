import http from "../../../http";

export const GetVehicleFinesListByVehicleIdService = async (
  id,
  search,
  page,
  data
) => {
  return await http.get(
    `/VehicleFines/GetVehicleFinesListByVehicleId?vehicleId=${id}&page=${page}&parameter=${search}`,
    data
  );
};

export const AddVehicleFineItemService = async (data) => {
  return await http.post(`/VehicleFines/AddVehicleFineItem`, data);
};

export const GetPenaltyDefListService = async (search, page) => {
  return await http.get(
    `/PenaltyDef/GetPenaltyDefList?page=${page}&parameter=${search}`
  );
};
