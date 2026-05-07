import { invalidateAll } from "@/entities/api/mutations/onSuccess";

import { useMutation } from "@tanstack/react-query";
import { authData, startLogin, startRegistration } from "../api/authApi";

//login
export const useLogin = () => {
  return useMutation({
    mutationFn: (data: authData) => startLogin(data),
    onSuccess: invalidateAll,  
  });
};

//registration
export const useRegistration = () => {
  return useMutation({
    mutationFn: (data: authData) => startRegistration(data),  
  });
  };
