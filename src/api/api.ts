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


// функция доступа к привычкам по датам
interface HabbitsData {
    startDate: string;
    endDate: string;
}

interface Record {
    date: string;
    value: boolean | number | string; // исправлено: value может быть разным типом
}

interface Habbit {
    id: number;
    name: string;
    type: "GENERAL" | "NUMBER" | "TEXT"; // исправлено: конкретные типы
    hidden: boolean;
    position: number;
    records: Record[];
}

export interface HabbitsGroup { // исправлено название: Group вместо group
    id: number;
    name: string;
    color: string;
    hidden: boolean;
    minimized: boolean;
    position: number;
    habits: Habbit[]; // исправлено: habits вместо habbits
}

interface Data {
    groups: HabbitsGroup[];
    dates: string[];
}

export interface HabbitsResponse {
    data: Data;
    meta: { status: string };
}
//--------------------------------

//Запросы к группам
export interface GroupRequest {
    name: string;
    color: string;
}


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

//Добавление группы
export const addGroup = async (data: GroupRequest) => {
    const res =  await axiosApi.post('/api/groups', {
        name: data.name,
        color: data.color,
    })
    return res.data
}

//Удаление группы
export const deleteGroup = async (id: number) => {
    const res =  await axiosApi.delete(`/api/groups/${id}`)
    return res.data
}
