import { Link } from "react-router-dom";
import '../styles/ManageDoctor.css';
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import axios from "axios";
import $ from 'jquery';
import { useAppSelector } from "../../src/app/hooks";
import SpecialityList from "./SpecialityList";
import { successResponse, DoctorData } from "../../src/types/types";
interface DoctorFormStates {
    isEdit?: Boolean;
    isAdd?: Boolean;
    doctorId?: number
}

interface DoctorSchemaProps {
    doctorName: string;
    doctorEmail: string;
    doctorSpeciality: string;
    doctorNumber:string;
}

const doctorSchema: yup.ObjectSchema<DoctorSchemaProps> = yup
    .object({
        doctorName: yup.string().required("Please enter a doctor name"),
        doctorEmail: yup.string().required("Please enter a doctor email").email("Please input a valid email").matches(/^[a-z].+@doctor.ac.uk$/i, { message: "Please enter a valid doctor email", excludeEmptyString: true, name: "Match doctor email" }),
        doctorSpeciality: yup.string().required("Please choose a doctor speciality"),
        doctorNumber:yup.string().required("please enter your number"),
    });

export default function ManageDoctorForm({ isEdit, isAdd, doctorId }: DoctorFormStates) {
    const [success, setSuccess] = useState<successResponse | null>(null);
    const token = useAppSelector((state) => state.token);
    const [doctor, setDoctor] = useState<DoctorData>({
        doctorEmail: '',
        doctorName: '',
        doctorSpeciality: '',
        doctorId: 0,
        appointments:[],
        averageRating:0,
        ratings:[],
        reviews:[],
    });
    const {
        register,
        setValue,
        handleSubmit,
        clearErrors,
        formState: { errors },
    } = useForm<DoctorSchemaProps>({
        resolver: yupResolver(doctorSchema),
        defaultValues:async ()=>{
            if(doctorId){
                let data = await axios.get(`/api/doctor/${doctorId}`);
                return data.data;
            }
        }
    });

    useEffect(() => {
        var errorTimer = setTimeout(() => {
            $('.text-danger').fadeOut('slow', () => {
                if (errors.doctorEmail) {
                    console.log("clearing the errors");
                    clearErrors("doctorName");
                    clearErrors("doctorEmail");
                    clearErrors("doctorSpeciality");
                    clearErrors("doctorNumber");
                }
            })
        }, 5000);

        var successTimer = setTimeout(() => {
            $('.text-success').fadeOut('slow', () => {
                if (success) {
                    console.log('clearing the success object');
                    setSuccess(null);
                }
            })
        }, 5000)

        return () => {
            clearTimeout(errorTimer);
            clearTimeout(successTimer);
        }
    }, [errors.doctorEmail, errors.doctorName, errors.doctorSpeciality,errors.doctorNumber, success])

    const onSubmit = handleSubmit(async (data) => {
        console.log("submitted");
        const url = $('#ManageDoctorForm').attr('action') as string;
        if (isAdd) {
            try {
                let response = await axios.post(url, data, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setSuccess(response);
            } catch (err) {
                console.log(err);
            }
        } else if (isEdit && doctorId) {
            //ToDo implement edit doctor feature
            try {
                let updateDoctorResponse = await axios.patch(`/api/auth/admin/doctor/edit/${doctorId}`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setSuccess(updateDoctorResponse);
                console.log(success);
            } catch (err) {
                console.log(err);
            }
        }
    }, (err) => {
        console.log(err);
    })

    return (
        <div className="container-fluid" id="ManageDoctorBox">
            <form onSubmit={onSubmit} action={isEdit && (doctorId && doctorId > 0) ? `api/auth/admin/doctor/edit/${doctorId}` : 'api/auth/admin/doctor/create'} method="post" id="ManageDoctorForm">
                {success && <p><strong className="text-success">{success.data.message}</strong></p>}
                {isAdd &&
                    <>
                        <h2><small>Add a Doctor</small></h2>
                        <div className="form-group">
                            <input {...register("doctorName")} className="form-control" type="text" placeholder="Doctor Name" onChange={(e) => setValue("doctorName", e.target.value)} />
                            {errors.doctorName && <p><strong className="text-danger">{errors.doctorName.message}</strong></p>}
                        </div>
                        <div className="form-group">
                            <input {...register("doctorEmail")} type="email" className="form-control" placeholder="Doctor email" onChange={(e) => setValue("doctorEmail", e.target.value)} />
                            {errors.doctorEmail && <p><strong className="text-danger">{errors.doctorEmail.message}</strong></p>}
                        </div>
                        <div className="form-group">
                            <select {...register("doctorSpeciality")} className="form-control form-select" placeholder="Doctor Speciality" onChange={(e) => setValue("doctorSpeciality", e.target.value)}>
                                <option value="">Doctor Speciality</option>
                                <SpecialityList isSelect={true} isList={false} />
                            </select>
                            {errors.doctorSpeciality && <p><strong className="text-danger">{errors.doctorSpeciality.message}</strong></p>}
                        </div>
                        <div className="form-group">
                            <input {...register("doctorNumber")} type="text" className="form-control" placeholder="doctor number"/>
                            {errors.doctorNumber && <p><strong className="text-danger">{errors.doctorNumber.message}</strong></p>}
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Save Doctor" className="form-control btn btn-lg btn-success" />
                        </div>
                        <div className="form-group">
                            <Link to='/Dashboard' className="btn btn-lg btn-danger form-control">Back To Dashboard</Link>
                        </div>
                    </>
                }
                {isEdit &&
                    <>
                        <h2><small>Edit a Doctor</small></h2>
                        <div className="form-group">
                            <input {...register("doctorName")} className="form-control" type="text" placeholder="Doctor Name" onChange={(e) => setValue("doctorName", e.target.value)} />
                            {errors.doctorName && <p><strong className="text-danger">{errors.doctorName.message}</strong></p>}
                        </div>
                        <div className="form-group">
                            <input {...register("doctorEmail")} type="email" className="form-control" placeholder="Doctor email" onChange={(e) => setValue("doctorEmail", e.target.value)} />
                            {errors.doctorEmail && <p><strong className="text-danger">{errors.doctorEmail.message}</strong></p>}
                        </div>
                        <div className="form-group">
                            <select {...register("doctorSpeciality")} className="form-control form-select" placeholder="Doctor Speciality" onChange={(e) => setValue("doctorSpeciality", e.target.value)}>
                                <SpecialityList isSelect={true} isList={false} speciality={doctor.doctorSpeciality}/>
                            </select>
                            {errors.doctorSpeciality && <p><strong className="text-danger">{errors.doctorSpeciality.message}</strong></p>}
                        </div>
                        <div className="form-group">
                            <input {...register("doctorNumber")} type="text" className="form-control" placeholder="doctor number"/>
                            {errors.doctorNumber && <p><strong className="text-danger">{errors.doctorNumber.message}</strong></p>}
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Save changes" className="form-control btn btn-lg btn-warning" />
                        </div>
                        <div className="form-group">
                            <Link to='/Dashboard' className="btn btn-lg btn-danger form-control">Back To Dashboard</Link>
                        </div>
                    </>}
            </form>
        </div>
    )
}