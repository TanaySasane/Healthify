import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div id='speciality' className='py-20 px-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Heading */}
        <div className='text-center mb-12'>
          <span className='inline-block bg-indigo-50 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider'>Specialities</span>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-3'>Find by Speciality</h2>
          <p className='text-gray-500 text-sm max-w-md mx-auto'>Browse our extensive list of trusted doctors across all major medical specialities.</p>
        </div>

        {/* Cards */}
        <div className='flex sm:justify-center gap-5 overflow-x-auto pb-4 scrollbar-hide'>
          {specialityData.map((item, index) => (
            <Link
              to={`/doctors/${item.speciality}`}
              onClick={() => scrollTo(0, 0)}
              key={index}
              className='flex flex-col items-center gap-3 flex-shrink-0 group cursor-pointer'
            >
              <div className='w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-indigo-50 flex items-center justify-center group-hover:bg-primary group-hover:shadow-lg group-hover:shadow-primary/30 group-hover:-translate-y-2 transition-all duration-300'>
                <img className='w-12 sm:w-14' src={item.image} alt={item.speciality}/>
              </div>
              <p className='text-xs sm:text-sm text-gray-600 font-medium group-hover:text-primary transition-colors text-center'>{item.speciality}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SpecialityMenu
