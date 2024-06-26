import http from "../http";

export const GirisFisleriListGetService = async (page) => {
  return await http.post(
    `/MaterialReceipt/GetMaterialEntryReceiptList?page=${page}`
  );
};

export const GirisFisleriListSearchService = async (page, parameter) => {
  return await http.post(
    `/MaterialReceipt/GetMaterialEntryReceiptList?page=${page}&parameter=${parameter}`
  );
};

export const GirisFisCodeGetService = async () => {
  return await http.get(`/Numbering/GetModuleCodeByCode?code=STOK_FIS_ALIS`);
};

export const GirisFisleriAddService = async (data) => {
  return await http.post(`/MaterialReceipt/AddMaterialReceipt`, data);
};

export const GetMaterialReceiptByIdService = async (id) => {
  return await http.get(
    `/MaterialReceipt/GetMaterialReceiptById?receiptId=${id}`
  );
};

export const UpdateMaterialReceiptService = async (data) => {
  return await http.post(`/MaterialReceipt/UpdateMaterialEntryReceipt`, data);
};

export const DeleteUpdatedMaterialReceiptService = async (id) => {
  return await http.get(`/MaterialMovements/DeleteMaterialMovementItemById?id=${id}`);
};