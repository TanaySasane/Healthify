import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

// Healthify SVG Logo Symbol
const HealthifyLogo = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="38" height="38" rx="10" fill="#5F6FFF"/>
    <path d="M19 8C19 8 10 13.5 10 20.5C10 25.2 14.03 29 19 29C23.97 29 28 25.2 28 20.5C28 13.5 19 8 19 8Z" fill="white" fillOpacity="0.2"/>
    <path d="M15 19H17.5V15H20.5V19H23V21.5H20.5V25.5H17.5V21.5H15V19Z" fill="white"/>
  </svg>
)

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/doctors', label: 'All Doctors' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <nav className='sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm'>
      <div className='flex items-center justify-between px-6 py-3 max-w-7xl mx-auto'>

        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          className='flex items-center gap-2.5 cursor-pointer group'
        >
          <HealthifyLogo />
          <span className='text-xl font-bold tracking-tight text-gray-800 group-hover:text-primary transition-colors duration-200'>
            Healt<span className='text-primary'>hify</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <ul className='hidden md:flex items-center gap-1 font-medium'>
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-lg text-sm transition-all duration-200 
                  ${isActive
                    ? 'text-primary bg-indigo-50 font-semibold'
                    : 'text-gray-600 hover:text-primary hover:bg-indigo-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <span className='absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full'/>
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className='flex items-center gap-3'>

          {location.pathname === '/' && (
            <button
              onClick={() => window.open('https://healthify-a.vercel.app', '_blank')}
              className='hidden md:flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200'
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              Admin Panel
            </button>
          )}

          {token && userData ? (
            <div className='relative flex items-center gap-2 cursor-pointer group'>
              <img
                className='w-9 h-9 rounded-full object-cover ring-2 ring-primary/30 hover:ring-primary transition-all'
                src={userData.image || '/fallback-user.png'}
                alt="profile"
              />
              <svg className='w-3 text-gray-500 group-hover:text-primary transition-colors' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
              <div className='absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 hidden group-hover:block'>
                <p onClick={() => navigate('my-profile')} className='px-4 py-2.5 text-sm text-gray-600 hover:bg-indigo-50 hover:text-primary cursor-pointer transition-colors'>My Profile</p>
                <p onClick={() => navigate('my-appointments')} className='px-4 py-2.5 text-sm text-gray-600 hover:bg-indigo-50 hover:text-primary cursor-pointer transition-colors'>My Appointments</p>
                <hr className='my-1 border-gray-100'/>
                <p onClick={logout} className='px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 cursor-pointer transition-colors'>Logout</p>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className='hidden md:flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-indigo-600 hover:shadow-lg hover:shadow-primary/30 transition-all duration-200'
            >
              Get Started
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          )}

          {/* Mobile hamburger */}
          <button onClick={() => setShowMenu(true)} className='md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors'>
            <img className='w-5' src={assets.menu_icon} alt="menu" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ${showMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className='absolute inset-0 bg-black/30 backdrop-blur-sm' onClick={() => setShowMenu(false)}/>
        <div className={`absolute right-0 top-0 h-full w-72 bg-white shadow-2xl transition-transform duration-300 ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className='flex items-center justify-between px-6 py-5 border-b border-gray-100'>
            <div className='flex items-center gap-2'>
              <HealthifyLogo />
              <span className='text-lg font-bold text-gray-800'>Healt<span className='text-primary'>hify</span></span>
            </div>
            <button onClick={() => setShowMenu(false)} className='p-2 rounded-lg hover:bg-gray-100'>
              <img src={assets.cross_icon} className='w-5' alt="close" />
            </button>
          </div>
          <ul className='flex flex-col gap-1 p-4 mt-2'>
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setShowMenu(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-sm font-medium transition-all
                  ${isActive ? 'bg-indigo-50 text-primary font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-primary'}`
                }
              >
                {label}
              </NavLink>
            ))}
          </ul>
          <div className='px-4 mt-4'>
            {!token && (
              <button
                onClick={() => { navigate('/login'); setShowMenu(false) }}
                className='w-full bg-primary text-white py-3 rounded-xl text-sm font-medium hover:bg-indigo-600 transition-colors'
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
