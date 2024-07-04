import { createContext,useState } from "react";

export const GlobalAppointmentCtx = createContext<any>(null);

function AdminRecords({children}:any){
    const [appointments,setAppointments] = useState([]);

    

    return (
        <GlobalAppointmentCtx.Provider value={{appointments,setAppointments}}>
            {children}
        </GlobalAppointmentCtx.Provider>
    )
}

export default AdminRecords;