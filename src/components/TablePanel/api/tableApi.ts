import { axiosApi } from "@/entities/api/axiosApi"
import { HabitsData } from "./tableTypes"

export const getHabbits = async (data: HabitsData) => {
    const res =  await axiosApi.get('/api/records', {params:{
        startDate: data.startDate,
        endDate: data.endDate,
    }})
    return res.data
}
