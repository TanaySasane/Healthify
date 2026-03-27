import React from 'react'

const sections = [
  { title: 'Acceptance of Terms', content: 'By accessing and using Healthify, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.' },
  { title: 'Use of Service', content: 'Healthify provides an online platform to connect patients with healthcare providers. You agree to use the service only for lawful purposes and in accordance with these terms.' },
  { title: 'Account Registration', content: 'You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your account credentials.' },
  { title: 'Appointment Booking', content: 'When you book an appointment, you agree to attend at the scheduled time or cancel at least 24 hours in advance. Repeated no-shows may result in account suspension.' },
  { title: 'Payment Terms', content: 'Consultation fees are displayed before booking. Payments are processed securely through Razorpay. Refunds are subject to the cancellation policy of the respective doctor.' },
  { title: 'Medical Disclaimer', content: 'Healthify is a booking platform and does not provide medical advice. Always consult a qualified healthcare professional for medical decisions.' },
  { title: 'Limitation of Liability', content: 'Healthify shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform or services provided by healthcare professionals.' },
  { title: 'Changes to Terms', content: 'We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.' },
]

const Terms = () => (
  <div className='max-w-3xl mx-auto py-12 px-4'>
    <div className='text-center mb-12'>
      <span className='inline-block bg-indigo-50 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider'>Legal</span>
      <h1 className='text-3xl font-bold text-gray-800 mb-3'>Terms of Service</h1>
      <p className='text-gray-500 text-sm'>Last updated: March 2026</p>
    </div>
    <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col gap-8'>
      <p className='text-gray-600 text-sm leading-7'>Please read these Terms of Service carefully before using Healthify. These terms govern your use of our platform and services.</p>
      {sections.map(({ title, content }) => (
        <div key={title}>
          <h2 className='text-base font-semibold text-gray-800 mb-2 flex items-center gap-2'>
            <span className='w-1.5 h-1.5 bg-primary rounded-full'/>
            {title}
          </h2>
          <p className='text-sm text-gray-600 leading-7 pl-4'>{content}</p>
        </div>
      ))}
    </div>
  </div>
)

export default Terms
