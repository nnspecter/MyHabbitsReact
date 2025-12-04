

export const queryKeys = {
    login: ["login"] as const,
    groups: ["groups"] as const,
    groupsByDate: (startDate: string, endDate: string) => ["groups", "byDate", startDate, endDate] as const,
    GroupSettings: ["GroupSettings"] as const,
    GroupSettingsConfig: ["GroupSettingsConfig"] as const,  
}