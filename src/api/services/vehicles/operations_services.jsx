import http from "../../http";

// harcama
export const GetExpensesListByVehicleIdService = async (
    id,
    search,
    page,
    data
) => {
    return await http.get(
        `/Expenses/GetExpensesListByVehicleId?vehicleId=${id}&page=${page}&parameter=${search}`,
        data
    );
};

export const AddExpenseItemService = async (data) => {
    return await http.post(`/Expenses/AddExpenseItem`, data);
};

export const GetExpenseByIdService = async (id) => {
    return await http.get(`/Expenses/GetExpenseById?id=${id}`);
};

export const UpdateExpenseItemService = async (data) => {
    return await http.post(`/Expenses/UpdateExpenseItem`, data);
};

export const GetExpensesListService = async (search, page, data) => {
    return await http.get(`/Expenses/GetExpensesList?page=${page}&parameter=${search}`, data);
};

// sefer
export const GetExpeditionsListByVehicleIdService = async (
    id,
    search,
    page,
    data
) => {
    return await http.get(
        `/Expeditions/GetExpeditionsListByVehicleId?vehicleId=${id}&page=${page}&parameter=${search}`,
        data
    );
};

export const AddExpeditionItemService = async (data) => {
    return await http.post(`/Expeditions/AddExpeditionItem`, data);
};

export const GetExpeditionItemByIdService = async (id) => {
    return await http.get(`/Expeditions/GetExpeditionItemById?id=${id}`);
};

export const UpdateExpeditionItemService = async (data) => {
    return await http.post(`/Expeditions/UpdateExpeditionItem`, data);
};

export const GetExpeditionsListService = async (search, page, data) => {
    return await http.get(`/Expeditions/GetExpeditionsList?page=${page}&parameter=${search}`, data);
};
