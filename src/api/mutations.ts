import { useMutation } from "@tanstack/react-query"
import { axiosApi } from "./axiosApi"
import { addGroup, deleteGroup, NewGroup, ConfigureGroup, LoginData, NewHabbit, LoginResponse, startLogin, configureGroup, configureSettings, ConfigureSettings, addHabit, deleteHabit } from "./api";
import { queryClient } from "./queryCient";
import { queryKeys } from "./queryKeys";
import { group } from "console";



export const useLogin = () => {
  return useMutation <LoginResponse, Error, LoginData>({
    mutationFn: (data: LoginData) => startLogin(data),  
});
};

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

