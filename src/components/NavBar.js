import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo_transparent.svg';

const navLinks = [
  { to: '/companies', label: 'Companies' },
  { to: '/methodology', label: 'Methodology' },
  { to: '/about', label: 'About' }
];

const linkClass = ({ isActive }) =>
  `text-sm font-medium no-underline py-1.5 border-b-2 transition-colors duration-150 ${
    isActive
      ? 'text-slate-900 border-blue-600'
      : 'text-slate-600 border-transparent hover:text-slate-900'
  }`;

const mobileLinkClass = ({ isActive }) =>
  `text-base font-medium no-underline py-2.5 transition-colors duration-150 ${
    isActive ? 'text-blue-600' : 'text-slate-700 hover:text-slate-900'
  }`;

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container-wide px-6 sm:px-8 lg:px-10 flex justify-between items-center py-2.5 md:py-3">
        {/* Logo and Brand */}
        <Link to="/" onClick={closeMenu} className="flex items-center no-underline gap-1.5">
          <img src={logo} alt="RAI Scores Logo" className="h-8 md:h-9 w-auto" />
          <span className="font-bold text-[#263552] tracking-tight select-none text-lg md:text-xl">
            RAI SCORES
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map(link => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="text-sm font-medium text-slate-800 no-underline border border-slate-300 hover:border-slate-400 hover:bg-slate-50 rounded-lg px-3.5 py-1.5 transition-colors duration-150"
          >
            Request Evaluation
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-1.5 text-slate-700"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-6 pt-1 pb-4 flex flex-col">
          {navLinks.map(link => (
            <NavLink key={link.to} to={link.to} onClick={closeMenu} className={mobileLinkClass}>
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            onClick={closeMenu}
            className="mt-2 text-base font-medium text-slate-800 no-underline border border-slate-300 rounded-lg px-4 py-2.5 text-center"
          >
            Request Evaluation
          </Link>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
