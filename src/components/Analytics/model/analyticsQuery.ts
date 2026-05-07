import { useQuery } from "@tanstack/react-query"
import { getHabitStats, StatsResponse } from "../api/analyticsApi"
import { queryKeys } from "@/entities/api/queryKeys"

export const useHabitStats = (id: number) => {
    return useQuery<StatsResponse>({
        queryKey: queryKeys.habitStats(id),
        queryFn: () => getHabitStats(id),
    })
}
