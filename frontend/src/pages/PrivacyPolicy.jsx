import React from 'react'

const sections = [
  {
    title: 'Information We Collect',
    content: 'We collect information you provide directly to us, such as your name, email address, phone number, date of birth, and health-related information when you register for an account or book an appointment.'
  },
  {
    title: 'How We Use Your Information',
    content: 'We use the information we collect to provide, maintain, and improve our services, process appointment bookings, send you reminders and notifications, and communicate with you about your healthcare needs.'
  },
  {
    title: 'Information Sharing',
    content: 'We share your information with healthcare providers you choose to book appointments with. We do not sell, trade, or rent your personal information to third parties without your consent.'
  },
  {
    title: 'Data Security',
    content: 'We implement industry-standard security measures including SSL encryption, secure servers, and regular security audits to protect your personal and medical information.'
  },
  {
    title: 'Your Rights',
    content: 'You have the right to access, update, or delete your personal information at any time through your profile settings. You may also contact us directly to exercise these rights.'
  },
  {
    title: 'Cookies',
    content: 'We use cookies to enhance your experience, remember your preferences, and analyze site traffic. You can control cookie settings through your browser preferences.'
  },
  {
    title: 'Contact Us',
    content: 'If you have any questions about this Privacy Policy, please contact us at customersupport@healthify.in or call +91-93227-74275.'
  },
]

const PrivacyPolicy = () => (
  <div className='max-w-3xl mx-auto py-12 px-4'>
    <div className='text-center mb-12'>
      <span className='inline-block bg-indigo-50 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider'>Legal</span>
      <h1 className='text-3xl font-bold text-gray-800 mb-3'>Privacy Policy</h1>
      <p className='text-gray-500 text-sm'>Last updated: March 2026</p>
    </div>
    <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col gap-8'>
      <p className='text-gray-600 text-sm leading-7'>At Healthify, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.</p>
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

export default PrivacyPolicy
