export const queryKeys = {
    login: ["login"] as const,
    table: {
        all: ["table"] as const,
        byDate: (startDate: string, endDate: string) => ["table", startDate, endDate] as const,
    },
    dashboard: {
        all: ["dashboard"] as const,
        byDate: (selectedDate: string) => ["dashboard", selectedDate] as const,
    },
    GroupSettings: ["GroupSettings"] as const,
    GroupSettingsConfig: ["GroupSettingsConfig"] as const,
    habitStats: (id: number) => ["habitStats", id] as const,  
}