import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { HabitsData, HabitsResponse } from "../api/tableTypes"
import { queryKeys } from "@/entities/api/queryKeys"
import { getHabbits } from "../api/tableApi"

export const useHabbits = (data: HabitsData) => {
  return useQuery<HabitsResponse>({
    queryKey: queryKeys.table.byDate(data.startDate, data.endDate),
    queryFn: () => getHabbits({ startDate: data.startDate, endDate: data.endDate }),
    placeholderData: keepPreviousData,
  })
}