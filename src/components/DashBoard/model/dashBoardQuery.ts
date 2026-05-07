import { queryKeys } from "@/entities/api/queryKeys"
import { getDashboardHabbits } from "../api/dashBoardApi"
import { DashboardResponse } from "../api/types"
import { useQuery } from "@tanstack/react-query"

//функция дашборда
export const useDashboardHabbit = (date: string) => {
  return useQuery<DashboardResponse>({
    queryKey: queryKeys.dashboard.byDate(date),
    queryFn: () => getDashboardHabbits(date),
  })
}