import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'

const contactInfo = [
  { icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 10 a2 2 0 100-4 2 2 0 000 4', label: 'Address', value: 'Kothrud, Pune, Maharashtra 411004' },
  { icon: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z', label: 'Phone', value: '+91-93227-74275' },
  { icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6', label: 'Email', value: 'customersupport@healthify.in' },
]

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success('Message sent! We\'ll get back to you soon.')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className='pb-20'>
      {/* Hero */}
      <div className='text-center py-14 px-4'>
        <span className='inline-block bg-indigo-50 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider'>Contact Us</span>
        <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4'>Get In <span className='text-primary'>Touch</span></h1>
        <p className='text-gray-500 max-w-md mx-auto text-sm'>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>

      <div className='max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-start'>
        {/* Left */}
        <div className='flex flex-col gap-8'>
          <img className='w-full rounded-2xl shadow-lg object-cover max-h-64' src={assets.contact_image} alt="Contact"/>

          <div className='flex flex-col gap-4'>
            {contactInfo.map(({ icon, label, value }) => (
              <div key={label} className='flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-100 shadow-sm'>
                <div className='w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0'>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5F6FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={icon}/>
                  </svg>
                </div>
                <div>
                  <p className='text-xs text-gray-400'>{label}</p>
                  <p className='text-sm font-medium text-gray-700'>{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className='bg-gradient-to-br from-primary to-indigo-600 rounded-2xl p-6 text-white'>
            <p className='font-semibold text-lg mb-2'>Careers at Healthify</p>
            <p className='text-white/70 text-sm mb-4'>Join our team and help make healthcare accessible to everyone in Pune.</p>
            <button className='bg-white text-primary text-sm font-medium px-5 py-2.5 rounded-full hover:shadow-lg transition-all'>
              Explore Jobs
            </button>
          </div>
        </div>

        {/* Right - Contact Form */}
        <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-8'>
          <h2 className='text-xl font-bold text-gray-800 mb-6'>Send us a message</h2>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div>
              <label className='text-sm font-medium text-gray-700 mb-1 block'>Your Name</label>
              <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all'
                placeholder='Tanay Sasane' required />
            </div>
            <div>
              <label className='text-sm font-medium text-gray-700 mb-1 block'>Email Address</label>
              <input type='email' value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all'
                placeholder='you@example.com' required />
            </div>
            <div>
              <label className='text-sm font-medium text-gray-700 mb-1 block'>Message</label>
              <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none'
                rows={5} placeholder='How can we help you?' required />
            </div>
            <button type='submit'
              className='w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-indigo-600 hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2'>
              Send Message
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
