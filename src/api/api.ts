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
export interface RegistrationData{
    name: string;
    password: string;
}
//--------------------------------


// функция доступа к привычкам по датам
export interface HabitsData {
    startDate: string;
    endDate: string;
}

export interface Record {
    date: string;
    value: boolean | number | string | null; // исправлено: value может быть разным типом
}


export interface Habit {
    id: number;
    name: string;
    type: "GENERAL" | "NUMBER" | "TEXT" | "TIME" ; // исправлено: конкретные типы
    hidden: boolean;
    position: number;
    records: Record[];
}

export interface HabitsGroup { 
    id: number;
    name: string;
    color: string;
    hidden: boolean;
    minimized: boolean;
    position: number;
    habits: Habit[]; 
}

interface Data {
    groups: HabitsGroup[];
    dates: string[];
}

export interface HabitsResponse {
    data: Data;
    meta: { status: string };
}
//--------------------------------

//Апи для всех групп

//--------------------------------

//Новая группа
export interface NewGroup {
    name: string;
    color: string;
}
//--------------------------------

// Конфигурация группы
export interface ConfigureGroup {
    groupId: number;
    name?: string;
    color?: string;
    hidden?: boolean;
    minimized?: boolean;
    orderedIds?: number[];
}

//--------------------------------

//Группы для настроек 
export interface GroupsSettings{
    data: HabbitsAllGroups[];
    meta: { status: string };
}

export interface HabbitsAllGroups { 
    id: number;
    name: string;
    color: string;
    hidden: boolean;
    minimized: boolean;
    position: number; 
    habits: Habit[];
}
//--------------------------------

//Конфигурация настроек всех групп 
export interface ConfigureSettings {
    showHidden: boolean;
}
export interface SettingsConfigData {
    showHidden: boolean;
}
//данные конфигурации настроек всех групп
export interface SettingsConfig {
    data: SettingsConfigData;
    meta: { status: string };
}

//--------------------------------

//Создание привычек группы
export interface NewHabbit {
    groupId: number;
    name: string;
    type: "GENERAL" | "NUMBER" | "TEXT" | "TIME";
    hidden: boolean;
    schedule: "EVERYDAY" | "IN_DAY" | "N_WEEK" | "N_MONTH" //+
    scheduleN: number; // +

}
//Настройка привычки
export interface ConfigureHabbit {
    groupId: number;
    habitId: number;
    name?: string;
    type?: "GENERAL" | "NUMBER" | "TEXT" | "TIME";
    hidden?: boolean;
    scheduleN?: number; // +

}


//--------------------------------
export interface NewRecord{
    habitId: number;
    date: string;
    value: number | string | boolean
}

//Аналитика-------------------------
export interface StatsResponse {
    data: HabitStats;
    meta: { status: string, description: string };
}

export interface HabitStats {
    completion: number,
    completionCount: number,
    weekCompletion: number,
    maxStreak: number,
    maxMiss: number,
    currentStreak: number,
    currentMiss: number,
}


//Регистрация------------------------------------------------------------------------------------------


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

// //Конфигурация дашборда
// export const configureDashboardHabbits = async (date: string) => {
//     const res =  await axiosApi.post(`/api/groups/configure`);
//     return res.data
// }

//Аналитика----------------------------------------------------------------------------------------------
//Получение статистики привычки
export const getHabitStats = async (id: number) => {
    const res =  await axiosApi.get(`/api/habits/${id}/stats`);
    return res.data
}