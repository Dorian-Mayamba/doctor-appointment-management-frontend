import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import SignUp from './Pages/SignUp';
import Navbar from './components/Navbar';
import SignIn from './Pages/SignIn';
import About from './Pages/About-us';
import Contact from './Pages/Contact';
import Doctors from './Pages/Doctors';
import Dashboard from './Pages/Dashboard';
import ManageDoctor from './Pages/ManageDoctor';
import AppointmentBooking from './Pages/AppointmentBooking';
import AppointmentsContext from './contexts/AppointmentsContext';
import ModalActivationContext from './contexts/ModalActivationContext';
import ChatPanel from './Pages/ChatPanel';
import Profile from './Pages/Profile';
import DoctorInfo from './Pages/DoctorInfo';
import MessageContext from './contexts/FlashMessageContex';
import { useAppSelector } from './app/hooks';
import { ADMIN } from './constants/constants';
import { PageProvider } from './contexts/PageTypeContext';
import AdminRecords from './contexts/AdminRecordsContext';

function App() {

  const { roleType } = useAppSelector((state) => state.authReducer);

  return (

    <Router>
      <MessageContext>
        <Navbar />
        <PageProvider>
          <AppointmentsContext>
            <ModalActivationContext>
              <AdminRecords>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/Sign-up' element={<SignUp />} />
                  <Route path='/Sign-in' element={<SignIn />} />
                  <Route path='/Doctors' element={<Doctors />} />
                  <Route path='/Dashboard' element={<Dashboard />} />
                  <Route path='/Create-Doctor' element={<ManageDoctor />} />
                  <Route path='/doctor/:doctorId' element={<DoctorInfo isAdmin={roleType === ADMIN} />} />
                  <Route path='/doctor/edit/:doctorId' element={<ManageDoctor isEdit={true} />} />
                  <Route path='/appointments/:doctorId/:patientId' element={<AppointmentBooking />} />
                  <Route path='/profile/:userId' element={<Profile />} />
                  <Route path='/panel' element={<ChatPanel />} />
                  <Route path='/About-us' element={<About />} />
                  <Route path='/Contact' element={<Contact />} />
                </Routes>
              </AdminRecords>
            </ModalActivationContext>
          </AppointmentsContext>
        </PageProvider>

      </MessageContext>


    </Router>







  )
}

export default App
