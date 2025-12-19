import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo_transparent.svg';

const navLinks = [
  { to: '/companies', label: 'Companies' },
  { to: '/about', label: 'About' },
  { to: '/methodology', label: 'Methodology' },
  { to: '/contact', label: 'Request' }
];

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="sticky top-0 z-50 glass transition-all duration-300">
      <div className={`max-w-7xl w-full mx-auto flex justify-between items-center relative ${
        isMobile ? 'py-3 px-4' : 'py-4 px-9'
      }`}>
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center no-underline gap-1.5">
          <img
            src={logo}
            alt="RAI Scores Logo"
            className={isMobile ? 'h-11 w-auto' : 'h-14 w-auto'}
          />
          <span className={`font-extrabold text-[#263552] tracking-tight select-none ${
            isMobile ? 'text-2xl' : 'text-[1.6rem]'
          }`}>
            RAI SCORES
          </span>
        </Link>

        {/* Hamburger Menu Button for Mobile */}
        {isMobile && (
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="cursor-pointer flex flex-col justify-center p-1"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <div className="w-6 h-0.5 bg-slate-800 my-1" />
            <div className="w-6 h-0.5 bg-slate-800 my-1" />
            <div className="w-6 h-0.5 bg-slate-800 my-1" />
          </button>
        )}

        {/* Nav Links */}
        <div className={`
          ${isMobile
            ? `${isMenuOpen ? 'flex' : 'hidden'} flex-col absolute top-full left-0 right-0 bg-white py-4 px-8 border-b border-gray-200 z-50`
            : 'flex flex-row'
          }
          gap-7
        `}>
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => isMobile && setIsMenuOpen(false)}
              className="text-base font-semibold uppercase tracking-wide text-slate-800 no-underline py-1 transition-colors duration-300 hover:text-blue-500"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
