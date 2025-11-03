import React from 'react';

const Badge = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseStyles = 'inline-flex items-center rounded-full font-medium';

  const variants = {
    primary: 'bg-ocean/20 text-ocean',
    secondary: 'bg-mist/20 text-mist',
    success: 'bg-green-500/20 text-green-600 dark:text-green-400',
    warning: 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400',
    danger: 'bg-red-500/20 text-red-600 dark:text-red-400',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
