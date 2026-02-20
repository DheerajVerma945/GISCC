import React from 'react';
import { ArrowRight, Building2, Truck, Leaf, GlassWater, Construction, LucideProjector, Quote } from "lucide-react";
import Blogs from "./Blogs";
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="font-sans antialiased text-gray-800">

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gray-900 pt-32">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-gray-900/50"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')] bg-cover bg-center opacity-30"></div>
        
        <div className="relative z-10 pt-40 pb-28 px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-6">
              <span className="font-medium">Innovating since 2020</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Engineering Excellence
              </span>
              <br className="hidden sm:block" />
              for Tomorrow's Infrastructure
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              Shaping sustainable communities through innovative engineering solutions
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
              <Link to="/blogs" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition-colors flex items-center justify-center">
                Explore Projects <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a href='#services' className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium py-3 px-8 rounded-full transition-colors">
                Our Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '250+', label: 'Projects Completed' },
              { value: '40+', label: 'Industry Awards' },
              { value: '98%', label: 'Client Satisfaction' },
              { value: '500+', label: 'Expert Team Members' }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
                <p className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Delivering comprehensive infrastructure solutions with precision and innovation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { 
                title: 'Urban Development', 
                description: 'Designing sustainable urban spaces that balance growth with environmental responsibility.',
                icon: <Building2 className="w-7 h-7 text-blue-600" />,
                bg: 'bg-blue-50'
              },
              { 
                title: 'Transport Infrastructure', 
                description: 'Building efficient transportation networks that connect communities and drive economic growth.',
                icon: <Truck className="w-7 h-7 text-cyan-600" />,
                bg: 'bg-cyan-50'
              },
              { 
                title: 'Sustainable Construction', 
                description: 'Implementing green building practices to minimize environmental impact.',
                icon: <Leaf className="w-7 h-7 text-green-600" />,
                bg: 'bg-green-50'
              },
              { 
                title: 'Water Management', 
                description: 'Developing resilient water infrastructure for sustainable resource management.',
                icon: <GlassWater className="w-7 h-7 text-sky-600" />,
                bg: 'bg-sky-50'
              },
              { 
                title: 'Structural Engineering', 
                description: 'Creating innovative structural solutions that stand the test of time.',
                icon: <Construction className="w-7 h-7 text-orange-600" />,
                bg: 'bg-orange-50'
              },
              { 
                title: 'Project Consulting', 
                description: 'Providing expert guidance throughout the project lifecycle.',
                icon: <LucideProjector className="w-7 h-7 text-purple-600" />,
                bg: 'bg-purple-50'
              }
            ].map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group">
                <div className={`${service.bg} w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Projects
              </h2>
              <p className="text-xl text-gray-600 max-w-xl">
                Showcasing our commitment to excellence and innovation
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg group">
              <div className="h-80 bg-gradient-to-br from-blue-500 to-cyan-400 relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80"
                  alt="Riverfront Redevelopment Project"
                  className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-blue-600 text-white py-2 px-4 rounded-full text-sm font-medium">
                  Completed: 2023
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Riverfront Redevelopment Project</h3>
                <p className="text-gray-600 mb-6">Transforming urban waterfronts into vibrant community spaces with sustainable design principles.</p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg group">
              <div className="h-80 bg-gradient-to-br from-blue-500 to-cyan-400 relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&q=80"
                  alt="High-Speed Rail Corridor"
                  className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-blue-600 text-white py-2 px-4 rounded-full text-sm font-medium">
                  In Progress
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">High-Speed Rail Corridor</h3>
                <p className="text-gray-600 mb-6">Engineering a state-of-the-art transportation network connecting major economic centers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-br from-blue-900 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Client Testimonials
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Hear from our partners and clients about their experience working with us
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Rajesh Kumar', company: 'Metro Development Corp', text: 'Garvita Infrastructure delivered beyond our expectations. Their innovative approach to sustainable design helped us achieve LEED Platinum certification while staying on budget.' },
              { name: 'Priya Sharma', company: 'National Highway Authority', text: 'Working with Garvita was a seamless experience. Their expertise in transport infrastructure and commitment to timelines was truly impressive.' },
              { name: 'Amit Singh', company: 'Smart City Solutions', text: 'The team\'s dedication to quality and sustainability is unmatched. Our urban development project was completed with exceptional precision and care.' },
            ].map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-white/15 transition-colors">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <Quote className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-lg">{item.name}</h4>
                    <p className="text-blue-200 text-sm">{item.company}</p>
                  </div>
                </div>
                <p className="mb-6 italic text-gray-200 leading-relaxed">
                  &ldquo;{item.text}&rdquo;
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Blogs />

      {/* CTA Section */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Next Project?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
            Partner with us to bring your vision to life with innovative engineering solutions and sustainable practices.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
            href="tel:+917837505862" 
            className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-8 rounded-full transition-colors">
              Request Consultation
            </a>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default HomePage;