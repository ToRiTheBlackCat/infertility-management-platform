
import axiosInstance from "../config/axios";
import { BookingTreatmentData, createBlogData, CreateBookingTreatmentData, createDoctor, createTreatmentData, DoctorScheduleData, updateBlogData, updateDoctorData, updateTreatmentData } from "../types/common";

export const fetchProfile = async (userId: number, isDoctor: boolean) => {
    const body = { userId, isDoctor }
    try {
        const response = await axiosInstance.post(`/User/profile`, body);
        if (response) {
            return response.data
        }
    } catch (error) {
        console.log(error);
        return;
    }
}

//manager treatment
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
    try {
        const response = await axiosInstance.get(`/Treatment/${id}`);
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching treatment by ID:', error);
        return null;
    }
}
export const createTreatment = async (data: createTreatmentData) => {
    const formData = new FormData();
    formData.append("TreatmentName", data.treatmentName);
    formData.append("Description", data.description);
    formData.append("TreatmentImage", data.treatmentImage);
    if (data.expertFieldId !== undefined) {
        formData.append("ExpertFieldId", data.expertFieldId.toString());
    }

    try {
        const response = await axiosInstance.post("/Treatment", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.status;
    } catch (error) {
        console.error("Error creating treatment:", error);
        return null;
    }
};
export const updateTreatment = async (data: updateTreatmentData, treatmentId: number) =>{
    try{
        const response = await axiosInstance.put(`/Treatment/${treatmentId}`,data)
        if(response){
            return response.status
        }
    }catch (error) {
        console.error("Error creating treatment:", error);
        return null;
    }
}
export const deleteTreatment = async (treatmentId: number) => {
    try{
        const response = await axiosInstance.delete(`/Treatment/${treatmentId}`)
        if(response){
            return response.status
        }
    }catch (error) {
        console.error("Error creating treatment:", error);
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

//doctor schedule
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
export const createDoctorSchedule = async (doctorId: number, body: DoctorScheduleData)=>{
    try{
        const response = await axiosInstance.post(`/Schedule/${doctorId}`,body);
        if(response){
            return response.status
        }
    }catch(error){
        console.error('Error fetching doctor schedule:', error);
        return null;
    }
}
export const updateDoctorSchedule = async (doctorId: number, body: DoctorScheduleData) => {
    try{
        const response = await axiosInstance.put(`/Schedule/${doctorId}`,body);
        if(response){
            return response.status
        }
    }catch(error){
        console.error('Error fetching doctor schedule:', error);
        return null;
    }
}
export const deleteDoctorSchedule = async (doctorId: number) => {
    try{
        const response = await axiosInstance.delete(`/Schedule/${doctorId}`)
        if(response){
            return response.status
        }
    }catch(error){
        console.error('Error fetching doctor schedule:', error);
        return null;
    }
}
export const fetchUserProfile = async (userId: number, isDoctor: boolean) => {
    const body = {
        userId: userId,
        isDoctor: isDoctor
    };
    try {
        const response = await axiosInstance.post(`/User/profile`, body);
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return null;
    }
}
export const createBookingTreatment = async (bookingData: CreateBookingTreatmentData) => {
    try {
        const response = await axiosInstance.post(`/TreatmentBooking/create`, bookingData);
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.error('Error creating booking treatment:', error);
        return null;
    }
}
export const fetchPatientTreatmentBooking = async (patientId: number) => {
    try {
        const response = await axiosInstance.get(`/TreatmentBooking/patient-treatments/${patientId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching patient treatment booking:', error);
        return null;
    }
};
export const fetchPatientAppointment = async (bookingId: number) => {
    try {
        const response = await axiosInstance.get(`/Appointment/patient-appointment/${bookingId}`)
        return response.data;
    } catch (error) {
        console.error('Error fetching patient treatment booking:', error);
        return null;
    }
}
export const fetchDoctorTreatmentBooking = async (doctorId: number) => {
    try {
        const response = await axiosInstance.get(`/TreatmentBooking/doctor-treatments/${doctorId}`)
        return response.data;
    } catch (error) {
        console.error('Error fetching patient treatment booking:', error);
        return null;
    }
}
export const fetchDoctorAppointmentDetail = async (bookingId: number) => {
    try {
        const response = await axiosInstance.get(`/Appointment/doctor-appointment/${bookingId}`)
        return response.data;
    } catch (error) {
        console.error(error);
        return null
    }
}
export const createDoctorAppointment = async (bookingId: number, date: Date, patientId: number, doctorId: number, note: string) => {
    const body = {
        bookingId,
        date,
        patientId,
        doctorId,
        note
    }
    try {
        const response = await axiosInstance.post(`/Appointment/doctor-appointment`, body)
        if (response.status === 200) {
            return response.status;
        }
    } catch (error) {
        console.error(error);
        return null
    }
}
export const fetchAppointment = async (appointmentId: number) => {
    try {
        const resposne = await axiosInstance.get(`/Appointment/${appointmentId}`)
        if (resposne) {
            return resposne.data;
        }
    } catch (error) {
        console.error(error);
        return null
    }
}
export const fetchAppointmentStepDetail = async (appointmentId: number) => {
    try {
        const response = await axiosInstance.get(`/StepDetail/${appointmentId}`)
        if (response) {
            return response.data
        }
    } catch (error) {
        console.error(error)
        return null
    }
}
export const createDoctorAppointmentStepDetails = async (appointmentId: number, stepId: number, description: string, doctorId: number) => {
    try {
        const body = {
            stepId,
            description,
            doctorId,
        }
        console.log(body)
        const response = await axiosInstance.post(`/StepDetail/doctor/${appointmentId}`, body)
        if (response.status === 200) {
            return response.status
        }
    } catch (error) {
        console.error(error)
        return null
    }
}
export const updateDoctorAppointmentStepDetails = async (appointmentId: number, stepId: number, description: string, doctorId: number) => {
    try {
        const body = {
            stepId,
            description,
            doctorId,
        }
        console.log(body)
        const response = await axiosInstance.put(`/StepDetail/doctor/${appointmentId}`, body)
        if (response.status === 200) {
            return response.status
        }
    } catch (error) {
        console.error(error)
        return null
    }
}
export const deleteDoctorAppointmentStepDetails = async (
    appointmentId: number,
    stepId: number,
    doctorId: number
) => {
    try {
        const body = {
            stepId: stepId,
            doctorId: doctorId
        };

        const response = await axiosInstance.delete(`/StepDetail/doctor/${appointmentId}`, {
            data: body
        });

        if (response.status === 200) {
            return response.status;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const editStatusStepDetail = async (appointmentId: number, stepId: number, doctorId: number) => {
    try {
        const body = {
            stepId,
            doctorId
        }
        const resposne = await axiosInstance.put(`/StepDetail/doctor/done/${appointmentId}`, body)
        if (resposne.status === 200) {
            return resposne.status
        }
    } catch (error) {
        console.error(error)
        return null
    }
}
export const editDoctorAppointment = async (appointmentId: number, date: Date, note: string, doctorId: number) => {
    try {
        const body = {
            date,
            note,
            doctorId
        }
        const response = await axiosInstance.put(`/Appointment/doctor-appointment/${appointmentId}`, body)
        if (response.status === 200) {
            return response.status
        }
    } catch (error) {
        console.error(error)
        return null
    }
}
export const deleteDoctorAppointment = async (appointmentId: number, doctorId: number) => {
    try {
        const response = await axiosInstance.delete(`/Appointment/doctor-appointment/${appointmentId}`, {
            data: doctorId
        })
        if (response.status === 200) {
            return response.status
        }
    } catch (error) {
        console.error(error)
        return null
    }
}
export const finishDoctorAppointment = async (appointmentId: number, doctorId: number) => {
    try {
        const response = await axiosInstance.put(`/Appointment/doctor-appointment/done/${appointmentId}`, { doctorId })
        if (response.status === 200) {
            return response.status
        }
    } catch (error) {
        console.error(error)
        return null
    }
}
export const createTreatmentRecord = async (bookingId: number, doctorId: number) => {
    try {
        const response = await axiosInstance.post(`/TreatmentRecord/${bookingId}`, { doctorId })
        if (response.status === 200) {
            return response.status
        }
    } catch (error) {
        console.error(error)
        return null
    }
}
export const doneBooking = async (bookingId: number) => {
    try {
        const response = await axiosInstance.post(`/TreatmentBooking/done/${bookingId}`)
        if (response) {
            return response;
        }
    } catch (error) {
        console.error(error)
        return null
    }
}
export const cancelBooking = async (bookingId: number) => {
    try {
        const response = await axiosInstance.post(`/TreatmentBooking/cancel/${bookingId}`)
        if (response.status) {
            return response.status;
        }
    } catch (error) {
        console.error(error)
        return null
    }
}
export const createFeedback = async (bookingId: number, patientId: number, treatmentId: number, treatmentScore: number, doctorScore: number, treatmentComment: string, createdDate: Date) => {
    try {
        const body = {
            patientId,
            bookingId,
            treatmentId,
            treatmentScore,
            doctorScore,
            treatmentComment,
            createdDate
        }
        const response = await axiosInstance.post(`/Feedback/${bookingId}`, body)
        if (response) {
            return response
        }
    } catch (error) {
        console.error(error)
        return null
    }
}

//blog

export const createBlog = async (body: createBlogData) => {
    try {
        const response = await axiosInstance.post(`/Blog`, body)
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.error(error)
        return null
    }
}
export const updateBlog = async (body: updateBlogData, blogId: number) => {
    try {
        const response = await axiosInstance.put(`/Blog/${blogId}`, body)
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.error(error)
        return null
    }
}
export const deleteBlog = async (blogId: number) => {
    try {
        const response = await axiosInstance.delete(`/Blog${blogId}`)
        if (response) {
            return response;
        }
    } catch (error) {
        console.error(error)
        return null
    }
}
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
export const fetchBlogById = async (blogId: number) => {
    try {
        const response = await axiosInstance.get(`/Blog/${blogId}`);
        if (response) {
            return response.data
        }
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return [];
    }
}
export const createDoctorManager = async (body: createDoctor) => {
    try {
        const formData = new FormData();
        formData.append("Email", body.email);
        formData.append("Password", body.password);
        formData.append("ConfirmPassword", body.confirmPassword);
        formData.append("FullName", body.fullName);
        if (body.doctorImage) {
            formData.append("DoctorImage", body.doctorImage);
        }
        formData.append("YearOfBirth", body.yearOfBirth.toString());
        formData.append("PhoneNumber", body.phoneNumber)
        formData.append("Gender", body.gender);
        formData.append("Address", body.address);
        formData.append("Degree", body.degree);
        const response = await axiosInstance.post(`/User/register-doctor`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.error('Error creating conjunction:', error);
        return null;
    }
}
export const updateDoctorManager = async (body: updateDoctorData) => {
    try {
        const response = await axiosInstance.put(`/User/doctor/update-profile`, body);
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.error('Error creating conjunction:', error);
        return null;
    }
}

//expert-field
export const fetchExpertField = async () => {
    try {
        const response = await axiosInstance.get(`/ExpertField`)
        if (response) {
            return response.data
        }
    } catch (error) {
        console.error('Error creating conjunction:', error);
        return null;
    }
}
export const createExpertField = async (expertFieldName: string) => {
    try {
        const response = await axiosInstance.post(`/ExpertField`, null, {
            params: {
                expertFieldName
            }
        })
        if (response) {
            return response.data
        }
    } catch (error) {
        console.error('Error creating conjunction:', error);
        return null;
    }
}
export const updateExpertField = async (expertId: number, name: string) => {
    try {
        const response = await axiosInstance.put(`/ExpertField/${expertId}`, null, {
            params: {
                name
            }
        })
        if (response) {
            return response.data
        }
    } catch (error) {
        console.error('Error creating conjunction:', error);
        return null;
    }
}
export const deleteExpertField = async (id: number) => {
    try{
        const response = await axiosInstance.delete(`/ExpertField/${id}`)
        if(response){
            return response.data
        }
    }catch (error) {
        console.error('Error creating conjunction:', error);
        return null;
    }
}

//doctorExpertField 
export const getDoctorExpertField = async (doctorId: number) =>{
    try{
        const response = await axiosInstance.get(`/DoctorExpertField/${doctorId}`)
        if(response){
            return response.data
        }
    }catch (error) {
        console.error('Error creating conjunction:', error);
        return null;
    }
}
export const createDoctorExpertField = async (doctorId: number, expertFieldId: number) =>{
    try{
        const response = await axiosInstance.post(`/DoctorExpertField`,{
            doctorId,
            expertFieldId: expertFieldId
        })
        if(response){
            return response.data
        }
    }catch (error) {
        console.error('Error creating conjunction:', error);
        return null;
    }
}
export const adminTreatmentBooking = async (pageNum?: number, pageSize?: number) => {
    try{
        const response = await axiosInstance.get(`/Admin/TreatmentBooking`, {
            params: {
                pageNum,
                pageSize
            }
        });
        if(response){
            return response.data
        }
    }catch (error) {
        console.error('Error creating conjunction:', error);
        return null;
    }
}
export const fetchTreatmentRecord = async (startDate?: string, endDate?: string, pageSize?: number, pageNumber?: number) =>{
    try{
        const response = await axiosInstance.get(`/TreatmentRecord`,{
            params:{
                StartDate: startDate,
                EndDate: endDate,
                PageSize: pageSize,
                PageNumber: pageNumber
            }
        })
        if(response){
            return response.data
        }
    }catch (error) {
        console.error('Error creating conjunction:', error);
        return null;
    }
}