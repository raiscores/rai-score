import React from 'react';

function LoadingSpinner({ 
  message = "Loading...", 
  size = 40, 
  fullScreen = true,
  backgroundColor = '#f8fafc'
}) {
  const containerStyle = {
    padding: '2rem 1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    ...(fullScreen && {
      minHeight: '100vh',
      backgroundColor: backgroundColor
    })
  };

  const spinnerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    border: '4px solid #e5e7eb',
    borderTop: '4px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 1rem'
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div>
        <div style={spinnerStyle} />
        <p style={{ 
          color: '#64748b', 
          fontSize: '1rem',
          margin: 0
        }}>
          {message}
        </p>
      </div>
    </div>
  );
}

export default LoadingSpinner;