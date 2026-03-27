import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const stats = [
  { value: '100+', label: 'Trusted Doctors' },
  { value: '50K+', label: 'Happy Patients' },
  { value: '20+', label: 'Specialities' },
]

const Header = () => {
  const navigate = useNavigate()

  return (
    <div className='relative overflow-hidden bg-gradient-to-br from-primary via-indigo-500 to-purple-600 rounded-2xl mx-4 mt-4'>
      {/* Background blobs */}
      <div className='absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl'/>
      <div className='absolute bottom-0 left-0 w-64 h-64 bg-purple-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl'/>

      <div className='relative flex flex-col md:flex-row items-center px-8 md:px-14 lg:px-20 py-12 md:py-0 gap-8'>

        {/* Left */}
        <div className='md:w-1/2 flex flex-col gap-6 py-10 md:py-16 z-10'>
          <div className='inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-4 py-2 rounded-full w-fit'>
            <span className='w-2 h-2 bg-green-400 rounded-full animate-pulse'/>
            Doctors available now
          </div>

          <h1 className='text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight'>
            Book Appointment <br />
            <span className='text-yellow-300'>With Trusted</span> <br />
            Doctors
          </h1>

          <p className='text-white/80 text-sm md:text-base leading-relaxed max-w-md'>
            Browse our extensive list of trusted specialists and schedule your appointment hassle-free — anytime, anywhere.
          </p>

          <div className='flex items-center gap-4'>
            <div className='flex -space-x-3'>
              <img className='w-10 h-10 rounded-full border-2 border-white object-cover' src={assets.group_profiles} alt="patients"/>
            </div>
            <p className='text-white/80 text-sm'>Joined by <span className='text-white font-semibold'>50,000+</span> patients</p>
          </div>

          <div className='flex flex-wrap gap-3'>
            <a href='#speciality'
              className='flex items-center gap-2 bg-white text-primary px-7 py-3.5 rounded-full text-sm font-semibold hover:shadow-xl hover:shadow-white/20 hover:scale-105 transition-all duration-300'>
              Book Appointment
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <button onClick={() => navigate('/doctors')}
              className='flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border border-white/30 px-7 py-3.5 rounded-full text-sm font-medium hover:bg-white/20 transition-all duration-300'>
              View Doctors
            </button>
          </div>

          {/* Stats */}
          <div className='flex gap-8 pt-4 border-t border-white/20'>
            {stats.map(({ value, label }) => (
              <div key={label}>
                <p className='text-2xl font-bold text-white'>{value}</p>
                <p className='text-white/60 text-xs mt-0.5'>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className='md:w-1/2 flex justify-center md:justify-end relative'>
          <div className='relative'>
            <img className='w-full max-w-sm md:max-w-md lg:max-w-lg md:absolute md:bottom-0 md:right-0 drop-shadow-2xl' src={assets.header_img} alt="Doctor"/>
            {/* Floating card */}
            <div className='hidden md:flex absolute top-16 -left-8 bg-white rounded-2xl shadow-xl p-4 items-center gap-3 w-52'>
              <div className='w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0'>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <div>
                <p className='text-xs text-gray-500'>Appointment</p>
                <p className='text-sm font-semibold text-gray-800'>Confirmed!</p>
              </div>
            </div>
            <div className='hidden md:flex absolute bottom-24 -left-6 bg-white rounded-2xl shadow-xl p-4 items-center gap-3 w-48'>
              <div className='w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0'>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5F6FFF" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
              </div>
              <div>
                <p className='text-xs text-gray-500'>Patients</p>
                <p className='text-sm font-semibold text-gray-800'>50K+ Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
