import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)
  const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)
      image && formData.append('image', image)
      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  if (!userData) return null

  return (
    <div className='max-w-2xl mx-auto py-10 px-4'>
      <h1 className='text-2xl font-bold text-gray-800 mb-8'>My Profile</h1>

      <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
        {/* Header */}
        <div className='bg-gradient-to-r from-primary to-indigo-500 px-8 py-8 flex items-center gap-6'>
          <label htmlFor={isEdit ? 'image' : ''} className={`relative flex-shrink-0 ${isEdit ? 'cursor-pointer' : ''}`}>
            <img
              className='w-20 h-20 rounded-full object-cover border-4 border-white shadow-md'
              src={image ? URL.createObjectURL(image) : userData.image}
              alt={userData.name}
            />
            {isEdit && (
              <div className='absolute inset-0 bg-black/40 rounded-full flex items-center justify-center'>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
              </div>
            )}
            <input onChange={e => setImage(e.target.files[0])} type="file" id="image" hidden accept="image/*"/>
          </label>
          <div>
            {isEdit
              ? <input className='bg-white/20 text-white text-xl font-bold rounded-lg px-3 py-1 placeholder-white/60 focus:outline-none focus:bg-white/30 w-full'
                  value={userData.name} onChange={e => setUserData(p => ({ ...p, name: e.target.value }))} />
              : <p className='text-white text-xl font-bold'>{userData.name}</p>
            }
            <p className='text-white/70 text-sm mt-1'>{userData.email}</p>
          </div>
        </div>

        {/* Body */}
        <div className='p-8 flex flex-col gap-6'>
          {/* Contact */}
          <div>
            <p className='text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4'>Contact Information</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <p className='text-xs text-gray-500 mb-1'>Email</p>
                <p className='text-sm text-primary font-medium'>{userData.email}</p>
              </div>
              <div>
                <p className='text-xs text-gray-500 mb-1'>Phone</p>
                {isEdit
                  ? <input className='w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30'
                      value={userData.phone} onChange={e => setUserData(p => ({ ...p, phone: e.target.value }))} />
                  : <p className='text-sm text-gray-700'>{userData.phone}</p>
                }
              </div>
              <div className='sm:col-span-2'>
                <p className='text-xs text-gray-500 mb-1'>Address</p>
                {isEdit
                  ? <div className='flex flex-col gap-2'>
                      <input className='w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30'
                        value={userData.address?.line1 || ''} placeholder='Line 1'
                        onChange={e => setUserData(p => ({ ...p, address: { ...p.address, line1: e.target.value } }))} />
                      <input className='w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30'
                        value={userData.address?.line2 || ''} placeholder='Line 2'
                        onChange={e => setUserData(p => ({ ...p, address: { ...p.address, line2: e.target.value } }))} />
                    </div>
                  : <p className='text-sm text-gray-700'>{userData.address?.line1}{userData.address?.line2 ? `, ${userData.address.line2}` : ''}</p>
                }
              </div>
            </div>
          </div>

          <hr className='border-gray-100'/>

          {/* Basic Info */}
          <div>
            <p className='text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4'>Basic Information</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <p className='text-xs text-gray-500 mb-1'>Gender</p>
                {isEdit
                  ? <select className='w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30'
                      value={userData.gender} onChange={e => setUserData(p => ({ ...p, gender: e.target.value }))}>
                      <option value="Not Selected">Not Selected</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  : <p className='text-sm text-gray-700'>{userData.gender}</p>
                }
              </div>
              <div>
                <p className='text-xs text-gray-500 mb-1'>Date of Birth</p>
                {isEdit
                  ? <input type='date' className='w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30'
                      value={userData.dob} onChange={e => setUserData(p => ({ ...p, dob: e.target.value }))} />
                  : <p className='text-sm text-gray-700'>{userData.dob}</p>
                }
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className='flex gap-3 pt-2'>
            {isEdit ? (
              <>
                <button onClick={updateUserProfileData}
                  className='flex-1 bg-primary text-white py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-600 transition-colors'>
                  Save Changes
                </button>
                <button onClick={() => { setIsEdit(false); setImage(false) }}
                  className='px-6 py-2.5 rounded-xl text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors'>
                  Cancel
                </button>
              </>
            ) : (
              <button onClick={() => setIsEdit(true)}
                className='flex items-center gap-2 bg-indigo-50 text-primary px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-primary hover:text-white transition-all'>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
