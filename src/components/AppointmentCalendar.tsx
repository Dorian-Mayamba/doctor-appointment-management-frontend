import { AppointmentModel, ViewState } from '@devexpress/dx-react-scheduler';
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
import {Paper} from '@mui/material';
import { useState } from 'react';

interface AppointmentCalendarProps {
    appointments: AppointmentModel[];
}

const AppointmentCalendar = ({ appointments }:AppointmentCalendarProps) => {
    const [startDayHour] = useState<number>(8);
    const [endDayHour] = useState<number>(21);
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    return (
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
    );
}