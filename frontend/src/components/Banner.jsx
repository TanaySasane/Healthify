import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const features = [
  { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', text: 'Verified Doctors' },
  { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', text: 'Instant Booking' },
  { icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z', text: 'Secure Payments' },
]

const Banner = () => {
  const navigate = useNavigate()

  return (
    <div className='relative overflow-hidden bg-gradient-to-br from-primary via-indigo-500 to-purple-600 rounded-2xl mx-4 my-20'>
      {/* Blobs */}
      <div className='absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl'/>
      <div className='absolute bottom-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full translate-y-1/2 translate-x-1/2 blur-3xl'/>

      <div className='relative flex flex-col md:flex-row items-center px-8 md:px-14 lg:px-20 py-14 gap-10'>

        {/* Left */}
        <div className='flex-1 z-10'>
          <span className='inline-block bg-white/20 text-white text-xs font-medium px-4 py-1.5 rounded-full mb-6'>
            🏥 Join Healthify Today
          </span>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4'>
            Book Appointment <br />
            With <span className='text-yellow-300'>100+ Trusted</span> <br />
            Doctors
          </h2>
          <p className='text-white/70 text-sm mb-8 max-w-sm'>
            Create your free account and get access to top specialists, instant booking, and smart health reminders.
          </p>

          <div className='flex flex-wrap gap-3 mb-8'>
            {features.map(({ icon, text }) => (
              <div key={text} className='flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-xs px-4 py-2 rounded-full'>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={icon}/>
                </svg>
                {text}
              </div>
            ))}
          </div>

          <div className='flex flex-wrap gap-3'>
            <button
              onClick={() => { navigate('/login'); scrollTo(0, 0) }}
              className='flex items-center gap-2 bg-white text-primary px-8 py-3.5 rounded-full text-sm font-semibold hover:shadow-xl hover:shadow-white/20 hover:scale-105 transition-all duration-300'
            >
              Create Free Account
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button
              onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
              className='flex items-center gap-2 bg-white/10 border border-white/30 text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-white/20 transition-all duration-300'
            >
              Browse Doctors
            </button>
          </div>
        </div>

        {/* Right */}
        <div className='hidden md:block md:w-[340px] lg:w-[400px] relative flex-shrink-0'>
          <img className='w-full drop-shadow-2xl' src={assets.appointment_img} alt="appointment"/>
        </div>
      </div>
    </div>
  )
}

export default Banner
