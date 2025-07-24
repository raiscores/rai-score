import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

function ErrorMessage({ 
  error, 
  onRetry,
  title = "Something went wrong",
  fullScreen = true,
  backgroundColor = '#f8fafc'
}) {
  const containerStyle = {
    padding: '2rem 1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ...(fullScreen && {
      minHeight: '100vh',
      backgroundColor: backgroundColor
    })
  };

  const errorBoxStyle = {
    textAlign: 'center',
    backgroundColor: '#fef2f2',
    padding: '2rem',
    borderRadius: '12px',
    border: '1px solid #fecaca',
    maxWidth: '500px',
    width: '100%'
  };

  const titleStyle = {
    color: '#dc2626',
    fontSize: '1.125rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  };

  const messageStyle = {
    color: '#991b1b',
    fontSize: '0.875rem',
    marginBottom: onRetry ? '1.5rem' : '0',
    lineHeight: '1.5'
  };

  const buttonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#dc2626',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };

  return (
    <div style={containerStyle}>
      <div style={errorBoxStyle}>
        <div style={titleStyle}>
          <AlertCircle size={20} />
          {title}
        </div>
        <p style={messageStyle}>
          {error}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            style={buttonStyle}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#b91c1c';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#dc2626';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorMessage;