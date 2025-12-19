import React from 'react';

/**
 * Loading spinner component with optional message
 * Uses the .spinner class defined in index.css
 */
function LoadingSpinner({
  message = "Loading...",
  fullScreen = true
}) {
  const containerClasses = fullScreen
    ? "min-h-screen bg-slate-50 flex items-center justify-center p-4 text-center"
    : "p-8 flex items-center justify-center text-center";

  return (
    <div className={containerClasses}>
      <div>
        <div className="spinner mx-auto mb-4" />
        <p className="text-slate-500 text-base m-0">
          {message}
        </p>
      </div>
    </div>
  );
}

export default LoadingSpinner;
