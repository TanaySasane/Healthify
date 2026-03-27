import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const stats = [
  { value: '23+', label: 'Expert Doctors' },
  { value: '24+', label: 'Happy Patients' },
  { value: '6', label: 'Specialities' },
  { value: '100%', label: 'Satisfaction' },
]

const whyUs = [
  { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Efficiency', desc: 'Streamlined appointment scheduling that fits into your busy lifestyle — book in under 2 minutes.' },
  { icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M9 7a4 4 0 100 8 4 4 0 000-8z', title: 'Convenience', desc: 'Access a network of trusted healthcare professionals across all major specialities in Pune.' },
  { icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', title: 'Trusted & Verified', desc: 'Every doctor on Healthify is verified, credentialed, and reviewed by real patients.' },
  { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', title: 'Personalization', desc: 'Smart reminders and tailored recommendations to help you stay on top of your health.' },
]

const About = () => {
  const navigate = useNavigate()

  return (
    <div className='pb-20'>
      {/* Hero */}
      <div className='text-center py-14 px-4'>
        <span className='inline-block bg-indigo-50 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider'>About Us</span>
        <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4'>Healthcare Made <span className='text-primary'>Simple</span></h1>
        <p className='text-gray-500 max-w-xl mx-auto text-sm leading-relaxed'>
          Healthify is your trusted partner for effortless healthcare scheduling in Pune. We connect patients with top doctors across all specialities.
        </p>
      </div>

      {/* Story */}
      <div className='max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-12 items-center mb-20'>
        <img className='w-full md:max-w-[420px] rounded-2xl shadow-lg object-cover' src={assets.about_image} alt="About Healthify"/>
        <div className='flex flex-col gap-5 text-gray-600'>
          <h2 className='text-2xl font-bold text-gray-800'>Who We Are</h2>
          <p className='text-sm leading-7'>Welcome to Healthify, your trusted partner in managing your healthcare needs conveniently and efficiently. We understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
          <p className='text-sm leading-7'>Healthify is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Healthify is here to support you every step of the way.</p>
          <div className='bg-indigo-50 rounded-xl p-5 border-l-4 border-primary'>
            <p className='font-semibold text-gray-800 mb-1'>Our Vision</p>
            <p className='text-sm leading-6'>To create a seamless healthcare experience for every user — bridging the gap between patients and healthcare providers, making quality care accessible to all.</p>
          </div>
          <button onClick={() => navigate('/doctors')}
            className='flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full text-sm font-medium w-fit hover:bg-indigo-600 transition-colors'>
            Find a Doctor
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className='bg-gradient-to-r from-primary to-indigo-600 py-12 px-4 mb-20'>
        <div className='max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
          {stats.map(({ value, label }) => (
            <div key={label}>
              <p className='text-3xl font-bold text-white'>{value}</p>
              <p className='text-white/70 text-sm mt-1'>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className='max-w-6xl mx-auto px-4'>
        <div className='text-center mb-12'>
          <span className='inline-block bg-indigo-50 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider'>Why Healthify</span>
          <h2 className='text-3xl font-bold text-gray-800'>Why Choose Us</h2>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {whyUs.map(({ icon, title, desc }) => (
            <div key={title} className='bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 group'>
              <div className='w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary transition-colors'>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='text-primary group-hover:text-white transition-colors'>
                  <path d={icon}/>
                </svg>
              </div>
              <p className='font-semibold text-gray-800 mb-2'>{title}</p>
              <p className='text-sm text-gray-500 leading-6'>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About
