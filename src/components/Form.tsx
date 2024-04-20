import { FormProps, RegisterType,LoginType, ErrorResponse, ResponseDataType, successResponse } from "../types/types"
import '../styles/form.css';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import axios from "axios";
import { useEffect, useState } from "react";
import $ from 'jquery';
import { useAppDispatch } from "../app/hooks";
import { authenticate } from "../features/authenticater/authSlice";
import { useNavigate } from "react-router";
import Button from '@mui/material/Button';

type FormDataType = RegisterType | LoginType;
const registerSchema: yup.ObjectSchema<FormDataType> = yup
    .object({
        name: yup.string().required("please enter a name"),
        email: yup.string().required("please enter an email").email("please enter a valid email"),
        number: yup.string().required("please enter your number"),
        password: yup.string().required("please enter your password"),
        passwordConfirm: yup.string().required("Please confirm your password").oneOf([yup.ref("password"), ''], "Passwords must match")
    });
const loginSchema:yup.ObjectSchema<FormDataType> = yup
    .object({
        email:yup.string().required("please enter an email").email("please enter a valid email"),
        password:yup.string().required("please enter your password")
    });

export default function Form(props: FormProps) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setValue,
        clearErrors,
        formState: { errors },
    } = useForm<FormDataType>({
        resolver: yupResolver(props.isRegister ? registerSchema : loginSchema)
    });
    const [error, setError] = useState<ErrorResponse | null>(null);
    const [success,setSuccess] = useState<successResponse | null>(null);
    const encodeCredential = (username:string, password:string) =>{
        return btoa(`${username}:${password}`);
    }
    const onSubmit = handleSubmit(async (data: FormDataType) => {
        try {
            if(props.isRegister){
                let responseData: any = await axios.post(props.url, data);
                setSuccess(responseData);
            }else{
                const credentials = encodeCredential(data.email,data.password);
                let responseData:ResponseDataType = await axios.post(props.url, null, {
                    headers:{
                        Authorization:`Basic ${credentials}`
                    }
                });
                dispatch(authenticate({
                    name:responseData.data.currentUserName,
                    userId:responseData.data.id,
                    isAuthenticated:true,
                    token:responseData.data.accessToken,
                    email:responseData.data.email,
                    roleType:responseData.data.roleType
                }))
                navigate('/', {replace:true})
            }
        } catch (err: any) {
            setError(err.response);
            console.log(error);
        }
    }, (err) => console.log(err));
    useEffect(() => {
        const errorFadeOutTime = setTimeout(() => {
            $('.text-danger').fadeOut('slow', () => {
                if (error) {
                    setError(null);
                } else if (errors) {
                    clearErrors("name");
                    clearErrors("email");
                    clearErrors("number");
                    clearErrors("password");
                    clearErrors("passwordConfirm");
                }
            });
        }, 5000)
        const successFadeOutTime = setTimeout(()=>{
            $('.text-success').fadeOut('slow', function(){
                if(success) setSuccess(null);
            })
        },5000)

        return () => {
            clearTimeout(errorFadeOutTime);
            clearTimeout(successFadeOutTime);
        }
    }, [error,success, errors.email, errors.name, errors.password, errors.number, errors.passwordConfirm])

    return props.isRegister ? (
        <div className="container-fluid form-content">
            <div className="row">
                <div className="col-md-6">
                    <form action={props.url} method={props.method} onSubmit={onSubmit}>
                        {error && <p><strong className="text-danger">{error.data.message}</strong></p>}
                        {success && <p><strong className="text-success">{success.data.message}</strong></p>}
                        <h2>Register here</h2>
                        <div className="form-group">
                            <input {...register("name")} type="text" className="form-control" placeholder="enter your name" onChange={(e) => setValue("name" , e.target.value)} />
                            {errors.name && <p><strong className="text-danger">{errors.name.message}</strong></p>}
                        </div>
                        <div className="form-group">
                            <input {...register("email")} type="text" className="form-control" placeholder="enter your email" onChange={(e) => setValue("email", e.target.value)} />
                            {errors.email && <p><strong className="text-danger">{errors.email.message}</strong></p>}
                        </div>
                        <div className="form-group">
                            <input {...register("number")} type="tel" className="form-control" placeholder="enter your number" onChange={(e) => setValue("number", e.target.value)} />
                            {errors.number && <p><strong className="text-danger">{errors.number.message}</strong></p>}
                        </div>
                        <div className="form-group">
                            <input {...register("password")} type="password" className="form-control" placeholder="enter your password" onChange={(e) => setValue("password", e.target.value)} />
                            {errors.password && <p><strong className="text-danger">{errors.password.message}</strong></p>}
                        </div>
                        <div className="form-group">
                            <input {...register("passwordConfirm")} type="password" className="form-control" placeholder="confirm your password" onChange={(e) => setValue("passwordConfirm", e.target.value)} />
                            {errors.passwordConfirm && <p><strong className="text-danger">{errors.passwordConfirm.message}</strong></p>}
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Submit" className="form-control btn btn-custom-primary" />
                        </div>
                    </form>
                </div>
                <div className="col-md-6 img-background"></div>
            </div>
        </div>
    ) : (
        <div className="container-fluid form-content">
            <div className="row">
                <div className="col-md-6">
                    <form action={props.url} method={props.method} onSubmit={onSubmit}>
                    {error?.data.message && <p><strong className="text-danger">{error.data.message}</strong></p>}
                    <h1 className="mb-3"> <small>Sign in to your account</small></h1>
                        <div className="form-group">
                            <input type="text" {...register('email')} className="form-control" placeholder="enter your email" />
                            {errors.email && <p><strong className="text-danger">{errors.email.message}</strong></p>}
                        </div>
                        <div className="form-group">
                            <input type="password" {...register('password')} className="form-control" placeholder="enter your password" />
                            {errors.password && <p><strong className="text-danger">{errors.password.message}</strong></p>}
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Login" className="btn btn-custom-primary form-control" />
                        </div>
                    </form>
                </div>
                <div className="col-md-6 img-background"></div>
            </div>
        </div>
    )
}