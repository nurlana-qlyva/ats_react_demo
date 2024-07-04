import http from "../http";

export const GetMaterialTransferReceiptListService = async (page, parameter) => {
    return await http.post(
        `/MaterialReceipt/GetMaterialTransferReceiptList?page=${page}&parameter=${parameter}`
    );
};