import React from 'react';
import { Link } from 'react-router-dom';

// Define nav links in one place for clarity
const navLinks = [
  { to: '/companies', label: 'Companies' },
  { to: '/about', label: 'About' },
  { to: '/methodologies', label: 'Methodologies' },
  { to: '/request', label: 'Request' }
];

function NavBar() {
  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backdropFilter: 'blur(12px)',
      background: 'rgba(255, 255, 255, 0.7)',
      borderBottom: '1px solid rgba(229, 231, 235, 0.6)',
      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        maxWidth: '1400px',
        width: '100%',
        margin: '0 auto',
        padding: '1.5rem 2.25rem', /*height of nav bar*/
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Brand / Logo */}
        <Link to="/" style={{
          fontSize: '1.5rem',
          fontWeight: '800',
          textDecoration: 'none',
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.5px'
        }}>
          RAI Scorecard
        </Link>

        {/* Nav Links */}
        <div style={{
          display: 'flex',
          gap: '1.75rem'
        }}>
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
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
              onMouseEnter={e => {
                e.target.style.color = '#3b82f6';
              }}
              onMouseLeave={e => {
                e.target.style.color = '#1e293b';
              }}
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
