import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors = [] } = useContext(AppContext)

  return (
    <div className='py-16 px-4 bg-gray-50'>
      <div className='max-w-7xl mx-auto'>
        {/* Heading */}
        <div className='text-center mb-12'>
          <span className='inline-block bg-indigo-50 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider'>Our Doctors</span>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-3'>Top Doctors to Book</h2>
          <p className='text-gray-500 text-sm max-w-md mx-auto'>Handpicked specialists with proven expertise — ready to care for you.</p>
        </div>

        {/* Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5'>
          {doctors.slice(0, 10).map((item, index) => (
            <div
              key={index}
              onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
              className='bg-white rounded-2xl overflow-hidden cursor-pointer border border-gray-100 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-300 group'
            >
              <div className='bg-gradient-to-br from-indigo-50 to-blue-50 p-4 flex justify-center'>
                <img className='h-36 w-full object-cover object-top rounded-xl' src={item.image} alt={item.name}/>
              </div>
              <div className='p-4'>
                <div className={`flex items-center gap-1.5 text-xs mb-2 ${item.available ? 'text-green-500' : 'text-gray-400'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${item.available ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}/>
                  {item.available ? 'Available' : 'Not Available'}
                </div>
                <p className='text-gray-800 font-semibold text-sm leading-tight'>{item.name}</p>
                <p className='text-primary text-xs mt-1'>{item.speciality}</p>
                <button className='mt-3 w-full text-xs bg-indigo-50 text-primary py-2 rounded-lg font-medium group-hover:bg-primary group-hover:text-white transition-all duration-300'>
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className='text-center mt-12'>
          <button
            onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
            className='inline-flex items-center gap-2 bg-primary text-white px-10 py-3.5 rounded-full text-sm font-medium hover:bg-indigo-600 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300'
          >
            View All Doctors
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default TopDoctors
