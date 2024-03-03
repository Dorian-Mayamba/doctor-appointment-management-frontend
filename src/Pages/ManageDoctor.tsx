import ManageDoctorForm from '../components/ManageDoctorForm';
import { useParams } from 'react-router';

interface ManageDoctorProps{
    isEdit?:boolean;
}

export default function ManageDoctor({isEdit}:ManageDoctorProps){
    const {doctorId} = useParams();

    return (
        doctorId ? <ManageDoctorForm isEdit={isEdit} doctorId={parseInt(doctorId)}/>
            : <ManageDoctorForm isAdd={true}/>
    )
}