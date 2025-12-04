import { keepPreviousData, useQuery, UseQueryOptions } from "@tanstack/react-query"
import { queryKeys } from "./queryKeys"
import { getAllGroups, GroupsSettings, getHabbits, HabitsResponse, startLogin, SettingsConfig, GetSettingsConfig, HabitsData } from "./api"
interface addGroupParams {
    name: string;
    color: string;
}

export const useLogin = (username: string, password: string) => {
    return useQuery({
        queryKey: [queryKeys.login],
        queryFn: () => startLogin({username, password}),
    })
}

export const useHabbits = (data: HabitsData) => {
  return useQuery({
    queryKey: queryKeys.groupsByDate(data.startDate, data.endDate),
    queryFn: () => getHabbits({ startDate: data.startDate, endDate: data.endDate }),
    placeholderData: keepPreviousData,
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

