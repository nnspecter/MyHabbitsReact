import axios from "axios";


const API_DELAY = process.env.NODE_ENV === "development" ? 1000 : 0;

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const axiosApi = axios.create({
  baseURL: "https://7lfz-cvkd-8k4q.gw-1a.dockhost.net",
  withCredentials: true, 
})

axiosApi.interceptors.request.use(
  async (config) => {
    if (API_DELAY > 0) {
      await delay(API_DELAY);
    }
    return config;
  },
  (error) => Promise.reject(error)
);