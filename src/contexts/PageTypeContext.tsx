import {createContext} from 'react';
import { useState } from 'react';


type page = string | "My Personal information" | "My appointments" | "Completed appointments" | "Pending Appointments" | "Appointment Calendar";

export const PageContext = createContext<{
    page: page,
    setPage: React.Dispatch<React.SetStateAction<page>>
}>({
    page: "My Personal information",
    setPage: () => { }
});

export const PageProvider = ({ children }: { children: React.ReactNode }) => {
    const [page, setPage] = useState<page>('');

    return (
        <PageContext.Provider value={{ page, setPage }}>
            {children}
        </PageContext.Provider>
    );
}