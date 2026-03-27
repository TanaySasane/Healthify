import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PatientsList = () => {
  const { aToken, backendUrl } = useContext(AdminContext)
  const [patients, setPatients] = useState([])
  const [search, setSearch] = useState('')
  const [filterGender, setFilterGender] = useState('All')

  const getAllPatients = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/admin/patients', { headers: { aToken } })
      if (data.success) setPatients(data.patients.reverse())
      else toast.error(data.message)
    } catch (error) { toast.error(error.message) }
  }

  useEffect(() => { if (aToken) getAllPatients() }, [aToken])

  const filtered = patients.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
    const matchGender = filterGender === 'All' || p.gender === filterGender
    return matchSearch && matchGender
  })

  return (
    <div className='w-full max-w-6xl m-5'>
      <div className='flex items-center justify-between mb-5 flex-wrap gap-3'>
        <p className='text-lg font-medium'>Patients List <span className='text-sm text-gray-400 font-normal'>({patients.length} total)</span></p>
        <div className='flex gap-2 flex-wrap'>
          <div className='relative'>
            <svg className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input value={search} onChange={e => setSearch(e.target.value)}
              className='pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30'
              placeholder='Search patients...' />
          </div>
          <select value={filterGender} onChange={e => setFilterGender(e.target.value)}
            className='px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white'>
            <option>All</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
      </div>

      <div className='bg-white border rounded-xl overflow-hidden'>
        <div className='hidden sm:grid grid-cols-[2fr_2fr_1fr_1fr_1.5fr_1fr] py-3 px-6 border-b bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider'>
          <p>Patient</p>
          <p>Email</p>
          <p>Phone</p>
          <p>Gender</p>
          <p>Address</p>
          <p>DOB</p>
        </div>

        <div className='max-h-[70vh] overflow-y-auto'>
          {filtered.length === 0 ? (
            <div className='text-center py-16 text-gray-400'>
              <svg className='w-10 h-10 mx-auto mb-3 opacity-40' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
              <p>No patients found</p>
            </div>
          ) : filtered.map((item, index) => (
            <div key={index} className='grid grid-cols-[2fr_2fr_1fr_1fr_1.5fr_1fr] items-center py-3 px-6 border-b hover:bg-gray-50 text-sm text-gray-600'>
              <div className='flex items-center gap-3'>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0 ${item.gender === 'Female' ? 'bg-pink-400' : 'bg-indigo-400'}`}>
                  {item.name.charAt(0).toUpperCase()}
                </div>
                <p className='font-medium text-gray-800 truncate'>{item.name}</p>
              </div>
              <p className='truncate text-xs'>{item.email}</p>
              <p className='text-xs'>{item.phone || '—'}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full w-fit ${item.gender === 'Male' ? 'bg-blue-50 text-blue-600' : item.gender === 'Female' ? 'bg-pink-50 text-pink-600' : 'bg-gray-100 text-gray-500'}`}>
                {item.gender || '—'}
              </span>
              <p className='text-xs truncate'>{item.address?.line1 || '—'}</p>
              <p className='text-xs'>{item.dob || '—'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PatientsList
