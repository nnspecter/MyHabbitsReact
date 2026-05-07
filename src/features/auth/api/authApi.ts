import { axiosApi } from "@/entities/api/axiosApi"
import qs from "qs";

export interface authData {
    username: string;
    password: string;
}
export interface LoginResponse {
    token: string;
}


//Функция логина пользователя
export const startLogin = async (data: authData) => {
    const res =  await axiosApi.post('/login', qs.stringify(data),
    {headers: {"Content-Type": "application/x-www-form-urlencoded"}})
    return res.data
}
//Функция регистрации пользователя
export const startRegistration = async (data: authData) => {
    const res =  await axiosApi.post('/api/users/add', data)
    return res.data
}