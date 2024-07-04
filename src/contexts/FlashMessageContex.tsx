import { createContext } from "react";
import { useState } from "react";


export const messageContext = createContext<any>(null);

export default function MessageContext({children}:any){
    const [message, setMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    return(
        <messageContext.Provider value={{ message, setMessage, errorMessage, setErrorMessage }}>
            {children}
        </messageContext.Provider>
    )
}