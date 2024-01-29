import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import SignUp from './Pages/SignUp';
import Navbar from './components/Navbar';
import SignIn from './Pages/SignIn';
import About from './Pages/About-us';
import Contact from './Pages/Contact';
import Doctors from './Pages/Doctors';

function App() {

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Sign-up' element={<SignUp/>}/>
        <Route path='/Sign-in' element={<SignIn/>}/>
        <Route path='/Doctors' element={<Doctors/>}/>
        <Route path='/About-us' element={<About/>}/>
        <Route path='/Contact' element={<Contact/>}/>
      </Routes>
    </Router>
  )
}

export default App
