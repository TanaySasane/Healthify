import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [loading, setLoading] = useState(false)

  const { backendUrl, aToken } = useContext(AdminContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (!docImg) return toast.error('Please upload a doctor photo')
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

      const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, { headers: { aToken } })
      if (data.success) {
        toast.success(data.message)
        setDocImg(false); setName(''); setPassword(''); setEmail('')
        setAddress1(''); setAddress2(''); setDegree(''); setAbout(''); setFees('')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    setLoading(false)
  }

  const inputCls = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all'
  const labelCls = 'text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block'

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full max-w-4xl'>
      <p className='text-xl font-bold text-gray-800 mb-6'>Add New Doctor</p>

      <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-8'>
        {/* Photo Upload */}
        <div className='flex items-center gap-5 mb-8 pb-8 border-b border-gray-100'>
          <label htmlFor="doc-img" className='cursor-pointer group'>
            <div className='w-24 h-24 rounded-2xl bg-indigo-50 border-2 border-dashed border-indigo-200 flex items-center justify-center overflow-hidden group-hover:border-primary transition-colors'>
              {docImg
                ? <img src={URL.createObjectURL(docImg)} className='w-full h-full object-cover rounded-2xl' alt=""/>
                : <div className='text-center'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5F6FFF" strokeWidth="2" className='mx-auto mb-1'><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                    <p className='text-xs text-primary'>Upload</p>
                  </div>
              }
            </div>
          </label>
          <input onChange={e => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden accept="image/*"/>
          <div>
            <p className='font-semibold text-gray-800'>Doctor Photo</p>
            <p className='text-sm text-gray-400 mt-1'>Upload a clear profile photo</p>
            <p className='text-xs text-gray-300 mt-0.5'>JPG, PNG up to 5MB</p>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Left */}
          <div className='flex flex-col gap-4'>
            <div>
              <label className={labelCls}>Full Name</label>
              <input onChange={e => setName(e.target.value)} value={name} className={inputCls} type="text" placeholder='Dr. Arjun Sharma' required/>
            </div>
            <div>
              <label className={labelCls}>Email Address</label>
              <input onChange={e => setEmail(e.target.value)} value={email} className={inputCls} type="email" placeholder='doctor@healthify.in' required/>
            </div>
            <div>
              <label className={labelCls}>Password</label>
              <input onChange={e => setPassword(e.target.value)} value={password} className={inputCls} type="password" placeholder='Min 8 characters' required/>
            </div>
            <div>
              <label className={labelCls}>Experience</label>
              <select onChange={e => setExperience(e.target.value)} value={experience} className={inputCls}>
                {['1 Year','2 Year','3 Year','4 Year','5 Year','6 Year','7 Year','8 Year','9 Year','10 Year'].map(y => (
                  <option key={y} value={y}>{y}{y !== '10 Year' ? '' : '+'}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Consultation Fees (₹)</label>
              <input onChange={e => setFees(e.target.value)} value={fees} className={inputCls} type="number" placeholder='500' required/>
            </div>
          </div>

          {/* Right */}
          <div className='flex flex-col gap-4'>
            <div>
              <label className={labelCls}>Speciality</label>
              <select onChange={e => setSpeciality(e.target.value)} value={speciality} className={inputCls}>
                {['General physician','Gynecologist','Dermatologist','Pediatricians','Neurologist','Gastroenterologist'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Degree / Qualification</label>
              <input onChange={e => setDegree(e.target.value)} value={degree} className={inputCls} type="text" placeholder='MBBS, MD' required/>
            </div>
            <div>
              <label className={labelCls}>Clinic Address</label>
              <input onChange={e => setAddress1(e.target.value)} value={address1} className={`${inputCls} mb-2`} type="text" placeholder='Address Line 1' required/>
              <input onChange={e => setAddress2(e.target.value)} value={address2} className={inputCls} type="text" placeholder='City, State, PIN' required/>
            </div>
          </div>
        </div>

        {/* About */}
        <div className='mt-6'>
          <label className={labelCls}>About Doctor</label>
          <textarea onChange={e => setAbout(e.target.value)} value={about} className={`${inputCls} resize-none`} rows={4} placeholder='Brief description about the doctor, expertise, and experience...' required/>
        </div>

        <button type='submit' disabled={loading}
          className='mt-6 flex items-center gap-2 bg-primary text-white px-10 py-3 rounded-full font-medium hover:bg-indigo-600 hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-60'>
          {loading && <span className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'/>}
          {loading ? 'Adding...' : 'Add Doctor'}
        </button>
      </div>
    </form>
  )
}

export default AddDoctor
