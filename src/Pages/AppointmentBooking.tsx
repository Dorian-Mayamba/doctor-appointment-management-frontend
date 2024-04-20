import { useParams } from "react-router";
import Paper from '@mui/material/Paper';
import { AppointmentModel, ViewState } from '@devexpress/dx-react-scheduler';
import { appointmentsContext } from "../../src/contexts/AppointmentsContext";
import { useContext } from "react";
import {
    Scheduler,
    WeekView,
    DayView,
    MonthView,
    Appointments,
    Toolbar,
    ViewSwitcher,
    DateNavigator,
    TodayButton
} from '@devexpress/dx-react-scheduler-material-ui';
import { useEffect, useState } from "react";
import '../styles/appointments.css'
import { CustomAppointmentModel, DoctorData } from "../../src/types/types";
import axios from "axios";
import Modal from "react-modal";
import AppointmentBookingForm from "../../src/components/AppointmentBookingForm";
import { RootState } from "../../src/app/store";
import { useAppSelector } from "../../src/app/hooks";


export default function AppointmentBooking() {
    const { doctorId, patientId } = useParams();
    const [isModalActive, setModalActive] = useState<boolean>(false);
    const [doctor, setDoctor] = useState<DoctorData | null>(null);
    const [startDayHour] = useState<number>(8);
    const [endDayHour] = useState<number>(21);
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const {appointments, setAppointments} = useContext(appointmentsContext);
    const token = useAppSelector((state:RootState)=>state.token);
    Modal.setAppElement('#root');
    let getDoctor = async (): Promise<void> => {
        try {
            let data = await axios.get(`/api/doctor/${doctorId}`, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            setDoctor(data.data);
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
    useEffect(() => {
        getDoctor();
    }, [])

    const toggleModal = () => {
        setModalActive((isModalActive) => !isModalActive);
        console.log(isModalActive);
    }

    const modalElement = () => <AppointmentBookingForm appointments={appointments} getDoctor={getDoctor} doctorId={parseInt(doctorId as string)} patientId={parseInt(patientId as string)} closeModal={toggleModal} />

    return (
        <div className="appointment-container mx-4">
            <div className="appointment-title-container pb-3">
                <button className="btn btn-lg btn-primary" onClick={toggleModal}>Book an appointment</button>
                <h2><small>{doctor && `${doctor.doctorName}`}'s appointments</small></h2>
            </div>
            <Modal
                isOpen={isModalActive}
                closeTimeoutMS={400}
                contentLabel="Book An appointment"
                contentElement={modalElement}
            />




            <Paper>
                <Scheduler
                    data={appointments}
                >

                    <ViewState
                        defaultCurrentDate={currentDate}
                        defaultCurrentViewName="Week"
                        onCurrentDateChange={setCurrentDate}
                    />

                    <WeekView
                        startDayHour={startDayHour}
                        endDayHour={endDayHour}
                    />
                    <DayView
                        startDayHour={startDayHour}
                        endDayHour={endDayHour}
                    />
                    <MonthView
                    />
                    <Toolbar />
                    <ViewSwitcher />
                    <DateNavigator />
                    <TodayButton />
                    <Appointments />
                </Scheduler>
            </Paper>
        </div>

    )
}