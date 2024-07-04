import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import $ from 'jquery';
import { useContext, useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../src/app/hooks";
import { RootState } from "../../src/app/store";
import { modalActivationContext } from "../../src/contexts/ModalActivationContext";
import { messageContext } from "../../src/contexts/FlashMessageContex";
import { PageContext } from "../../src/contexts/PageTypeContext";
import { useNavigate } from "react-router";
import { authenticate } from "../../src/features/authenticater/authSlice";
import { AppointmentResponseModel } from "../../src/types/types";

interface AppointmentFormProps {
    title: string;
    date: string;
}

interface DoctorPatientProps {
    doctorId: number;
    patientId: number;
}

interface ModalFormProps {
    getDoctor: () => void;
    closeModal: () => void;
}

const appointmentSchema: yup.ObjectSchema<AppointmentFormProps> = yup
    .object({
        title: yup.string().required("please enter an appointment title"),
        date: yup.string().required("Please enter an Appointment date"),
    })

export default function AppointmentBookingForm({ doctorId, patientId, getDoctor, closeModal }: DoctorPatientProps & ModalFormProps) {
    const [value, updateValue] = useState<(Dayjs | null) | string>(null);
    const { token, userId,appointments } = useAppSelector((state: RootState) => state.authReducer);
    const state = useAppSelector((state)=>state.authReducer);
    const { doctorSpeciality } = useAppSelector((state: RootState) => state.doctorReducer);
    const {
        register,
        handleSubmit,
        setValue,
        clearErrors,
        formState: { errors },
    } = useForm<AppointmentFormProps>({
        resolver: yupResolver(appointmentSchema),
        defaultValues: {
            title: `${doctorSpeciality} service`
        }
    });
    const { setMessage } = useContext(messageContext);

    const { setModalActive } = useContext(modalActivationContext);
    const { setPage } = useContext(PageContext);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onsubmit = handleSubmit(async (data: AppointmentFormProps) => {
        // send data to server here
        console.log(data);
        const splittedDate = data.date.split('T');
        console.log(splittedDate);
        const date = splittedDate[0];
        const time = splittedDate[1];

        const customData = {
            title: data.title,
            date: date,
            time: time,
        };



        const closeModal = () => {
            setModalActive((isModalActive: any) => !isModalActive);
        }

        try {
            let response = await axios.post(`/api/appointments/${doctorId}/${patientId}`, customData, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            });
            setMessage(response.data.message);
            setPage('My appointments');
            dispatch((authenticate({...state, appointments:[...appointments as AppointmentResponseModel[], {...response.data.appointment}]})))
            navigate(`/profile/${userId}`, { replace: true });

        } catch (err) {
            console.log(err);
        } finally {
            getDoctor();
            closeModal();
        }
    }, (err) => { console.log(err); })

    useEffect(() => {
        const errorFadeOutTime = setTimeout(() => {
            $('.text-danger').fadeOut('slow', () => {
                if (errors) {
                    clearErrors("title");
                    clearErrors("date");
                }
            })
        }, 5000)
        return () => clearTimeout(errorFadeOutTime);
    }, [errors.title, errors.date])

    return (
        <div className="container text-center w-50 bg-primary p-4">
            <h1>Book an appointment</h1>
            <form action="" method="post" onSubmit={onsubmit}>
                <div className="form-group mb-4">
                    <input type="text" {...register("title")} readOnly className="form-control" placeholder="Appointment title" onChange={(e) => setValue("title", e.target.value)} />
                    {errors.title && <p><strong className="text-danger">{errors.title.message}</strong></p>}
                </div>
                <div className="form-group mb-4">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            {...register("date")}
                            className="form-control"
                            renderInput={(params) => <TextField {...params} />}
                            label="Appointment Date & Time"
                            value={value}
                            inputFormat="DD-MM-YYYY HH:mm"
                            onChange={(newValue, keyValue) => {
                                if (!(newValue as Dayjs)?.isValid()) {
                                    if (keyValue != undefined) {
                                        console.log(keyValue);
                                        setValue("date", keyValue);
                                    }

                                } else {
                                    updateValue(newValue);
                                    console.log(newValue);
                                    setValue("date", (newValue as Dayjs)?.format("DD-MM-YYYYTHH:mm") as string)
                                }

                            }}
                            shouldDisableDate={(date) => {
                                return (date as Dayjs).isBefore(Date.now());
                            }}
                        />
                    </LocalizationProvider>
                    {errors.date && <p><strong className="text-danger">{errors.date.message}</strong></p>}
                </div>
                <div className="form-group row">
                    <div className="col-md-4 offset-md-2">
                        <button type="submit" className="btn btn-lg btn-success">Book</button>
                    </div>
                    <div className="col-md-4">
                        <button type="button" onClick={(closeModal)} className="btn btn-lg btn-danger">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    )
}


