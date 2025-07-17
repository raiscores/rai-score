import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      color: '#f8fafc',
      padding: '4rem 2rem 2rem',
      fontSize: '0.95rem',
      marginTop: '0'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem'
      }}>
        {/* Brand & Mission */}
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>
            RAI Scorecard
          </h2>
          <p style={{ lineHeight: '1.7', color: '#cbd5e1' }}>
            Making AI accountability transparent, accessible, and actionable for everyone.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            {/* Social Icon Buttons */}
            {[
              { icon: '𝕏', href: '#' },
              { icon: '💼', href: '#' },
              { icon: '📧', href: 'mailto:raiscores@gmail.com' }
            ].map(({ icon, href }) => (
              <a
                key={icon}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '42px',
                  height: '42px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#f1f5f9',
                  textDecoration: 'none',
                  transition: 'background 0.3s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>
            Quick Links
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2' }}>
            <li><Link to="/companies" style={linkStyle}>Browse Companies</Link></li>
            <li><Link to="/methodologies" style={linkStyle}>Our Methodology</Link></li>
            <li><Link to="/about" style={linkStyle}>About Us</Link></li>
            <li><Link to="/request" style={linkStyle}>Request Evaluation</Link></li>
            <li><a href="#" style={linkStyle}>Blog</a></li>
            <li><a href="#" style={linkStyle}>FAQ</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>
            Get in Touch
          </h4>
          <p style={{ marginBottom: '0.5rem', color: '#f1f5f9' }}>
            📧 raiscores@gmail.com
          </p>
          <p style={{ color: '#cbd5e1', lineHeight: '1.7' }}>
            Have questions about our methodology or want to request a company evaluation? We'd love to hear from you.
          </p>
        </div>
      </div>

      {/* Footer bottom bar */}
      <div style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        marginTop: '3rem',
        paddingTop: '1.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.85rem',
        color: '#94a3b8'
      }}>
        <span>© {new Date().getFullYear()} Responsible AI Scorecard. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link to="/privacy" style={linkStyle}>Privacy Policy</Link>
          <Link to="/terms" style={linkStyle}>Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

// Shared link style
const linkStyle = {
  color: '#f1f5f9',
  textDecoration: 'none',
  transition: 'color 0.2s ease'
};

export default Footer;