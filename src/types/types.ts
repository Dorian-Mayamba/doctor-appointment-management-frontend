import { AppointmentModel } from "@devexpress/dx-react-scheduler";

export type FormProps= {
    url: string;
    method:string;
    isLogin:Boolean;
    isRegister:Boolean;
};

export type RegisterType = {
    name:string;
    email:string;
    number:string;
    password:string;
    passwordConfirm:string;
}

export type LoginType = {
    email:string;
    password:string;
}

export type ResponseDataType = {
    data:ResponseDataContentType;
}

export type ResponseDataContentType = {
    accessToken:string;
    currentUserName:string;
    id:number;
    email:string;
    roleType:string;
    number:string;
    userProfile:string;
    message?:string;
    appointments?:AppointmentResponseModel[];
    reviews?:ReviewData[];
    ratings?:RatingData[];
}

export type successResponse = {
    data:SuccessResponseData;
}

export type DoctorsResponse = {
    data:DoctorData[]
}

export type DoctorResponse = {
    data:DoctorData;
}

export type DoctorData = {
    doctorName?:string;
    doctorEmail?:string;
    doctorId?:number;
    doctorNumber:string;
    doctorSpeciality?:string;
    doctorProfile?:string;
    appointments:AppointmentResponseModel[];
    ratings:number;
    reviews:ReviewData[];
    averageRating:number;
}

export type PatientsResponse = {
    data:PatientData[];
}

export type PatientResponse = {
    data:PatientData;
}

export type PatientData = {
    patientName?:string;
    patientEmail?:string;
    patientId?:number;
    patientProfile:string;
    patientNumber:'';
    appointments:AppointmentResponseModel[];
    reviews:ReviewData[];
    ratings:number;
}

export type RatingData = {
    rating:number;
    patientName:string;
    patientProfile:string;
}

export type ReviewData = {
    content:string;
    patientName:string;
    patientProfile:string;
    rating:number;
    averageRating:number;
}

export interface CustomAppointmentModel {
    title?:string;
    date?:string;
    startTime?:string;
    endTime?:string;
}

export interface AppointmentResponseModel extends CustomAppointmentModel{
    id:number;
    patientName:string;
    patientEmail:string;
    patientPicture:string;
    doctorName:string;
    doctorEmail:string;
    doctorPicture:string;
    status:string;
}

export interface AppointmentCompositeProps{
    appointmentComposite:GlobalAppointmentResponseModel;
}

export interface GlobalAppointmentResponseModel{
    patients:number;
    doctorName:string;
    status:string;
    doctorProfile:string;
    date:string;
    time:string;
    service:string;
}

export type SuccessResponseData = {
    message:string;
}

export type ErrorResponse = {
    data:ErrorResponseData
}

export type ErrorResponseData = {
    message:string
}