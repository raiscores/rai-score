import React from 'react';

// Reusable layout container for consistent width and padding
function Container({ children }) {
  return (
    <div style={{
      maxWidth: '1440px',
      padding: '0 2rem',
      margin: '0 auto'
    }}>
      {children}
    </div>
  );
}

export default Container;