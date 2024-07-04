import '../styles/dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import DashBoardImage from '../../public/Hospital 3.png';
import DoctorComponent from '../../src/components/DoctorComponents';
import { useAppDispatch, useAppSelector } from '../../src/app/hooks';
import { PageContext } from '../../src/contexts/PageTypeContext';
import { GlobalAppointmentCtx } from '../../src/contexts/AdminRecordsContext';
import { ADMIN } from '../../src/constants/constants';
import { Grid, Button } from '@mui/material';
import Sidebar from '../../src/components/SideBar';
import AppointmentList from '../../src/components/AppointmentList';
import { STATUS_OBJ } from '../../src/constants/constants';
import axios from 'axios';
import AppointmentStats from '../../src/components/AppointmentStats';
import { setPatients } from '../../src/features/patient/patientSlice';



export default function Dashboard() {

    const { page, setPage } = useContext(PageContext);
    const { appointments, setAppointments } = useContext(GlobalAppointmentCtx);
    const { roleType,token } = useAppSelector((state) => state.authReducer);
    const {doctors} = useAppSelector((state)=>state.doctorsReducers);
    const {patients} = useAppSelector((state)=>state.patientsReducer);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (roleType !== ADMIN) {
            navigate('/', { replace: true });
        }
        axios.get('/api/appointments', {
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then((data)=>{
            setAppointments(data.data);
            console.log(appointments);
        })
        .catch((err)=>{
            console.log(err);
        })
        axios.get('/api/patients', {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then((data)=>{
            dispatch(setPatients({patients:data.data}))
        })
        .catch((err)=>{
            console.log(err);
        })
        setPage('Manage Doctors');
    }, [])

    return (
        <Grid container spacing={2}>
            <Grid id='sidebar-item' sx={{ bgcolor: '#6479E9', p: 1 }} item xs={12} sm={4} md={2}>
                <Sidebar items={['Manage Doctors', 'Completed appointments', 'Pending appointments', 'Appointments stats', 'review stats']} />
            </Grid>
            <Grid sx={{ bgcolor: '#D5FEFE', p: 1 }} item xs={12} sm={4} md={10}>
                {page === "Manage Doctors" &&
                    <>
                        <h2 className='text-center'><small>Dashboard</small></h2>
                        <Button onClick={() => navigate('/create-doctor', { replace: true })} className='mb-3' variant='contained' color='primary' >Add A Doctor</Button>
                        <div className='table-responsive'>

                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Speciality</th>
                                        <th>Profile</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <DoctorComponent />
                            </table>

                        </div>
                    </>

                }

                {page === 'Completed appointments' && <>
                    <AppointmentList status={STATUS_OBJ.completed} appointments={appointments} />
                </>}

                {page === 'Pending appointments' && <>
                    <AppointmentList status={STATUS_OBJ.pending} appointments={appointments} />
                </>}

                {page === 'Accepted appointments' && <>
                    <AppointmentList status={STATUS_OBJ.accepted} appointments={appointments} />
                </>}

                {page === 'Cancelled appointments' && <>
                    <AppointmentList status={STATUS_OBJ.cancelled} appointments={appointments} />
                </>}

                {page === 'Appointments stats' && <>
                    <AppointmentStats appointments={appointments} doctors={doctors} patients={patients}/>
                </>}
            </Grid>
        </Grid>
    )
}