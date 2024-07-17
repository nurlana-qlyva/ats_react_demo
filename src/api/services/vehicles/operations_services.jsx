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
