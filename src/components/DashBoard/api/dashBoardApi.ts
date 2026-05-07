import { axiosApi } from "@/entities/api/axiosApi";
import { NewRecord } from "./types";

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