import { ILoginForm } from '../types'
import http from './http'


export const LoginUserService = (data: ILoginForm) => {
    return http.post<object>("/Login", data)
}

export const AraclarService = () => {
    return http.get("/Vehicle/GetVehicles");
}

export const CodeSelectService = (id) => {
    return http.get(`/Code/GetCodeTextById?codeNumber=${id}`);
}