import { axiosApi } from "@/entities/api/axiosApi";
import { ConfigureGroup, ConfigureHabbit, NewGroup, NewHabbit } from "./settingsTypes/groupSettings";
import { ConfigureSettings } from "./settingsTypes/mainSettings";
import { ExportResponse } from "./settingsTypes/export";

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


