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
    roleType:string;
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
    doctorName:string;
    doctorEmail:string;
    doctorId:number;
    doctorSpeciality:string;
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