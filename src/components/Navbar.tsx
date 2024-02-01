import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link, NavLink } from 'react-router-dom';
import Image from '../../public/Medical-health-logo-design-on-transparent-background-PNG.png';
import '../styles/style.css';
import { useAppSelector } from '../app/hooks.js';
import { RootState } from '../app/store.js';
import { useAppDispatch } from '../app/hooks.js';
import { unAuthenticate } from '../features/authenticater/authSlice.js';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const userId: number = useAppSelector((state: RootState) => state.auth.userId);
    const userName: string = useAppSelector((state: RootState) => state.auth.name);
    const isAuthenticated: Boolean = useAppSelector((state: RootState) => state.auth.isAuthenticated);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleLogout = (e:React.MouseEvent<HTMLAnchorElement>)=>{
        e.preventDefault();
        dispatch(unAuthenticate({
            token:'',
            isAuthenticated:false,
            name:'',
            userId:0
        }))
        navigate('/', {replace:true});
    }
    console.log(isAuthenticated);
    const authNavbar = () => {
        return (
            <ul className="navbar-nav me-auto">
                <li className="nav-item">
                    <NavLink to='/' className='nav-link'>
                        Home
                    </NavLink>
                </li>
                <li className="nav-item">
                    <Link to='/#Services' className='nav-link'>
                        Service
                    </Link>
                </li>
                <li className="nav-item dropdown">
                    <Link to='#' className='nav-link dropdown-toggle' role='button' id='dropdownMenuLink' data-bs-toggle='dropdown' aria-expanded='false'>
                        {userName}
                    </Link>
                    <ul className="dropdown-menu" aria-labelledby='dropdownMenuLink' id='profileMenu'>
                        <li className="dropdown-item">
                            <Link to='#' className='dropdown-item'>
                                History
                            </Link>
                        </li>
                        <li className="dropdown-divi"></li>
                        <li className="dropdown-item">
                            <Link to='#' className="dropdown-item" onClick={(e)=>handleLogout(e)}>
                                Logout
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className="nav-item">
                    <NavLink to='/About-us' className='nav-link'>
                        About us
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to='/Contact' className='nav-link'>
                        Contact Us
                    </NavLink>
                </li>
            </ul>
        )
    }

    const guestNavbar = () => {
        return (
            <>
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <NavLink to='/' className='nav-link'>
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <Link to='/#Services' className='nav-link'>
                            Service
                        </Link>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/About-us' className='nav-link'>
                            About us
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/Contact' className='nav-link'>
                            Contact Us
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
            </>
        )

    }

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
                    {isAuthenticated ? authNavbar(): guestNavbar()}
                </div>
            </div>
        </nav>
    )
}