import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location]);

  const navLinks = [
    { label: 'Home', href: '/', isRoute: true },
    { label: 'Services', href: '/#services', isRoute: false },
    { label: 'About', href: '#about', isRoute: false },
    { label: 'Blogs', href: '/blogs', isRoute: true },
    { label: 'Contact', href: '#contact', isRoute: false },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center">
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg overflow-hidden bg-gray-50">
              <img 
                src="/Logo.png" 
                alt="Garvita Infrastructure Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="ml-3">
              <Link 
                to="/" 
                className="hidden md:block text-lg md:text-xl font-bold text-gray-900 tracking-tight hover:text-blue-600 transition-colors"
                onClick={closeMenu}
              >
                Garvita Infrastructure
              </Link>
              <p className="hidden md:block text-xs text-gray-500 mt-0.5 font-medium">
                Building Sustainable Futures
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((item) =>
              item.isRoute ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 relative group ${
                    location.pathname === item.href
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 rounded-lg font-medium text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                >
                  {item.label}
                </a>
              )
            )}
            <a
              href="tel:+917837505862"
              className="ml-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors shadow-sm"
            >
              Get in Touch
            </a>
          </nav>

          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col space-y-1">
            {navLinks.map((item) =>
              item.isRoute ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`py-3 px-4 rounded-xl font-medium transition-colors ${
                    location.pathname === item.href
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="py-3 px-4 rounded-xl font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              )
            )}
            <a
              href="tel:+917837505862"
              className="mt-2 text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
              onClick={closeMenu}
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
