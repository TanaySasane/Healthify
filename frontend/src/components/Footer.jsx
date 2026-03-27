import React from 'react';
import { useNavigate } from 'react-router-dom';

const HealthifyLogo = () => (
  <svg width="32" height="32" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="38" height="38" rx="10" fill="#5F6FFF"/>
    <path d="M19 8C19 8 10 13.5 10 20.5C10 25.2 14.03 29 19 29C23.97 29 28 25.2 28 20.5C28 13.5 19 8 19 8Z" fill="white" fillOpacity="0.2"/>
    <path d="M15 19H17.5V15H20.5V19H23V21.5H20.5V25.5H17.5V21.5H15V19Z" fill="white"/>
  </svg>
)

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-950 text-gray-400 mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-8">
        <div className="grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
              <HealthifyLogo />
              <span className="text-xl font-bold text-white">Healt<span className="text-primary">hify</span></span>
            </div>
            <p className="text-sm leading-7 text-gray-400 max-w-xs">
              Your trusted partner for effortless healthcare scheduling. Book appointments with top doctors in just a few clicks.
            </p>
            <div className="flex gap-3 mt-2">
              {/* Social icons */}
              {[
                { label: 'Twitter', path: 'M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 8v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
                { label: 'Instagram', path: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 2h11A4.5 4.5 0 0122 6.5v11a4.5 4.5 0 01-4.5 4.5h-11A4.5 4.5 0 012 17.5v-11A4.5 4.5 0 016.5 2z' },
                { label: 'LinkedIn', path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z' },
              ].map(({ label, path }) => (
                <a key={label} href="#" aria-label={label}
                  className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-200">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={path}/>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Company</p>
            <ul className="flex flex-col gap-3 text-sm">
              {[['Home', '/'], ['About Us', '/about'], ['All Doctors', '/doctors'], ['Contact Us', '/contact']].map(([label, path]) => (
                <li key={label}>
                  <span onClick={() => { navigate(path); scrollTo(0,0) }}
                    className="cursor-pointer hover:text-primary transition-colors duration-200">{label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Services</p>
            <ul className="flex flex-col gap-3 text-sm">
              {['Book Appointment', 'Find Specialists', 'Online Consultation', 'Health Records'].map(s => (
                <li key={s} className="hover:text-primary transition-colors duration-200 cursor-pointer">{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Get In Touch</p>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                </span>
                +91-93227-74275
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </span>
                customersupport@healthify.in
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </span>
                Kothrud, Pune, Maharashtra 411004
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© 2025 Healthify.in — All Rights Reserved. Built by <span className="text-primary font-medium">Tanay Sasane</span></p>
          <div className="flex gap-5">
            <span className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
