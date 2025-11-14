import { useMutation } from "@tanstack/react-query"
import { axiosApi } from "./axiosApi"
import { addGroup, deleteGroup, GroupRequest, LoginData, LoginResponse, startLogin } from "./api";
import { colors } from "@mui/material";
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
    mutationFn: (data: GroupRequest) => addGroup(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.groups] });
    },
  });  
};
