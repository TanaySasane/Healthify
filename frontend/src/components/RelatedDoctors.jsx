import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors = [] } = useContext(AppContext)
  const navigate = useNavigate()
  const [relDoc, setRelDoc] = useState([])

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      setRelDoc(doctors.filter(d => d.speciality === speciality && d._id !== docId).slice(0, 4))
    }
  }, [doctors, speciality, docId])

  if (relDoc.length === 0) return null

  return (
    <div className='py-10'>
      <div className='text-center mb-8'>
        <span className='inline-block bg-indigo-50 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider'>Same Speciality</span>
        <h2 className='text-2xl font-bold text-gray-800'>Related Doctors</h2>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
        {relDoc.map((item, index) => (
          <div key={index}
            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
            className='bg-white rounded-2xl overflow-hidden cursor-pointer border border-gray-100 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1.5 transition-all duration-300 group'>
            <div className='bg-gradient-to-br from-indigo-50 to-blue-50 p-4 flex justify-center'>
              <img className='h-28 w-full object-cover object-top rounded-xl' src={item.image} alt={item.name}/>
            </div>
            <div className='p-4'>
              <div className={`flex items-center gap-1.5 text-xs mb-1.5 ${item.available ? 'text-green-500' : 'text-gray-400'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${item.available ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}/>
                {item.available ? 'Available' : 'Not Available'}
              </div>
              <p className='text-gray-800 font-semibold text-sm'>{item.name}</p>
              <p className='text-primary text-xs mt-0.5'>{item.speciality}</p>
              <button className='mt-3 w-full text-xs bg-indigo-50 text-primary py-2 rounded-lg font-medium group-hover:bg-primary group-hover:text-white transition-all duration-300'>
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RelatedDoctors
