import { createContext } from "react";
import { useState } from "react";


export const modalActivationContext = createContext<any>(false);


export default function ModalActivationContext({children}:any){
    const [isModalActive, setModalActive] = useState<Boolean>(false);
    return(
        <modalActivationContext.Provider value={{isModalActive, setModalActive}}>
            {children}
        </modalActivationContext.Provider>

    )
}