import React from 'react';

/**
 * Reusable layout container for consistent width and padding
 * Supports three sizes: default, wide, and narrow
 */
function Container({ children, size = 'default' }) {
  const sizeClasses = {
    default: 'container-default',
    wide: 'container-wide',
    narrow: 'container-narrow'
  };

  return (
    <div className={sizeClasses[size] || sizeClasses.default}>
      {children}
    </div>
  );
}

export default Container;
