import '../styles/dashboard.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DashBoardImage from '../../public/Hospital 3.png';
import DoctorComponent from '../../src/components/DoctorComponents';

interface DashboardSectionState {
    page: "Pending Appointment" | "Completed Appointments" | "Canceled Appointments" | "Manage Doctors" | "Montlhy Banking Statement"
}

interface DoctorResponse {
    doctorId: number;
    doctorName: string;
}

interface DoctorResponseArray {
    data: DoctorResponse[]
}

export default function Dashboard() {

    const [page, setPage] = useState<DashboardSectionState>({
        page: "Manage Doctors"
    });
    const [doctors, setDoctor] = useState<DoctorResponseArray>({
        data: []
    });

    useEffect(() => {

    }, [page.page])

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <div className="list-group-flush">
                        <Link to='#' className="list-group-item list-group-item-action">
                            Pending Appointments
                        </Link>
                        <Link to='#' className="list-group-item list-group-item-action">
                            Completed Appointments
                        </Link>
                        <Link to='#' className="list-group-item list-group-item-action">
                            Canceled Appointments
                        </Link>
                        <Link to='#' className="list-group-item list-group-item-action">
                            Manage Doctors
                        </Link>
                        <Link to='#' className="list-group-item list-group-item-action">
                            Monthly Banking Statement
                        </Link>
                        <img className='img-fluid' src={DashBoardImage} alt="dashobardImage" />
                    </div>
                </div>
                <div className="col-md-9">
                    <h2 className='text-center'><small>Dashboard</small></h2>
                    {page.page === "Manage Doctors" &&
                        <div className='table-responsive'>
                            <Link to='/Create-Doctor' className='btn btn-lg mb-4' id='Add-doctor-btn'>Add a doctor</Link>
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
                    }
                </div>
            </div>
        </div>
    )
}