import { keepPreviousData, useQuery} from "@tanstack/react-query"
import { queryKeys } from "./queryKeys"
import { getAllGroups, GroupsSettings, getHabbits, HabitsResponse, startLogin, SettingsConfig, GetSettingsConfig, HabitsData, getDashboardHabbits, StatsResponse, getHabitStats } from "./api"


export const useLogin = (username: string, password: string) => {
    return useQuery({
        queryKey: [queryKeys.login],
        queryFn: () => startLogin({username, password}),
    })
}

export const useHabbits = (data: HabitsData) => {
  return useQuery<HabitsResponse>({
    queryKey: queryKeys.groupsByDate(data.startDate, data.endDate),
    queryFn: () => getHabbits({ startDate: data.startDate, endDate: data.endDate }),
    placeholderData: keepPreviousData,
  })
}

//функция дашборда
export const useDashboardHabbit = (date: string) => {
  return useQuery({
    queryKey: queryKeys.groupsDashboard(date),
    queryFn: () => getDashboardHabbits(date),
  })
}

export const useAllGroups = () => {
    return useQuery<GroupsSettings>({
        queryKey: [queryKeys.GroupSettings],
        queryFn: () => getAllGroups(),
    })
}

export const useSettingsConfig = () => {
    return useQuery<SettingsConfig>({
        queryKey: [queryKeys.GroupSettingsConfig],
        queryFn: () => GetSettingsConfig(),
    })
}

export const useHabitStats = (id: number) => {
    return useQuery<StatsResponse>({
        queryKey: queryKeys.habitStats(id),
        queryFn: () => getHabitStats(id),
    })
}

