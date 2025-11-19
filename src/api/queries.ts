import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "./queryKeys"
import { getAllGroups, GroupsSettings, getHabbits, HabbitsResponse, startLogin, SettingsConfig, GetSettingsConfig } from "./api"
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

export const useHabbits = () => {
    return useQuery<HabbitsResponse>({
        queryKey: [queryKeys.groups],
        queryFn: () => getHabbits({startDate: "2025-10-01", endDate: "2025-11-10"}),
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

