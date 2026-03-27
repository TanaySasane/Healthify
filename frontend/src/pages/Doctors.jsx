import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { specialityData } from '../assets/assets'

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const { doctors = [] } = useContext(AppContext)

  useEffect(() => {
    if (!doctors) return
    let filtered = speciality ? doctors.filter(d => d.speciality === speciality) : doctors
    if (search) filtered = filtered.filter(d =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.speciality.toLowerCase().includes(search.toLowerCase())
    )
    setFilterDoc(filtered)
  }, [doctors, speciality, search])

  const handleSpeciality = (s) => {
    speciality === s ? navigate('/doctors') : navigate(`/doctors/${s}`)
    scrollTo(0, 0)
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero bar */}
      <div className='bg-gradient-to-r from-primary to-indigo-600 px-6 md:px-10 py-10'>
        <div className='max-w-7xl mx-auto'>
          <p className='text-white/70 text-sm mb-1'>Healthify</p>
          <h1 className='text-2xl md:text-3xl font-bold text-white mb-6'>Find Your Doctor</h1>
          {/* Search */}
          <div className='relative max-w-xl'>
            <svg className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input
              type="text"
              placeholder="Search doctors, specialities..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className='w-full pl-11 pr-4 py-3.5 rounded-xl text-sm bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50'
            />
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 md:px-10 py-8'>
        {/* Mobile filter toggle */}
        <button
          onClick={() => setShowFilter(!showFilter)}
          className='md:hidden flex items-center gap-2 mb-4 text-sm font-medium text-primary border border-primary px-4 py-2 rounded-full'
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
          {showFilter ? 'Hide Filters' : 'Show Filters'}
        </button>

        <div className='flex flex-col sm:flex-row gap-6'>
          {/* Sidebar filters */}
          <div className={`${showFilter ? 'flex' : 'hidden'} sm:flex flex-col gap-2 w-full sm:w-56 flex-shrink-0`}>
            <p className='text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2'>Speciality</p>
            {specialityData.map((item) => (
              <button
                key={item.speciality}
                onClick={() => handleSpeciality(item.speciality)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left
                  ${speciality === item.speciality
                    ? 'bg-primary text-white shadow-md shadow-primary/30'
                    : 'bg-white text-gray-600 hover:bg-indigo-50 hover:text-primary border border-gray-100'
                  }`}
              >
                <img src={item.image} alt={item.speciality} className={`w-6 h-6 ${speciality === item.speciality ? 'brightness-0 invert' : ''}`}/>
                {item.speciality}
              </button>
            ))}
            {speciality && (
              <button
                onClick={() => navigate('/doctors')}
                className='flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs text-red-400 hover:bg-red-50 transition-colors mt-1'
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Clear filter
              </button>
            )}
          </div>

          {/* Doctors grid */}
          <div className='flex-1'>
            {/* Result count */}
            <div className='flex items-center justify-between mb-5'>
              <p className='text-sm text-gray-500'>
                Showing <span className='font-semibold text-gray-800'>{filterDoc.length}</span> doctor{filterDoc.length !== 1 ? 's' : ''}
                {speciality && <span className='text-primary'> in {speciality}</span>}
              </p>
            </div>

            {filterDoc.length === 0 ? (
              <div className='flex flex-col items-center justify-center py-24 text-gray-400'>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className='mb-4'><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                <p className='text-lg font-medium'>No doctors found</p>
                <p className='text-sm mt-1'>Try a different search or filter</p>
              </div>
            ) : (
              <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {filterDoc.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
                    className='bg-white rounded-2xl overflow-hidden cursor-pointer border border-gray-100 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1.5 transition-all duration-300 group'
                  >
                    <div className='bg-gradient-to-br from-indigo-50 to-blue-50 flex justify-center p-3'>
                      <img className='h-36 w-full object-cover object-top rounded-xl' src={item.image} alt={item.name}/>
                    </div>
                    <div className='p-4'>
                      <div className={`flex items-center gap-1.5 text-xs mb-2 ${item.available ? 'text-green-500' : 'text-gray-400'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${item.available ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}/>
                        {item.available ? 'Available Today' : 'Not Available'}
                      </div>
                      <p className='text-gray-800 font-semibold text-sm'>{item.name}</p>
                      <p className='text-primary text-xs mt-0.5'>{item.speciality}</p>
                      <div className='flex items-center justify-between mt-3'>
                        <span className='text-xs text-gray-500'>{item.experience}</span>
                        <span className='text-xs font-semibold text-gray-700'>₹{item.fees}</span>
                      </div>
                      <button className='mt-3 w-full text-xs bg-indigo-50 text-primary py-2 rounded-lg font-medium group-hover:bg-primary group-hover:text-white transition-all duration-300'>
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Doctors
