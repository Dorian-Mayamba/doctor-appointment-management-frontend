import { Link } from 'react-router-dom';
import '../styles/home.css';
import DoctorImage from '../../public/cute-doctor-women-compassionate-and-skilled-models-for-medical-industry-projects-transparent-background-free-png.png';
import LaboratoryImage from '../../public/Laboratory.png';
import DentalImage from '../../public/Tooth.png';
import DermatologyImgage from '../../public/Dermatology.png';
import SurgeryImage from '../../public/Syringe.png';
import { useContext, useEffect, useState } from 'react';
import { messageContext } from '../../src/contexts/FlashMessageContex';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Collapse, Alert } from '@mui/material';
import { ADMIN } from '../../src/constants/constants';
import { useAppSelector } from '../../src/app/hooks';
export default function Home() {

    const { message, setMessage } = useContext(messageContext);
    const [open, setOpen] = useState<Boolean>(false);
    const { roleType } = useAppSelector((state) => state.authReducer)
    useEffect(() => {
        if (message) {
            setOpen(true);
        }
    }, [message])

    return (
        <div className="container-fluid" id="home-main">
            <div className="row">
                {message &&
                    <Collapse in={open as boolean}>
                        <Alert action={
                            <IconButton
                                aria-label='close'
                                color='inherit'
                                size='small'
                                onClick={() => {
                                    setOpen(false);
                                    setMessage(null);
                                }}
                            >
                                <CloseIcon fontSize='inherit' />
                            </IconButton>
                        } sx={{ mb: 2 }} variant='filled' icon={<CheckIcon fontSize="inherit"
                        />} severity="success">
                            {message}
                        </Alert>

                    </Collapse>
                }
                <div className="col-md-6">
                    <p>
                        <strong>Book your online appointment online</strong>
                    </p>
                    <p>
                        Get to konw the doctors by having a chat with them
                    </p>
                    {!(roleType && roleType === ADMIN) && <>
                        <Link to='/doctors'>
                            Find a doctor
                        </Link>
                    </>}

                </div>
                <div className="col-md-6">
                    <img src={DoctorImage} alt="doctor" />
                </div>
            </div>
            <div className="row" id='services'>
                <h4 className='text-center text-light'>
                    <small style={{ fontWeight: 'bold' }}>Our Services</small>
                </h4>
                <div className="col-md-3">
                    <div className="image">
                        <img src={LaboratoryImage} alt="LaboratoryTesting" />
                    </div>
                    <button className="btn btn-lg">Learn more</button>
                </div>
                <div className="col-md-3">
                    <div className="image">
                        <img src={DentalImage} alt="Dental" />
                    </div>
                    <button className="btn btn-lg">Learn more</button>
                </div>
                <div className="col-md-3">
                    <div className="image">
                        <img src={DermatologyImgage} alt="Dermatology" />
                    </div>
                    <button className="btn btn-lg">Learn more</button>
                </div>
                <div className="col-md-3">
                    <div className="image">
                        <img src={SurgeryImage} alt="Surgery" />
                    </div>
                    <button className="btn btn-lg">Learn more</button>
                </div>
            </div>

        </div>
    );
}