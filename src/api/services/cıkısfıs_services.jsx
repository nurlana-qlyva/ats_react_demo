import http from "../http";

export const CikisFisleriListGetService = async (page) => {
  return await http.post(
    `/MaterialReceipt/GetMaterialReleaseReceiptList?page=${page}`
  );
};

export const CikisFisleriListSearchService = async (page, parameter) => {
  return await http.post(
    `/MaterialReceipt/GetMaterialReleaseReceiptList?page=${page}&parameter=${parameter}`
  );
};

export const CikisFisCodeGetService = async () => {
  return await http.get(`/Numbering/GetModuleCodeByCode?code=STOK_FIS_ALIS`);
};

export const CikisFisleriAddService = async (data) => {
  return await http.post(`/MaterialReceipt/AddMaterialReceipt`, data);
};

export const GetCikisMaterialReceiptByIdService = async (id) => {
  return await http.get(
    `/MaterialReceipt/GetMaterialReceiptById?receiptId=${id}`
  );
};

export const UpdateCikisMaterialReceiptService = async (data) => {
  return await http.post(`/MaterialReceipt/UpdateMaterialReceipt`, data);
};

export const DeleteCikisUpdatedMaterialReceiptService = async (id) => {
  return await http.get(
    `/MaterialMovements/DeleteMaterialMovementItemById?id=${id}`
  );
};
