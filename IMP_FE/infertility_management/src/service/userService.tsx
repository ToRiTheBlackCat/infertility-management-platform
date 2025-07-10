import axiosInstance from "../config/axios";
import { User } from "../types/user";

export const LoginUser = async (email: string, password: string): Promise<User | null> => {
    try {
        const response = await axiosInstance.post<User>('/Auth/login', {
            email,
            password,
        });
        const user = response.data;

        if (user && user.accessToken && user.refreshToken) {
            return user;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Login error', error);
        return null;
    }
}

export const RefreshToken = async (refreshToken: string): Promise<{accessToken: string; refreshToken: string} | null> => {
    try{
        const response = await axiosInstance.post<{accessToken: string; refreshToken: string}>('/Auth/refresh',{
            refreshToken,
        });
        const { accessToken, refreshToken: newRefreshToken } = response.data;

        if (accessToken && newRefreshToken) {
        return {
            accessToken,
            refreshToken: newRefreshToken,
        };
        } else {
        return null;
        }
    } catch(error){
        console.error('Refresh token error', error);
        return null;
    }
}