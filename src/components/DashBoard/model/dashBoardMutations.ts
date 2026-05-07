import { useMutation } from "@tanstack/react-query";
import { NewRecord } from "../api/types";
import { newRecord } from "../api/dashBoardApi";
import { queryClient } from "@/entities/api/queryCient";
import { queryKeys } from "@/entities/api/queryKeys";

const invalidateWithoutDashboard = () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.table.all});
      queryClient.invalidateQueries({ queryKey: queryKeys.GroupSettings});
      queryClient.invalidateQueries({ queryKey: queryKeys.GroupSettingsConfig});
    }


export const useNewRecord = () => {
  return useMutation({
    mutationFn: (data: NewRecord) => newRecord(data),
    onSuccess: invalidateWithoutDashboard,
  });
}

