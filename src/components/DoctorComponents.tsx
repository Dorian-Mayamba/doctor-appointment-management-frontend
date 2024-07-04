import DoctorList from "./DoctorListComponent";
import { useAppSelector } from "../../src/app/hooks";
export default function DoctorComponent(){
    const token = useAppSelector(state=>state.authReducer.token);
    return (
        <tbody>
            <DoctorList token={token} isTable={true}/>
        </tbody>
    )
}