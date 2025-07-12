
export type BlogData = {
    blogPostId: number;
    image: string;
    doctorId: number;
    postTitle: string;
    postContent: string;
    createdDate: Date ;
    viewers: number;
    status: string;
}
export type TreatmentData = {
    treatmentId: number;
    treatmentName: string;
    description: string;
    ratingScore: number;
    image: string;
    expertFieldId: number;
    expertField:{
        expertFieldId: number;
        expertFieldName: string;
    }
}
export type TreatementStepData = {
    stepId: number;
    treatmentId: number;
    description: string;
}
export type DoctorData = {
    doctorId: number;
    avatarImage: string;
    fullName: string;
    yearOfBirth: number;
    phoneNumber: string;
    gender: string;
    degree: string;
    address: string
    avarageScore: number;
    status: string;
}
export type ProfileData = {
    patientId: number,
    fullName: string,
    dateOfBirth: string,
    gender: string,
    phoneNumber: string,
    address: string,
}
export type DoctorScheduleData = {
  doctorId: number;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
};
export type BookingTreatmentData = {
    patientId: number;
    doctorId: number;
    treatmentId: number;
    createdDate: string;
}
export type TreatmentBookingData = {
    bookingId: number,
    patientId: number,
    doctorId: number,
    treatmentId: number,
    status: string,
    createdDate: string,
    doctor: DoctorData,
    treatment: TreatmentData,
}
export type StepDetails = {
    stepId: number,
    appointmentId: number,
    description: string,
    status: string,

}
export type PatientAppointment = {
    appointmentId: number,
    bookingId: number,
    date: Date,
    patientId: number,
    status: string,
    note: string,
    stepDetails: StepDetails[]
}
export type DoctorAppointmentData = {
    bookingId: number,
    patientId: number,
    doctorId: number,
    treatmentId: number,
    status: string,
    createdDate: string,
    patient: ProfileData ,
    treatment: TreatmentData,
}
export type StepDetailData = {
    stepId: number,
    appointmentId: number,
    description: string,
    status: string,
    step: StepDetails,
}
export type createBlogData = {
    image: string;
    doctorId: number,
    postTitle: string,
    postContent: string,
    status: string,
}
export type updateBlogData = {
    image: string,
    postTitle: string,
    postContent: string
}
export type createDoctor = {
    email: string,
    password: string,
    confirmPassword: string,
    fullName: string,
    doctorImage: File
    yearOfBirth: number,
    phoneNumber: string,
    gender: string,
    address: string,
    degree: string,
}
export type updateDoctorData = {
    doctorId: number,
    fullName: string,
    yearOfBirth: number,
    phoneNumber: string,
    gender: string,
    address: string,
    degree: string,
}