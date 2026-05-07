import { keepPreviousData, useQuery} from "@tanstack/react-query"
import { queryKeys } from "./queryKeys"
import { getAllGroups, getHabbits,  GetSettingsConfig } from "./api"

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


