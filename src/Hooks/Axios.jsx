import axios from "axios";
import { useContext } from "react";
import { BASE_URL } from "../constants/api";


export default function useAxios(){
    const [auth] = useContext(AuthContext);
  
    const apiClient = axios.create({
      baseURL: BASE_URL,
    })
    
    apiClient.interceptors.request.use(function (config) {
      const token = auth.token;
      config.headers.Authorization = token ? `Bearer ${token}` : "";
      return config;
    });
    
    return apiClient;
  }
  