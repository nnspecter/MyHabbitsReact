import { axiosApi } from "./axiosApi"

export const LogOut = async () =>{
    const res = await axiosApi.post("/logout");
    return res.data 
}




