import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'

const StatCard = ({ icon, value, label, color }) => (
  <div className='flex items-center gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer'>
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${color}`}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={icon}/>
      </svg>
    </div>
    <div>
      <p className='text-2xl font-bold text-gray-700'>{value}</p>
      <p className='text-gray-400 text-sm'>{label}</p>
    </div>
  </div>
)

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => { if (dToken) getDashData() }, [dToken])

  if (!dashData) return null

  return (
    <div className='m-5 w-full max-w-6xl'>
      <p className='text-xl font-bold text-gray-800 mb-6'>Doctor Dashboard</p>

      {/* Stats */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8'>
        <StatCard icon="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" value={`${currency}${dashData.earnings}`} label="Total Earnings" color="bg-green-500"/>
        <StatCard icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" value={dashData.appointments} label="Appointments" color="bg-primary"/>
        <StatCard icon="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 7a4 4 0 100 8 4 4 0 000-8z" value={dashData.patients} label="Patients" color="bg-purple-500"/>
      </div>

      {/* Latest Bookings */}
      <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
        <div className='flex items-center gap-3 px-6 py-4 border-b border-gray-100'>
          <div className='w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center'>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5F6FFF" strokeWidth="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          </div>
          <p className='font-semibold text-gray-800'>Latest Bookings</p>
        </div>
        <div>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div key={index} className='flex items-center px-6 py-4 gap-4 hover:bg-gray-50 border-b border-gray-50 last:border-0'>
              <div className='w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-primary font-semibold text-sm flex-shrink-0'>
                {item.userData.name?.charAt(0).toUpperCase()}
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-gray-800 font-medium text-sm truncate'>{item.userData.name}</p>
                <p className='text-gray-400 text-xs mt-0.5'>{slotDateFormat(item.slotDate)} · {item.slotTime}</p>
              </div>
              <div className='flex items-center gap-2 flex-shrink-0'>
                <span className={`text-xs px-2 py-0.5 rounded-full ${item.payment ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-500'}`}>
                  {item.payment ? 'Paid' : 'Cash'}
                </span>
                {item.cancelled
                  ? <span className='text-xs px-3 py-1 rounded-full bg-red-50 text-red-500 border border-red-200'>Cancelled</span>
                  : item.isCompleted
                  ? <span className='text-xs px-3 py-1 rounded-full bg-green-50 text-green-600 border border-green-200'>Completed</span>
                  : <div className='flex gap-1.5'>
                      <button onClick={() => completeAppointment(item._id)} className='text-xs text-green-600 border border-green-500 px-2.5 py-1 rounded-full hover:bg-green-500 hover:text-white transition-all'>Done</button>
                      <button onClick={() => cancelAppointment(item._id)} className='text-xs text-red-500 border border-red-400 px-2.5 py-1 rounded-full hover:bg-red-500 hover:text-white transition-all'>Cancel</button>
                    </div>
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard
