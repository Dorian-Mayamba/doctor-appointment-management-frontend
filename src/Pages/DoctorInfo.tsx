import { useParams } from "react-router";
import axios from 'axios';
import { DoctorData } from "../../src/types/types";
import { useState, useEffect, useContext } from "react";
import { appointmentsContext } from "../../src/contexts/AppointmentsContext";
import { modalActivationContext } from "../../src/contexts/ModalActivationContext";
import { messageContext } from "../../src/contexts/FlashMessageContex";
import DoctorCard from "../../src/components/DoctorCardComponent";
import Sidebar from "../../src/components/SideBar";
import { Grid} from "@mui/material";
import { CustomAppointmentModel } from "../../src/types/types";
import { AppointmentModel } from "@devexpress/dx-react-scheduler";
import { useAppDispatch, useAppSelector } from "../../src/app/hooks";
import { RootState } from "../../src/app/store";
import Modal from "react-modal";
import AppointmentBookingForm from "../../src/components/AppointmentBookingForm";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton,Collapse,Alert } from '@mui/material';
import { setDoctors,setDoctor as updateDoctor } from "../../src/features/doctor/doctorSlice";

interface DoctorInfoProps {
    isAdmin: boolean
}

export default function DoctorInfo({isAdmin}:DoctorInfoProps) {
    const { doctorId } = useParams();
    const [doctor, setDoctor] = useState<DoctorData>();
    const {appointments, setAppointments} = useContext(appointmentsContext);
    const {message, setMessage} = useContext(messageContext);
    const [open, setOpen] = useState<Boolean>(false);
    const {token, userId} = useAppSelector((state:RootState)=>state.authReducer);
    const dispatch = useAppDispatch();
    Modal.setAppElement('#root');
    let getDoctor = async (): Promise<void> => {
        try {
            let data = await axios.get(`/api/doctor/${doctorId}`, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            setAppointments(data.data.appointments.map(({ title, date, endTime, startTime }: CustomAppointmentModel) => {
                return {
                    title: title,
                    startDate: `${date}T${startTime}`,
                    endDate: `${date}T${endTime}`
                } as AppointmentModel
            }));
        } catch (err) {
            console.log(token);
            console.log(err);
        }
    }

    const loadDoctor = async (doctorId: string | number | undefined) => {
        try {
            let response = await axios.get(`/api/doctor/${doctorId}`);
            let data = await response.data;
            setDoctor(data);
            dispatch((updateDoctor({...data})))
        } catch (err) {
            alert("an error has occured");
            console.log(err);
        }
    }


    useEffect(() => {
        loadDoctor(doctorId);
    }, [])

    const {isModalActive,setModalActive} = useContext(modalActivationContext)

    const toggleModal = () => {
        setModalActive(!isModalActive);
    }
    

    const modalElement = () => <AppointmentBookingForm getDoctor={getDoctor} doctorId={parseInt(doctorId as string)} patientId={userId} closeModal={toggleModal} />


    return (
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
            {message &&
                    <Collapse in={open as boolean}>
                        <Alert action={
                            <IconButton
                                aria-label='close'
                                color='inherit'
                                size='small'
                                onClick={() => {
                                    setOpen(false);
                                    setMessage(null);
                                }}
                            >
                                <CloseIcon fontSize='inherit' />
                            </IconButton>
                        } sx={{ mb:2 }} variant='filled' icon={<CheckIcon fontSize="inherit"
                        />} severity="success">
                           {message}
                        </Alert>

                    </Collapse>
                }
            <Grid sx={{ bgcolor: '#6479E9', p:1 }} item xs={12} sm={4} md={2}>
                <Sidebar items={['doctor_information']}/>
            </Grid>
            <Grid sx={{ bgcolor: '#D5FEFE' }} item xs={12} sm={8} md={10}>
            <Modal
                isOpen={isModalActive}
                closeTimeoutMS={400}
                contentLabel="Book An appointment"
                contentElement={modalElement}
            />
            {doctor && <>
                <DoctorCard
                    doctorId={parseInt(doctorId as string)}
                    doctorName={doctor.doctorName}
                    profilePath={doctor.doctorProfile}
                    doctorSpeciality={doctor.doctorSpeciality}
                    averageRating={doctor.averageRating}
                    ratings={doctor.ratings}
                    reviews={doctor.reviews}
                    appointments={doctor.appointments}
                    isInfo={true}
                    isAdmin={isAdmin}
                    setOpen={setOpen}
                />
            </>}
            </Grid>
        </Grid>
    )


}