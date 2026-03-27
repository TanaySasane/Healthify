import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointment from './pages/MyAppointment'
import Appointment from './Appointment'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <ToastContainer />
      <div className='mx-4 sm:mx-[10%]'>
        <Navbar />
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<div className='mx-4 sm:mx-[10%]'><Doctors /></div>} />
        <Route path='/doctors/:speciality' element={<div className='mx-4 sm:mx-[10%]'><Doctors /></div>} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<div className='mx-4 sm:mx-[10%]'><About /></div>} />
        <Route path='/contact' element={<div className='mx-4 sm:mx-[10%]'><Contact /></div>} />
        <Route path='/my-profile' element={<div className='mx-4 sm:mx-[10%]'><MyProfile /></div>} />
        <Route path='/my-appointments' element={<div className='mx-4 sm:mx-[10%]'><MyAppointment /></div>} />
        <Route path='/appointment/:docId' element={<div className='mx-4 sm:mx-[10%]'><Appointment /></div>} />
        <Route path='/privacy-policy' element={<div className='mx-4 sm:mx-[10%]'><PrivacyPolicy /></div>} />
        <Route path='/terms' element={<div className='mx-4 sm:mx-[10%]'><Terms /></div>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
