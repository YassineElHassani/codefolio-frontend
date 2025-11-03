import React from 'react';

const Button = React.forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      className = '',
      disabled = false,
      loading = false,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variants = {
      primary:
        'bg-ocean hover:bg-ocean/90 text-sand disabled:bg-ocean/50 focus:ring-ocean/50 shadow-lg hover:shadow-xl',
      secondary:
        'bg-mist/20 hover:bg-mist/30 text-ocean border border-mist disabled:opacity-50 focus:ring-mist/50',
      ghost:
        'bg-transparent hover:bg-sand/10 text-ocean border border-transparent hover:border-sand/30 disabled:opacity-50',
      danger:
        'bg-red-600/80 hover:bg-red-700 text-white disabled:bg-red-600/50 focus:ring-red-600/50',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
      xl: 'px-8 py-4 text-xl',
    };

    const variantClass = variants[variant] || variants.primary;
    const sizeClass = sizes[size] || sizes.md;

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`${baseStyles} ${variantClass} ${sizeClass} ${className}`}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
