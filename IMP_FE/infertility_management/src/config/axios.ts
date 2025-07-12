import axios from "axios";
import { store } from "../store/store";

const API_URL = "https://localhost:55634/api";

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = store.getState().user.accessToken;
        console.log("token",token)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        config.headers['Access-Control-Allow-Origin'] = '*';
        config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
        config.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;