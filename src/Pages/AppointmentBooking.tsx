import { useParams } from "react-router";
import Paper from '@mui/material/Paper';
import { AppointmentModel, ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    DayView,
    Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';

const currentDate = new Date().toString();
const schedulerDate: AppointmentModel[] = [
    {
        startDate: "2024-02-26T15:00", endDate: "2024-02-26T16:00", title: "Surgery service",
    },

    {
        startDate: "2024-02-28T09:00", endDate: "2024-02-28T10:00", title: "Covid testing",
    }
];


export default function AppointmentBooking() {
    const { doctorId, patientId } = useParams();

    return (
        <Paper>
            <Scheduler
                data={schedulerDate}
            >

                <ViewState
                    currentDate={currentDate}
                />

                <DayView
                    startDayHour={8}
                    endDayHour={17}
                />
                <Appointments/>
            </Scheduler>
        </Paper>
    )
}