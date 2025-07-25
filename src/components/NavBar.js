import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo_transparent.svg'; // import the logo

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
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backdropFilter: 'blur(20px)',
      background: 'rgba(255, 255, 255, 0.7)',
      borderBottom: '1px solid rgba(229, 231, 235, 0.8)',
      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        maxWidth: '1400px',
        width: '100%',
        margin: '0 auto',
        padding: isMobile ? '.85rem 1rem' : '1rem 2.25rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative'
      }}>
        {/* Logo and Brand */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          gap: '0.4rem'
        }}>
          <img
            src={logo}
            alt="RAI Scores Logo"
            style={{
              height: isMobile ? '45px' : '55px',  // balanced height for navbar
              width: 'auto'
            }}
          />
          <span style={{
            fontSize: isMobile ? '1.5rem' : '1.6rem',
            fontWeight: '800',
            color: '#263552',  // updated text color here
            letterSpacing: '-0.5px',
            userSelect: 'none'
          }}>
            RAI SCORES
          </span>
        </Link>

        {/* Hamburger Menu Button for Mobile */}
        {isMobile && (
          <div
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0.25rem'
            }}
          >
            <div style={{ width: '25px', height: '3px', backgroundColor: '#1e293b', margin: '4px 0' }} />
            <div style={{ width: '25px', height: '3px', backgroundColor: '#1e293b', margin: '4px 0' }} />
            <div style={{ width: '25px', height: '3px', backgroundColor: '#1e293b', margin: '4px 0' }} />
          </div>
        )}

        {/* Nav Links */}
        <div
          style={{
            display: isMobile ? (isMenuOpen ? 'flex' : 'none') : 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '1.75rem',
            position: isMobile ? 'absolute' : 'static',
            top: isMobile ? '100%' : 'auto',
            left: 0,
            right: 0,
            backgroundColor: isMobile ? 'white' : 'transparent',
            padding: isMobile ? '1rem 2rem' : 0,
            borderBottom: isMobile ? '1px solid #e5e7eb' : 'none',
            zIndex: 999
          }}
        >
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => isMobile && setIsMenuOpen(false)}
              style={{
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#1e293b',
                textDecoration: 'none',
                position: 'relative',
                padding: '0.25rem 0',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={e => { e.target.style.color = '#3b82f6'; }}
              onMouseLeave={e => { e.target.style.color = '#1e293b'; }}
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