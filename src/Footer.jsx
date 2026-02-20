import { Linkedin, Mail, MapPin, Phone, Twitter, ArrowRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
     <footer className="bg-gray-900 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
            <div id='about' className="lg:col-span-1">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl overflow-hidden bg-white/10 flex-shrink-0">
                  <img src="./Logo.png" alt="Garvita Infrastructure Logo" className="w-full h-full object-contain" />   
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold leading-tight">Garvita<br/>Infrastructure</h2>
                </div>
              </div>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                Engineering sustainable futures through innovative infrastructure solutions since 2020.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="bg-gray-800 hover:bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors" aria-label="LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="bg-gray-800 hover:bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors" aria-label="Twitter">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="mailto:atulsalaria82@gmail.com" className="bg-gray-800 hover:bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors" aria-label="Email">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            <div id='services'>
              <h3 className="text-base font-bold mb-6 uppercase tracking-wider text-gray-300">Services</h3>
              <ul className="space-y-3">
                {['Urban Development', 'Transport Infrastructure', 'Sustainable Construction', 'Water Management', 'Structural Engineering', 'Project Consulting'].map((service) => (
                  <li key={service}>
                    <a href="#services" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group">
                      <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-base font-bold mb-6 uppercase tracking-wider text-gray-300">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { label: 'Home', href: '/', isRoute: true },
                  { label: 'Our Services', href: '/#services', isRoute: false },
                  { label: 'Latest Blogs', href: '/blogs', isRoute: true },
                  { label: 'About Us', href: '#about', isRoute: false },
                  { label: 'Contact Us', href: '#contact', isRoute: false },
                ].map((link) => (
                  <li key={link.label}>
                    {link.isRoute ? (
                      <Link to={link.href} className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group">
                        <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group">
                        <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            
            <div id='contact'>
              <h3 className="text-base font-bold mb-6 uppercase tracking-wider text-gray-300">Contact Us</h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mt-0.5 mr-3 text-blue-400 flex-shrink-0" />
                  <span className="text-sm">Matti, Pathankot (Punjab)</span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0" />
                  <a href="tel:+917837505862" className="text-sm hover:text-white transition-colors">+91 78375 05862</a>
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0" />
                  <a href="mailto:atulsalaria82@gmail.com" className="text-sm hover:text-white transition-colors break-all">atulsalaria82@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Garvita Infrastructure. All rights reserved.</p>
            <p className="text-gray-600">Innovating since 2020 · Building Sustainable Futures</p>
          </div>
        </div>
      </footer>
  )
}

export default Footer
