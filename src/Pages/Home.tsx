import { Link } from 'react-router-dom';
import '../styles/home.css';
import DoctorImage from '../../public/cute-doctor-women-compassionate-and-skilled-models-for-medical-industry-projects-transparent-background-free-png.png';
import LaboratoryImage from '../../public/Laboratory.png';
import DentalImage from '../../public/Tooth.png';
import DermatologyImgage from '../../public/Dermatology.png';
import SurgeryImage from '../../public/Syringe.png';
export default function Home() {
    return (
        <div className="container-fluid" id="home-main">
            <div className="row">
                <div className="col-md-6">
                    <p>
                        <strong>Book your online appointment online</strong>
                    </p>
                    <p>
                        Get to konw the doctors by having a chat with them
                    </p>
                    <Link to='/doctors'>
                        Find a doctor
                    </Link>
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