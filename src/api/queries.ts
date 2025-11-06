import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "./queryKeys"
import { getHabbits, startLogin } from "./api"

export const useLogin = (username: string, password: string) => {
    return useQuery({
        queryKey: [queryKeys.login],
        queryFn: () => startLogin({username, password}),
    })
}

export const useHabbits = () => {
    return useQuery({
        queryKey: [queryKeys.login],
        queryFn: () => getHabbits({startDate: "2023-09-01", endDate: "2023-09-30"}),
    })
}