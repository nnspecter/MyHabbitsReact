import { useMutation } from "@tanstack/react-query"
import { axiosApi } from "./axiosApi"
import { LoginData, LoginResponse, startLogin } from "./api";

export const useLogin = () => {
  return useMutation <LoginResponse, Error, LoginData>({
    mutationFn: (data: LoginData) => startLogin(data),
    
  });
};
