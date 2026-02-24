import React from 'react';

/**
 * Reusable layout container for consistent width and padding
 * Supports three sizes: default, wide, and narrow
 */
function Container({ children, size = 'default' }) {
  const sizeClasses = {
    default: 'container-default px-6 sm:px-8 lg:px-10',
    wide: 'container-wide px-6 sm:px-8 lg:px-10',
    narrow: 'container-narrow px-6 sm:px-8 lg:px-10'
  };

  return (
    <div className={sizeClasses[size] || sizeClasses.default}>
      {children}
    </div>
  );
}

export default Container;
