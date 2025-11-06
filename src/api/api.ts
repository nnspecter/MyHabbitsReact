import { axiosApi } from "./axiosApi"
import qs from "qs";

//функция регистрации пользователя
export interface LoginData {
    username: string;
    password: string;
}
export interface LoginResponse {
    token: string;
}
//--------------------------------


//функция доступа к привычкам по датам
interface HabbitsData{
    startDate: string;
    endDate: string;
}
interface Record {
    date: string;
    value: string;
}
interface Habbit{
    id: number;
    name: string;
    type: string;
    records: Record[]; 
}
interface HabbitsResponse{
    id: number;
    name: string;
    color: string;
    habbits: Habbit[];
}
//

//функция регистрации пользователя
export const startLogin = async (data: LoginData) => {
    const res =  await axiosApi.post('/login', qs.stringify(data),
    {headers: {"Content-Type": "application/x-www-form-urlencoded"}})
    return res.data
}

//функция доступа к привычкам по датам
export const getHabbits = async (data: HabbitsData) => {
    const res =  await axiosApi.get('/api/records', {params:{
        startDate: data.startDate,
        endDate: data.endDate,
    }})
    return res.data
}