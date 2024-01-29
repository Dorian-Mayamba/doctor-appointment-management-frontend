import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link,NavLink } from 'react-router-dom';
import Image from '../../public/Medical-health-logo-design-on-transparent-background-PNG.png';
import '../styles/style.css';
export default function Navbar(){

    return (
        <nav className='navbar navbar-expand-sm bg-light navbar-light'>
            <div className='container-fluid'>
                {/* Links */}
                <Link to='/' className="navbar-brand">
                    <img src={Image} alt="logo" />
                </Link>
                <button className="navbar-toggler" type='button' 
                data-bs-toggle='collapse' data-bs-target='#collapsibleNavbar'>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id='collapsibleNavbar'>
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink to='/' className="nav-link">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <Link to='/#services' className="nav-link">
                                Services
                            </Link>
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link' to='/Doctors'>
                                Find a Doctor
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/About-us' className="nav-link">
                                About us
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/contact' className="nav-link">
                                Contact
                            </NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav me-5">
                        <li className="nav-item">
                            <NavLink to='/Sign-up' className="nav-link">
                                Register
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/Sign-in' className="nav-link">
                                Login
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}