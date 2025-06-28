import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navItems = ['Home', 'Services', 'About', 'Contact'];

  return (
    <header className="fixed w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center">
            <div className="bg-gray-100 rounded-lg w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
              <img 
                src="/Logo.png" 
                alt="Garvita Infrastructure Logo" 
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <div className="ml-3">
              <Link 
                to="/" 
                className="hidden md:block text-lg md:text-xl font-bold text-gray-900 tracking-tight"
                onClick={closeMenu}
              >
                Garvita Infrastructure
              </Link>
              <p className="hidden md:block text-xs text-gray-500 mt-0.5">
                Building Sustainable Futures
              </p>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={item === 'Home' ? '/' : `#${item.toLowerCase()}`}
                className="font-medium text-gray-600 hover:text-blue-600 transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleMenu}
              className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
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
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={item === 'Home' ? '/' : `#${item.toLowerCase()}`}
                  className="py-3 px-2 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                  onClick={closeMenu}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
