import axios from 'axios'
import React, { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

const HealthifyLogo = () => (
  <svg width="36" height="36" viewBox="0 0 38 38" fill="none">
    <rect width="38" height="38" rx="10" fill="#5F6FFF"/>
    <path d="M19 8C19 8 10 13.5 10 20.5C10 25.2 14.03 29 19 29C23.97 29 28 25.2 28 20.5C28 13.5 19 8 19 8Z" fill="white" fillOpacity="0.2"/>
    <path d="M15 19H17.5V15H20.5V19H23V21.5H20.5V25.5H17.5V21.5H15V19Z" fill="white"/>
  </svg>
)

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'
  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) { setAToken(data.token); localStorage.setItem('aToken', data.token) }
        else toast.error(data.message)
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) { setDToken(data.token); localStorage.setItem('dToken', data.token) }
        else toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
    setLoading(false)
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4'>
      <div className='w-full max-w-md'>
        <div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-8'>
          {/* Logo */}
          <div className='flex items-center gap-2.5 mb-8'>
            <HealthifyLogo />
            <span className='text-xl font-bold text-gray-800'>Healt<span className='text-primary'>hify</span></span>
          </div>

          {/* Tab toggle */}
          <div className='flex bg-gray-100 rounded-xl p-1 mb-6'>
            {['Admin', 'Doctor'].map(tab => (
              <button key={tab} type='button' onClick={() => setState(tab)}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200
                  ${state === tab ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                {tab} Login
              </button>
            ))}
          </div>

          <h2 className='text-xl font-bold text-gray-800 mb-1'>Welcome back</h2>
          <p className='text-sm text-gray-500 mb-6'>Sign in to your {state.toLowerCase()} account</p>

          <form onSubmit={onSubmitHandler} className='flex flex-col gap-4'>
            <div>
              <label className='text-sm font-medium text-gray-700 mb-1 block'>Email</label>
              <input onChange={e => setEmail(e.target.value)} value={email}
                className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all'
                type="email" placeholder={state === 'Admin' ? 'admin@healthify.com' : 'doctor@healthify.in'} required/>
            </div>
            <div>
              <label className='text-sm font-medium text-gray-700 mb-1 block'>Password</label>
              <input onChange={e => setPassword(e.target.value)} value={password}
                className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all'
                type="password" placeholder='••••••••' required/>
            </div>
            <button type='submit' disabled={loading}
              className='w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-indigo-600 hover:shadow-lg hover:shadow-primary/30 transition-all mt-2 flex items-center justify-center gap-2 disabled:opacity-60'>
              {loading && <span className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'/>}
              {loading ? 'Signing in...' : `Login as ${state}`}
            </button>
          </form>

          <div className='mt-5 p-3 bg-gray-50 rounded-xl text-xs text-gray-500'>
            {state === 'Admin'
              ? <><span className='font-medium'>Admin:</span> admin@healthify.com / admin123</>
              : <><span className='font-medium'>Doctor:</span> doctor@healthify.in / doctor123</>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
