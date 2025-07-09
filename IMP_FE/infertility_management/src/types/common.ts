import exp from "constants";

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
    avarageScore: number;
    status: string;
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
