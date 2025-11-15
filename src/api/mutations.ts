import { useMutation } from "@tanstack/react-query"
import { axiosApi } from "./axiosApi"
import { addGroup, deleteGroup, NewGroup, ConfigureGroup, LoginData, LoginResponse, startLogin, configureGroup } from "./api";
import { queryClient } from "./queryCient";
import { queryKeys } from "./queryKeys";



export const useLogin = () => {
  return useMutation <LoginResponse, Error, LoginData>({
    mutationFn: (data: LoginData) => startLogin(data),  
});
};

export const useDeleteGroup = () => {
  return useMutation({
    mutationKey: ['groups'],
    mutationFn: (id: number) => deleteGroup(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.groups] });
    },
  });  
};

export const useAddGroup = () => {
  return useMutation({
    mutationKey: ['groups'],
    mutationFn: (data: NewGroup) => addGroup(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.groups] });
    },
  });  
};

export const useConfigureGroup = () => {
  return useMutation({
    mutationKey: ['groups'],
    mutationFn: (data: ConfigureGroup) => configureGroup(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.groups] });
    },
  });
}