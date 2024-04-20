import SpecialityList from "../../src/components/SpecialityList";
import { Link } from "react-router-dom";
import '../styles/Doctors.css';
import DoctorList from "../../src/components/DoctorListComponent";
import { Stack } from '@mui/material';
export default function Doctors() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <div className="list-group">
                        <Link className="list-group-item list-group-item-action" to='#'>Default</Link>
                        <SpecialityList isList={true} isSelect={false} />
                    </div>
                </div>
                <div className="col-md-10">
                    <h2 className="text-center p-3"><small>Find a Doctor</small></h2>
                    <Stack direction="row" spacing={{ md:8, xs:2, sm:3 }}>
                        <DoctorList isGrid={true} />
                    </Stack>
                </div>
            </div>
        </div>
    )
}