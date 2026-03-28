import React, { useContext } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate, useLocation } from 'react-router-dom'

const HealthifyLogo = () => (
  <svg width="32" height="32" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="38" height="38" rx="10" fill="#5F6FFF"/>
    <path d="M19 8C19 8 10 13.5 10 20.5C10 25.2 14.03 29 19 29C23.97 29 28 25.2 28 20.5C28 13.5 19 8 19 8Z" fill="white" fillOpacity="0.2"/>
    <path d="M15 19H17.5V15H20.5V19H23V21.5H20.5V25.5H17.5V21.5H15V19Z" fill="white"/>
  </svg>
)

const Navbar = () => {
  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)
  const navigate = useNavigate()
  const location = useLocation()

  const logout = () => {
    navigate('/')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  const isOnDashboard =
    location.pathname === '/admin-dashboard' ||
    location.pathname === '/doctor-dashboard'

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-3'>
        <div onClick={() => navigate('/')} className='flex items-center gap-2 cursor-pointer'>
          <HealthifyLogo />
          <span className='text-lg font-bold text-gray-800'>Healt<span className='text-primary'>hify</span></span>
        </div>
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600 text-xs'>
          {aToken ? 'Admin' : 'Doctor'}
        </p>
        {isOnDashboard && (
          <button
            onClick={() => window.open('https://healthify-4adnx0g89-tanaysasanes-projects.vercel.app', '_blank')}
            className='text-white bg-primary hover:bg-gray-700 px-3 py-1.5 rounded-full text-xs'>
            User Panel
          </button>
        )}
      </div>
      <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full'>
        Logout
      </button>
    </div>
  )
}

export default Navbar
