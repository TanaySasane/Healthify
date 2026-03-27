import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext)
  const [search, setSearch] = useState('')
  const [filterSpec, setFilterSpec] = useState('All')

  useEffect(() => { if (aToken) getAllDoctors() }, [aToken])

  const specialities = ['All', ...new Set(doctors.map(d => d.speciality))]

  const filtered = doctors.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.speciality.toLowerCase().includes(search.toLowerCase())
    const matchSpec = filterSpec === 'All' || d.speciality === filterSpec
    return matchSearch && matchSpec
  })

  return (
    <div className='w-full max-w-6xl m-5'>
      <div className='flex items-center justify-between mb-5 flex-wrap gap-3'>
        <p className='text-lg font-medium'>Doctors List <span className='text-sm text-gray-400 font-normal'>({doctors.length} total)</span></p>
        <div className='flex gap-2 flex-wrap'>
          <div className='relative'>
            <svg className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input value={search} onChange={e => setSearch(e.target.value)}
              className='pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30'
              placeholder='Search doctors...' />
          </div>
          <select value={filterSpec} onChange={e => setFilterSpec(e.target.value)}
            className='px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white'>
            {specialities.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className='bg-white border rounded-xl overflow-hidden'>
        <div className='hidden sm:grid grid-cols-[2.5fr_1.5fr_1fr_1fr_1fr_1fr] py-3 px-6 border-b bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider'>
          <p>Doctor</p>
          <p>Speciality</p>
          <p>Degree</p>
          <p>Experience</p>
          <p>Fees</p>
          <p>Available</p>
        </div>

        <div className='max-h-[70vh] overflow-y-auto'>
          {filtered.length === 0 ? (
            <div className='text-center py-16 text-gray-400'>
              <svg className='w-10 h-10 mx-auto mb-3 opacity-40' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
              <p>No doctors found</p>
            </div>
          ) : filtered.map((item, index) => (
            <div key={index} className='grid grid-cols-[2.5fr_1.5fr_1fr_1fr_1fr_1fr] items-center py-3 px-6 border-b hover:bg-gray-50 text-sm text-gray-600'>
              <div className='flex items-center gap-3'>
                <img src={item.image} className='w-10 h-10 rounded-full object-cover bg-indigo-50 flex-shrink-0' alt={item.name}/>
                <div>
                  <p className='font-medium text-gray-800'>{item.name}</p>
                  <p className='text-xs text-gray-400 truncate max-w-[160px]'>{item.email}</p>
                </div>
              </div>
              <span className='text-xs bg-indigo-50 text-primary px-2 py-1 rounded-full w-fit'>{item.speciality}</span>
              <p className='text-xs'>{item.degree}</p>
              <p className='text-xs'>{item.experience}</p>
              <p className='text-xs font-semibold text-gray-700'>₹{item.fees}</p>
              <div className='flex items-center gap-2'>
                <label className='relative inline-flex items-center cursor-pointer'>
                  <input type='checkbox' checked={item.available} onChange={() => changeAvailability(item._id)} className='sr-only peer'/>
                  <div className='w-9 h-5 bg-gray-200 peer-checked:bg-primary rounded-full peer transition-colors duration-200 after:content-[""] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4'></div>
                </label>
                <span className={`text-xs ${item.available ? 'text-green-500' : 'text-gray-400'}`}>
                  {item.available ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DoctorsList
