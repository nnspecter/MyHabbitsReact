import { axiosApi } from "./axiosApi"
import qs from "qs";
import { LoginData, RegistrationData } from "./types/login";
import { HabitsData } from "./types/table";
import { ExportResponse } from "./types/settings/export";
import { ConfigureGroup, ConfigureHabbit, NewGroup, NewHabbit } from "./types/settings/groupSettings";
import { ConfigureSettings } from "./types/settings/mainSettings";
import { NewRecord } from "./types/dashboard";


//Функция логина пользователя
export const startLogin = async (data: LoginData) => {
    const res =  await axiosApi.post('/login', qs.stringify(data),
    {headers: {"Content-Type": "application/x-www-form-urlencoded"}})
    return res.data
}
//Функция регистрации пользователя
export const startRegistration = async (data: RegistrationData) => {
    const res =  await axiosApi.post('/api/users/add', data)
    return res.data
}
export const LogOut = async () =>{
    const res = await axiosApi.post("/logout");
    return res.data 
}


//Привычки для таблицы--------------------------------------------------------------------------------


//функция доступа к привычкам по датам
export const getHabbits = async (data: HabitsData) => {
    const res =  await axiosApi.get('/api/records', {params:{
        startDate: data.startDate,
        endDate: data.endDate,
    }})
    return res.data
}


//Апи для настройки всех групп------------------------------------------------------------------------


//Получение всех групп
export const getAllGroups = async () => {
    const res =  await axiosApi.get('/api/groups/all');
    return res.data
}

//Добавление группы
export const addGroup = async (data: NewGroup) => {
    const res =  await axiosApi.post('/api/groups', {
        name: data.name,
        color: data.color,
    })
    return res.data
}

//Конфигурация группы 
export const configureGroup = async (data: ConfigureGroup) => {
    const res =  await axiosApi.post(`/api/groups/configure`, data)
    return res.data
}
//Удаление группы
export const deleteGroup = async (id: number) => {
    const res =  await axiosApi.delete(`/api/groups/${id}`)
    return res.data
}


//Конфигурация настроек--------------------------------------------------------------------------------


//получение конфигурации настроек всех групп
export const GetSettingsConfig = async () => {
    const res =  await axiosApi.get(`/api/users/settings`)
    return res.data
}

//Изменение конфигурации настроек всех групп 
export const configureSettings = async (data: ConfigureSettings) => {
    const res =  await axiosApi.post(`/api/users/settings`, data)
    return res.data
}


//Настройка привычек группы--------------------------------------------------------------------------------

//Добавление привычки
export const addHabit = async (data: NewHabbit) => {
    const res =  await axiosApi.post(`/api/habits`, data);
    return res.data;
}

//Удаление привычки
export const deleteHabit = async (id: number) => {
    const res =  await axiosApi.delete(`/api/habits/${id}`);
    return res.data;
}

//Настройки привычки
export const configureHabit = async (data: ConfigureHabbit) => {
    const res =  await axiosApi.post(`/api/habits/configure`, data);
    return res.data;
}

//Дэшборд-------------------------------------------------------------------------------------------------

//Создать запись
export const newRecord = async (data: NewRecord) => {
    const res =  await axiosApi.put(`/api/records`, data);
    return res.data;
}
//получение по дате
export const getDashboardHabbits = async (date: string) => {
    const res =  await axiosApi.get(`/api/records/day?date=${date}`);
    return res.data
}

//Аналитика----------------------------------------------------------------------------------------------
//Получение статистики привычки
export const getHabitStats = async (id: number) => {
    const res =  await axiosApi.get(`/api/habits/${id}/stats`);
    return res.data
}

//Экспорт- импорт данных-----------------------------------------------------------------------------------------

//Экспорт
export const startExport = async (): Promise<ExportResponse> => {
    const res =  await axiosApi.get(`/api/export`);
    return res.data
}
//Импорт
export const startImport = async (data: ExportResponse) => {
    const res =  await axiosApi.post(`/api/import`, data);
    return res.data
}


