import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const statusConfig = {
  completed: { label: 'Completed', cls: 'bg-green-50 text-green-600 border-green-200' },
  cancelled: { label: 'Cancelled', cls: 'bg-red-50 text-red-500 border-red-200' },
  paid: { label: 'Paid · Upcoming', cls: 'bg-blue-50 text-blue-600 border-blue-200' },
  ongoing: { label: 'Ongoing', cls: 'bg-yellow-50 text-yellow-600 border-yellow-200' },
  pending: { label: 'Pending Payment', cls: 'bg-orange-50 text-orange-500 border-orange-200' },
}

const getStatus = (item) => {
  if (item.cancelled) return 'cancelled'
  if (item.isCompleted) return 'completed'
  if (item.payment) return 'paid'
  return 'pending'
}

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState([])
  const [payment, setPayment] = useState('')
  const [activeTab, setActiveTab] = useState('upcoming')

  const months = [" ", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotDateFormat = (slotDate) => {
    const [day, month, year] = slotDate.split('_')
    return `${day} ${months[Number(month)]} ${year}`
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      setAppointments(data.appointments.reverse())
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + '/api/user/verifyRazorpay', response, { headers: { token } })
          if (data.success) { navigate('/my-appointments'); getUserAppointments() }
        } catch (error) { toast.error(error.message) }
      }
    }
    new window.Razorpay(options).open()
  }

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
      if (data.success) initPay(data.order)
      else toast.error(data.message)
    } catch (error) { toast.error(error.message) }
  }

  useEffect(() => {
    if (token) getUserAppointments()
  }, [token])

  const upcoming = appointments.filter(a => !a.cancelled && !a.isCompleted)
  const completed = appointments.filter(a => a.isCompleted)
  const cancelled = appointments.filter(a => a.cancelled)

  const tabs = [
    { key: 'upcoming', label: 'Upcoming', count: upcoming.length },
    { key: 'completed', label: 'Completed', count: completed.length },
    { key: 'cancelled', label: 'Cancelled', count: cancelled.length },
  ]

  const displayed = activeTab === 'upcoming' ? upcoming : activeTab === 'completed' ? completed : cancelled

  return (
    <div className='max-w-4xl mx-auto py-8 px-4'>
      <h1 className='text-2xl font-bold text-gray-800 mb-6'>My Appointments</h1>

      {/* Tabs */}
      <div className='flex gap-2 mb-6 border-b border-gray-200'>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2.5 text-sm font-medium transition-all border-b-2 -mb-px
              ${activeTab === tab.key ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            {tab.label}
            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${activeTab === tab.key ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {displayed.length === 0 ? (
        <div className='text-center py-16 text-gray-400'>
          <svg className='w-12 h-12 mx-auto mb-3 opacity-40' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          <p className='text-lg font-medium'>No {activeTab} appointments</p>
        </div>
      ) : (
        <div className='flex flex-col gap-4'>
          {displayed.map((item, index) => {
            const status = getStatus(item)
            const { label, cls } = statusConfig[status]
            return (
              <div key={index} className='bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col sm:flex-row gap-5'>
                {/* Doctor image */}
                <div className='flex-shrink-0'>
                  <img className='w-20 h-20 rounded-xl object-cover bg-indigo-50' src={item.docData.image} alt={item.docData.name}/>
                </div>

                {/* Info */}
                <div className='flex-1'>
                  <div className='flex items-start justify-between gap-2 flex-wrap'>
                    <div>
                      <p className='text-gray-800 font-semibold text-base'>{item.docData.name}</p>
                      <p className='text-primary text-sm'>{item.docData.speciality}</p>
                    </div>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full border ${cls}`}>{label}</span>
                  </div>

                  <div className='mt-3 flex flex-wrap gap-4 text-sm text-gray-500'>
                    <div className='flex items-center gap-1.5'>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                      {slotDateFormat(item.slotDate)}
                    </div>
                    <div className='flex items-center gap-1.5'>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                      {item.slotTime}
                    </div>
                    <div className='flex items-center gap-1.5'>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {item.docData.address?.line1}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {activeTab === 'upcoming' && (
                  <div className='flex flex-col gap-2 justify-center min-w-[140px]'>
                    {!item.payment && payment !== item._id &&
                      <button onClick={() => setPayment(item._id)} className='text-sm bg-primary text-white px-4 py-2 rounded-xl hover:bg-indigo-600 transition-colors'>
                        Pay Online
                      </button>
                    }
                    {!item.payment && payment === item._id &&
                      <button onClick={() => appointmentRazorpay(item._id)} className='flex items-center justify-center border px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors'>
                        <img className='h-5' src={assets.razorpay_logo} alt="Razorpay"/>
                      </button>
                    }
                    {item.payment &&
                      <span className='text-sm text-center bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-medium'>Paid ✓</span>
                    }
                    <button onClick={() => cancelAppointment(item._id)} className='text-sm text-red-500 border border-red-200 px-4 py-2 rounded-xl hover:bg-red-50 transition-colors'>
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default MyAppointments
