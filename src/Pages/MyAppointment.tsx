import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../src/app/hooks";
import { RootState } from "../../src/app/store";
import axios from "axios";
import { unAuthenticate } from "../../src/features/authenticater/authSlice";

export function MyAppointment(){
    const {patientId} = useParams();
    const token = useAppSelector((state:RootState)=>state.token);
    const [appointments, setAppointments] = useState<any>([]);
    const dispatch = useAppDispatch();
    const navigate =useNavigate();
    useEffect(()=>{
        const loadAppointments = async ()=> {
            try{
                let data = await axios.get(`/api/patients/${patientId}/appointments`, {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                setAppointments(data.data);
            }catch(err){
                dispatch(unAuthenticate({
                    isAuthenticated:false,
                    name:'',
                    roleType:'',
                    token:'',
                    userId:0
                }))
                navigate('/', {replace:true});
            }
        }

        loadAppointments();
            
    }, []);

    return (
        <div className="container-fluid">
            <h1>My Appointments</h1>
        </div>
    )

}