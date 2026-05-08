import { useQuery } from "@tanstack/react-query"
import { SettingsConfig } from "../api/settingsTypes/mainSettings"
import { GroupsSettings } from "../api/settingsTypes/allGroups"
import { queryKeys } from "@/entities/api/queryKeys"
import { getAllGroups, GetSettingsConfig } from "../api/settingsApi"

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
