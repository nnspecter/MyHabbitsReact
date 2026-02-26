import { keepPreviousData, useQuery} from "@tanstack/react-query"
import { queryKeys } from "./queryKeys"
import { getAllGroups, getHabbits, startLogin, GetSettingsConfig, getDashboardHabbits, getHabitStats } from "./api"
import { DashboardResponse } from "./types/dashboard"
import { StatsResponse } from "./types/analytics"
import { HabitsData, HabitsResponse } from "./types/table"
import { GroupsSettings } from "./types/settings/allGroups"
import { SettingsConfig } from "./types/settings/mainSettings"



// функция таблицы
export const useHabbits = (data: HabitsData) => {
  return useQuery<HabitsResponse>({
    queryKey: queryKeys.table.byDate(data.startDate, data.endDate),
    queryFn: () => getHabbits({ startDate: data.startDate, endDate: data.endDate }),
    placeholderData: keepPreviousData,
  })
}

//функция дашборда
export const useDashboardHabbit = (date: string) => {
  return useQuery<DashboardResponse>({
    queryKey: queryKeys.dashboard.byDate(date),
    queryFn: () => getDashboardHabbits(date),
  })
}

export const useAllGroups = () => {
    return useQuery<GroupsSettings>({
        queryKey: queryKeys.GroupSettings,
        queryFn: () => getAllGroups(),
    })
}

export const useSettingsConfig = () => {
    return useQuery<SettingsConfig>({
        queryKey: queryKeys.GroupSettingsConfig,
        queryFn: () => GetSettingsConfig(),
    })
}

export const useHabitStats = (id: number) => {
    return useQuery<StatsResponse>({
        queryKey: queryKeys.habitStats(id),
        queryFn: () => getHabitStats(id),
    })
}

