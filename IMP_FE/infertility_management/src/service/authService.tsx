import exp from "constants";
import axiosInstance from "../config/axios";

export const fetchBlog = async () => {
    try {
        const response = await axiosInstance.get(`/Blog`);
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return [];
    }
};
export const fetchTreatment = async () => {
    try {
        const response = await axiosInstance.get(`/Treatment`);
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching treatments:', error);
        return [];
    }
}
export const fetchTreatmentById = async (id: number) => {
    try{
        const response = await axiosInstance.get(`/Treatment/${id}`);
        if (response) {
            return response.data;
        }
    }catch (error) {
        console.error('Error fetching treatment by ID:', error);
        return null;
    }
}
export const fetchTreatmentSteps = async (treatmentId: number) => {
    try {
        const response = await axiosInstance.get(`/TreatmentStep/${treatmentId}`);
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching treatment steps:', error);
        return [];
    }
}
export const fetchDoctor = async () => {
    try {
        const response = await axiosInstance.get(`/doctor`);
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching doctors:', error);
        return [];
    }
}
export const fetchDoctorSchedule = async (doctorId: number) => {
    try {
        const response = await axiosInstance.get(`/Schedule/${doctorId}`);
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching doctor schedule:', error);
        return null;
    }
}
export const fetchUserProfile = async (userId: number, isDoctor: boolean) => {
    const body = {
        userId: userId,
        isDoctor: isDoctor
    };
    try{
        const response = await axiosInstance.post(`/User/profile`,body);
        if( response) {
            return response.data;
        }
    }catch (error) {
        console.error('Error fetching user profile:', error);
        return null;
    }
}