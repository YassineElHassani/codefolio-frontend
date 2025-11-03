import React from 'react';

const Spinner = ({ size = 'md', variant = 'primary', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4',
  };

  const variants = {
    primary: 'border-ocean border-t-sand',
    secondary: 'border-mist border-t-ocean',
    light: 'border-sand/20 border-t-sand',
  };

  return (
    <div className={`inline-block ${className}`}>
      <div
        className={`${sizes[size]} ${variants[variant]} border-solid rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
