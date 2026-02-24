import { queryClient } from "../queryCient";
import { queryKeys } from "../queryKeys";

export const invalidateAll = () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.table.all});
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all});
      queryClient.invalidateQueries({ queryKey: queryKeys.GroupSettings});
      queryClient.invalidateQueries({ queryKey: queryKeys.GroupSettingsConfig});
    }

export const invalidateWithoutDashboard = () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.table.all});
      queryClient.invalidateQueries({ queryKey: queryKeys.GroupSettings});
      queryClient.invalidateQueries({ queryKey: queryKeys.GroupSettingsConfig});
    }
