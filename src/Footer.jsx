import { Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
     <footer className="bg-gray-900 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
            <div id='about'>
              <div className="flex items-center mb-6">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" >
                  <img src="./Logo.png" alt="Garvita Infrastructure Logo" />   
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold">Garvita Infrastructure</h2>
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                Engineering sustainable futures through innovative infrastructure solutions since 2005.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-800 hover:bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="bg-gray-800 hover:bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div id='services'>
              <h3 className="text-lg font-bold mb-6">Services</h3>
              <ul className="space-y-3">
                {['Urban Development', 'Transport Infrastructure', 'Sustainable Construction', 'Water Management', 'Structural Engineering', 'Project Consulting'].map((service) => (
                  <li key={service}>
                    <p className="text-gray-400 hover:text-white transition-colors">{service}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            
            
            <div id='contact'>
              <h3 className="text-lg font-bold mb-6">Contact Us</h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mt-1 mr-3 text-blue-500" />
                  <span>Matti, Pathankot (Punjab)</span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-blue-500" />
                  <span>+91 78375 05862</span>
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-blue-500" />
                  <span>atulsalaria82@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-10 border-t border-gray-800 text-center text-gray-500">
            <p>© {new Date().getFullYear()} Garvita Infrastructure. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}

export default Footer
