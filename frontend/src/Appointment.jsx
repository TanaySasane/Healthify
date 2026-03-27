import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from './context/AppContext'
import { assets } from './assets/assets'
import RelatedDoctors from './components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {
  const { docId } = useParams()
  const navigate = useNavigate()
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchDocInfo = () => {
    const doc = doctors.find(d => d._id === docId)
    if (doc) setDocInfo({ ...doc, slots_booked: doc.slots_booked || {} })
  }

  const getAvailableSlots = () => {
    if (!docInfo) return
    setDocSlots([])
    const today = new Date()
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)
      const endTime = new Date(currentDate)
      endTime.setHours(21, 0, 0, 0)
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }
      const timeSlots = []
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        const slotDate = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`
        const isAvailable = !docInfo?.slots_booked?.[slotDate] || !docInfo.slots_booked[slotDate].includes(formattedTime)
        if (isAvailable) timeSlots.push({ datetime: new Date(currentDate), time: formattedTime })
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }
      setDocSlots(prev => [...prev, timeSlots])
    }
  }

  const bookAppointment = async () => {
    if (!token) { toast.warning('Login to book appointment'); return navigate('/login') }
    if (!slotTime) { toast.warning('Please select a time slot'); return }
    setLoading(true)
    const date = docSlots[slotIndex][0].datetime
    const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`
    try {
      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  useEffect(() => { if (doctors.length > 0) fetchDocInfo() }, [doctors, docId])
  useEffect(() => { if (docInfo) getAvailableSlots() }, [docInfo])

  if (!docInfo) return (
    <div className='flex items-center justify-center min-h-[60vh]'>
      <div className='w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin'/>
    </div>
  )

  return (
    <div className='max-w-5xl mx-auto py-8'>

      {/* Doctor Card */}
      <div className='flex flex-col sm:flex-row gap-6 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8'>
        <div className='sm:w-56 bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center p-6'>
          <img className='w-40 h-40 rounded-2xl object-cover' src={docInfo.image} alt={docInfo.name}/>
        </div>
        <div className='flex-1 p-6'>
          <div className='flex items-start justify-between flex-wrap gap-3'>
            <div>
              <div className='flex items-center gap-2'>
                <h1 className='text-2xl font-bold text-gray-800'>{docInfo.name}</h1>
                <img src={assets.verified_icon} className='w-5' alt="verified"/>
              </div>
              <p className='text-primary font-medium mt-1'>{docInfo.speciality}</p>
              <p className='text-gray-500 text-sm mt-0.5'>{docInfo.degree} · {docInfo.experience}</p>
            </div>
            <div className='text-right'>
              <p className='text-xs text-gray-400'>Consultation Fee</p>
              <p className='text-2xl font-bold text-gray-800'>{currencySymbol}{docInfo.fees}</p>
            </div>
          </div>

          <div className='mt-4'>
            <div className='flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2'>
              <img src={assets.info_icon} className='w-4' alt=""/>
              About
            </div>
            <p className='text-sm text-gray-500 leading-6'>{docInfo.about}</p>
          </div>

          <div className='flex items-center gap-2 mt-4'>
            <span className={`flex items-center gap-1.5 text-xs px-3 py-1 rounded-full ${docInfo.available ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${docInfo.available ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}/>
              {docInfo.available ? 'Available Today' : 'Not Available'}
            </span>
            <span className='text-xs text-gray-400 flex items-center gap-1'>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {docInfo.address?.line1}
            </span>
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8'>
        <h2 className='text-lg font-bold text-gray-800 mb-6'>Select Appointment Slot</h2>

        {/* Day selector */}
        <div className='flex gap-3 overflow-x-auto pb-2 mb-6'>
          {docSlots.map((item, index) => (
            <button key={index} onClick={() => { setSlotIndex(index); setSlotTime('') }}
              className={`flex flex-col items-center min-w-[64px] py-3 px-2 rounded-xl transition-all duration-200 flex-shrink-0
                ${slotIndex === index ? 'bg-primary text-white shadow-md shadow-primary/30' : 'border border-gray-200 text-gray-600 hover:border-primary hover:text-primary'}`}>
              <p className='text-xs font-medium'>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p className='text-xl font-bold mt-0.5'>{item[0] && item[0].datetime.getDate()}</p>
              <p className='text-xs mt-0.5 opacity-70'>{item.length} slots</p>
            </button>
          ))}
        </div>

        {/* Time slots */}
        <div className='flex flex-wrap gap-2 mb-6'>
          {docSlots[slotIndex]?.length > 0 ? docSlots[slotIndex].map((item, index) => (
            <button key={index} onClick={() => setSlotTime(item.time)}
              className={`px-4 py-2 rounded-xl text-sm transition-all duration-200
                ${item.time === slotTime ? 'bg-primary text-white shadow-md shadow-primary/30' : 'border border-gray-200 text-gray-600 hover:border-primary hover:text-primary'}`}>
              {item.time.toLowerCase()}
            </button>
          )) : (
            <p className='text-sm text-gray-400'>No slots available for this day</p>
          )}
        </div>

        {/* Book button */}
        <button onClick={bookAppointment} disabled={loading || !slotTime}
          className={`flex items-center gap-2 px-10 py-3.5 rounded-full text-sm font-semibold transition-all duration-200
            ${slotTime ? 'bg-primary text-white hover:bg-indigo-600 hover:shadow-lg hover:shadow-primary/30' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
          {loading ? <span className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'/> : null}
          {loading ? 'Booking...' : 'Book Appointment'}
          {!loading && slotTime && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>}
        </button>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
    </div>
  )
}

export default Appointment
