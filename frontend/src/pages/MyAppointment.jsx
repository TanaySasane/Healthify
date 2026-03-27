import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const statusConfig = {
  completed: { label: 'Completed', cls: 'bg-green-50 text-green-600 border-green-200' },
  cancelled:  { label: 'Cancelled',  cls: 'bg-red-50 text-red-500 border-red-200' },
  paid:       { label: 'Paid · Ongoing', cls: 'bg-blue-50 text-blue-600 border-blue-200' },
  pending:    { label: 'Pending Payment', cls: 'bg-orange-50 text-orange-500 border-orange-200' },
}

const getStatus = (item) => {
  if (item.cancelled) return 'cancelled'
  if (item.isCompleted) return 'completed'
  if (item.payment) return 'paid'
  return 'pending'
}

// Payment Modal
const PaymentModal = ({ item, onClose, onRazorpay, slotDateFormat }) => (
  <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4'>
    <div className='bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden'>
      {/* Header */}
      <div className='bg-gradient-to-r from-primary to-indigo-600 px-6 py-5 flex items-center justify-between'>
        <div>
          <p className='text-white font-bold text-lg'>Complete Payment</p>
          <p className='text-white/70 text-xs mt-0.5'>Secure online payment</p>
        </div>
        <button onClick={onClose} className='w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors'>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      {/* Appointment Summary */}
      <div className='px-6 py-5 border-b border-gray-100'>
        <p className='text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3'>Appointment Summary</p>
        <div className='flex items-center gap-4'>
          <img className='w-14 h-14 rounded-xl object-cover bg-indigo-50' src={item.docData.image} alt={item.docData.name}/>
          <div className='flex-1'>
            <p className='font-semibold text-gray-800'>{item.docData.name}</p>
            <p className='text-primary text-sm'>{item.docData.speciality}</p>
            <div className='flex gap-3 mt-1 text-xs text-gray-500'>
              <span className='flex items-center gap-1'>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                {slotDateFormat(item.slotDate)}
              </span>
              <span className='flex items-center gap-1'>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                {item.slotTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Amount */}
      <div className='px-6 py-4 bg-gray-50 flex items-center justify-between'>
        <p className='text-sm text-gray-600'>Consultation Fee</p>
        <p className='text-2xl font-bold text-gray-800'>₹{item.amount}</p>
      </div>

      {/* Payment Options */}
      <div className='px-6 py-5'>
        <p className='text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3'>Choose Payment Method</p>

        <button onClick={onRazorpay}
          className='w-full flex items-center justify-between px-5 py-4 rounded-xl border-2 border-primary bg-indigo-50 hover:bg-primary hover:text-white transition-all duration-200 group mb-3'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm'>
              <img src={assets.razorpay_logo} className='h-5' alt="Razorpay"/>
            </div>
            <div className='text-left'>
              <p className='font-semibold text-sm text-gray-800 group-hover:text-white'>Razorpay</p>
              <p className='text-xs text-gray-500 group-hover:text-white/70'>UPI, Cards, Net Banking, Wallets</p>
            </div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className='text-primary group-hover:text-white'><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>

        <div className='flex items-center gap-3 text-xs text-gray-400 mt-4'>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
          256-bit SSL encrypted · 100% secure payment
        </div>
      </div>

      <div className='px-6 pb-5'>
        <button onClick={onClose} className='w-full py-2.5 rounded-xl text-sm text-gray-500 border border-gray-200 hover:bg-gray-50 transition-colors'>
          Pay Later
        </button>
      </div>
    </div>
  </div>
)

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState([])
  const [activeTab, setActiveTab] = useState('upcoming')
  const [payingItem, setPayingItem] = useState(null)

  const months = [" ", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const slotDateFormat = (slotDate) => {
    const [day, month, year] = slotDate.split('_')
    return `${day} ${months[Number(month)]} ${year}`
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      setAppointments(data.appointments.reverse())
    } catch (error) { toast.error(error.message) }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) { toast.success(data.message); getUserAppointments(); getDoctorsData() }
      else toast.error(data.message)
    } catch (error) { toast.error(error.message) }
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Healthify',
      description: 'Appointment Payment',
      image: '',
      order_id: order.id,
      receipt: order.receipt,
      theme: { color: '#5F6FFF' },
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + '/api/user/verifyRazorpay', response, { headers: { token } })
          if (data.success) { setPayingItem(null); getUserAppointments(); toast.success('Payment successful!') }
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

  useEffect(() => { if (token) getUserAppointments() }, [token])

  const upcoming  = appointments.filter(a => !a.cancelled && !a.isCompleted)
  const completed = appointments.filter(a => a.isCompleted)
  const cancelled = appointments.filter(a => a.cancelled)

  const tabs = [
    { key: 'upcoming',  label: 'Ongoing',   count: upcoming.length },
    { key: 'completed', label: 'Completed',  count: completed.length },
    { key: 'cancelled', label: 'Cancelled',  count: cancelled.length },
  ]

  const displayed = activeTab === 'upcoming' ? upcoming : activeTab === 'completed' ? completed : cancelled

  return (
    <div className='max-w-4xl mx-auto py-8 px-4'>
      {/* Payment Modal */}
      {payingItem && (
        <PaymentModal
          item={payingItem}
          slotDateFormat={slotDateFormat}
          onClose={() => setPayingItem(null)}
          onRazorpay={() => { appointmentRazorpay(payingItem._id); setPayingItem(null) }}
        />
      )}

      <h1 className='text-2xl font-bold text-gray-800 mb-6'>My Appointments</h1>

      {/* Tabs */}
      <div className='flex gap-2 mb-6 border-b border-gray-200'>
        {tabs.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2.5 text-sm font-medium transition-all border-b-2 -mb-px
              ${activeTab === tab.key ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
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
          <p className='text-lg font-medium'>No {activeTab === 'upcoming' ? 'ongoing' : activeTab} appointments</p>
        </div>
      ) : (
        <div className='flex flex-col gap-4'>
          {displayed.map((item, index) => {
            const status = getStatus(item)
            const { label, cls } = statusConfig[status]
            return (
              <div key={index} className='bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col sm:flex-row gap-5'>
                <div className='flex-shrink-0'>
                  <img className='w-20 h-20 rounded-xl object-cover bg-indigo-50' src={item.docData.image} alt={item.docData.name}/>
                </div>
                <div className='flex-1'>
                  <div className='flex items-start justify-between gap-2 flex-wrap'>
                    <div>
                      <p className='text-gray-800 font-semibold text-base'>{item.docData.name}</p>
                      <p className='text-primary text-sm'>{item.docData.speciality}</p>
                    </div>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full border ${cls}`}>{label}</span>
                  </div>
                  <div className='mt-3 flex flex-wrap gap-4 text-sm text-gray-500'>
                    <span className='flex items-center gap-1.5'>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                      {slotDateFormat(item.slotDate)}
                    </span>
                    <span className='flex items-center gap-1.5'>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                      {item.slotTime}
                    </span>
                    <span className='flex items-center gap-1.5'>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {item.docData.address?.line1}
                    </span>
                    <span className='flex items-center gap-1.5 font-semibold text-gray-700'>
                      ₹{item.amount}
                    </span>
                  </div>
                </div>

                {activeTab === 'upcoming' && (
                  <div className='flex flex-col gap-2 justify-center min-w-[130px]'>
                    {!item.payment
                      ? <button onClick={() => setPayingItem(item)}
                          className='text-sm bg-primary text-white px-4 py-2.5 rounded-xl hover:bg-indigo-600 hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-1.5'>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                          Pay Now
                        </button>
                      : <span className='text-sm text-center bg-blue-50 text-blue-600 px-4 py-2.5 rounded-xl font-medium flex items-center justify-center gap-1'>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                          Paid
                        </span>
                    }
                    <button onClick={() => cancelAppointment(item._id)}
                      className='text-sm text-red-500 border border-red-200 px-4 py-2.5 rounded-xl hover:bg-red-50 transition-colors'>
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
