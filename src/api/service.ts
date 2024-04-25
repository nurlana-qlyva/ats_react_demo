import { ILoginForm } from '../types'
import http from './http'


export const LoginUserService = (data: ILoginForm) => {
    return http.post<object>("/Login", data)
}

export const AraclarSearchService = (search, page) => {
    return http.post(`/Vehicle/GetVehicles?parameter=${search}&page=${page}`);
}

export const AraclarFilterService = (search, data) => {
    return http.post(`/Vehicle/GetVehicles?parameter=${search}`, data);
}

export const CodeSelectService = (id) => {
    return http.get(`/Code/GetCodeTextById?codeNumber=${id}`);
}

export const CodeCustomSelectService = (url) => {
    return http.get(`/${url}`);
}