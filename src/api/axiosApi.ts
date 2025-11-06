import axios from "axios";

export const axiosApi = axios.create({
  baseURL: "https://7lfz-cvkd-8k4q.gw-1a.dockhost.net",
  withCredentials: true, 
});