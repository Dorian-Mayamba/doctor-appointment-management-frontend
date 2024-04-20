import { AppointmentModel } from "@devexpress/dx-react-scheduler";
import { createContext } from "react";
import { useState } from "react";




export const appointmentsContext= createContext<any>(null);


export default function AppointmentsContext({children}:any){

    const [appointments, setAppointments] = useState<AppointmentModel[] | undefined>([]);

    return (
        <appointmentsContext.Provider value={{ appointments, setAppointments }}>
            {children}
        </appointmentsContext.Provider>
    )
}