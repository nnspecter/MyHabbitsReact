import { useMutation } from "@tanstack/react-query"
import { addGroup, deleteGroup, NewGroup, ConfigureGroup, LoginData, NewHabbit, ConfigureHabbit, LoginResponse, startLogin, configureGroup, configureSettings, ConfigureSettings, addHabit, deleteHabit, configureHabit, NewRecord, newRecord } from "./api";
import { queryClient } from "./queryCient";
import { queryKeys } from "./queryKeys";



export const useDeleteGroup = () => {
  return useMutation({
    mutationFn: (id: number) => deleteGroup(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.groups], exact: false });
      queryClient.invalidateQueries({ queryKey: [queryKeys.GroupSettings], exact: false });
    },
  });  
};

export const useAddGroup = () => {
  return useMutation({
    mutationFn: (data: NewGroup) => addGroup(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.groups], exact: false });
      queryClient.invalidateQueries({ queryKey: [queryKeys.GroupSettings], exact: false });
    },
  });  
};

export const useConfigureGroup = () => {
  return useMutation({
    mutationFn: (data: ConfigureGroup) => configureGroup(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.groups], exact: false });
      queryClient.invalidateQueries({ queryKey: [queryKeys.GroupSettings], exact: false });
    },
  });
}

export const useConfigureSettings = () => {
  return useMutation({
    mutationFn: (data: ConfigureSettings) => configureSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.groups], exact: false });
      queryClient.invalidateQueries({ queryKey: [queryKeys.GroupSettings], exact: false });
      queryClient.invalidateQueries({ queryKey: [queryKeys.GroupSettingsConfig], exact: false });
    },
  });
}

export const useAddHabit = () => {
  return useMutation({
    mutationFn: (data: NewHabbit) => addHabit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.groups], exact: false });
      queryClient.invalidateQueries({ queryKey: [queryKeys.GroupSettings], exact: false });
      queryClient.invalidateQueries({ queryKey: [queryKeys.GroupSettingsConfig], exact: false });
    },
  });
}

export const useDeleteHabit = () => {
  return useMutation({
    mutationFn: (id: number) => deleteHabit(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.groups], exact: false });
      queryClient.invalidateQueries({ queryKey: [queryKeys.GroupSettings], exact: false });
      queryClient.invalidateQueries({ queryKey: [queryKeys.GroupSettingsConfig], exact: false });
    },
  });
}

export const useConfigureHabit = () => {
  return useMutation({
    mutationFn: (data: ConfigureHabbit) => configureHabit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.groups], exact: false });
      queryClient.invalidateQueries({ queryKey: [queryKeys.GroupSettings], exact: false });
      queryClient.invalidateQueries({ queryKey: [queryKeys.GroupSettingsConfig], exact: false });
    },
  });
}

export const useNewRecord = () => {
  return useMutation({
    mutationFn: (data: NewRecord) => newRecord(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.groups], exact: false });
      queryClient.invalidateQueries({ queryKey: [queryKeys.GroupSettings], exact: false });
      queryClient.invalidateQueries({ queryKey: [queryKeys.GroupSettingsConfig], exact: false });
      queryClient.invalidateQueries({ queryKey: ["groups", "byDate"], exact: false });
    },
  });
}

