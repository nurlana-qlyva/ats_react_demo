import { ILoginForm } from '../types'
import http from './http'


export const LoginUserService = (data: ILoginForm) => {
    return http.post<object>("/Login", data)
}

export const AraclarSearchService = (search: string, page: string) => {
    return http.post(`/Vehicle/GetVehicles?parameter=${search}&page=${page}`);
}

export const AraclarFilterService = (search:string, data: string) => {
    return http.post(`/Vehicle/GetVehicles?parameter=${search}`, data);
}

export const CodeSelectService = (id:string) => {
    return http.get(`/Code/GetCodeTextById?codeNumber=${id}`);
}

export const CodeCustomSelectService = (url:string) => {
    return http.get(`/${url}`);
}