import axiosInstance from "../config/axios";
import { SignUpData } from "../types/common";
import { User } from "../types/user";

export const getLocalISOTime = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset(); // in minutes
    const localTime = new Date(now.getTime() - offset * 60 * 1000);
    return localTime.toISOString().slice(0, -1); // remove the 'Z'
};

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

export const SignUpUser = async ( body: SignUpData) =>{
    try{
        const response = await axiosInstance.post(`/User/register-patient`,body);
        if(response){
            return response.data
        }
    }catch (error) {
        console.error('Login error', error);
        return null;
    }
}
export const RefreshToken = async (refreshToken: string): Promise<{ accessToken: string; refreshToken: string } | null> => {
    try {
        const response = await axiosInstance.post<{ accessToken: string; refreshToken: string }>(
            `/Auth/refresh?refreshToken=${encodeURI(refreshToken)}`
        );
        const { accessToken, refreshToken: newRefreshToken } = response.data;

        if (accessToken && newRefreshToken) {
            return {
                accessToken,
                refreshToken: newRefreshToken,
            };
        } else {
            return null;
        }
    } catch (error) {
        console.error('Refresh token error', error);
        return null;
    }
}