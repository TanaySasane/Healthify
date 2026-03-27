import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const HealthifyLogo = () => (
  <svg width="36" height="36" viewBox="0 0 38 38" fill="none">
    <rect width="38" height="38" rx="10" fill="#5F6FFF"/>
    <path d="M19 8C19 8 10 13.5 10 20.5C10 25.2 14.03 29 19 29C23.97 29 28 25.2 28 20.5C28 13.5 19 8 19 8Z" fill="white" fillOpacity="0.2"/>
    <path d="M15 19H17.5V15H20.5V19H23V21.5H20.5V25.5H17.5V21.5H15V19Z" fill="white"/>
  </svg>
)

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext)
  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const navigate = useNavigate()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const url = state === 'Sign Up' ? '/api/user/register' : '/api/user/login'
      const body = state === 'Sign Up' ? { name, email, password } : { email, password }
      const { data } = await axios.post(backendUrl + url, body)
      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => { if (token) navigate('/') }, [token])

  return (
    <div className='min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4'>
      <div className='w-full max-w-md'>
        {/* Card */}
        <div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-8'>
          {/* Logo */}
          <div className='flex items-center gap-2.5 mb-8'>
            <HealthifyLogo />
            <span className='text-xl font-bold text-gray-800'>Healt<span className='text-primary'>hify</span></span>
          </div>

          <h1 className='text-2xl font-bold text-gray-800 mb-1'>
            {state === 'Sign Up' ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className='text-sm text-gray-500 mb-6'>
            {state === 'Sign Up' ? 'Sign up to book appointments with top doctors' : 'Login to manage your appointments'}
          </p>

          <form onSubmit={onSubmitHandler} className='flex flex-col gap-4'>
            {state === 'Sign Up' && (
              <div>
                <label className='text-sm font-medium text-gray-700 mb-1 block'>Full Name</label>
                <input
                  onChange={e => setName(e.target.value)} value={name}
                  className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all'
                  type="text" placeholder="Tanay Sasane" required
                />
              </div>
            )}
            <div>
              <label className='text-sm font-medium text-gray-700 mb-1 block'>Email</label>
              <input
                onChange={e => setEmail(e.target.value)} value={email}
                className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all'
                type="email" placeholder="you@example.com" required
              />
            </div>
            <div>
              <label className='text-sm font-medium text-gray-700 mb-1 block'>Password</label>
              <div className='relative'>
                <input
                  onChange={e => setPassword(e.target.value)} value={password}
                  className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all pr-12'
                  type={showPass ? 'text' : 'password'} placeholder="••••••••" required
                />
                <button type='button' onClick={() => setShowPass(!showPass)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'>
                  {showPass
                    ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>

            <button type='submit'
              className='w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-indigo-600 hover:shadow-lg hover:shadow-primary/30 transition-all duration-200 mt-2'>
              {state === 'Sign Up' ? 'Create Account' : 'Login'}
            </button>
          </form>

          <p className='text-sm text-center text-gray-500 mt-5'>
            {state === 'Sign Up' ? 'Already have an account? ' : "Don't have an account? "}
            <span onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
              className='text-primary font-medium cursor-pointer hover:underline'>
              {state === 'Sign Up' ? 'Login' : 'Sign Up'}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
