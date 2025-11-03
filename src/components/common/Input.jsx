import React from 'react';

const Input = React.forwardRef(
  (
    {
      label,
      error,
      hint,
      type = 'text',
      className = '',
      containerClassName = '',
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`flex flex-col gap-2 ${containerClassName}`}>
        {label && (
          <label className="text-sm font-medium text-sand dark:text-sand/90">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          disabled={disabled}
          className={`
            px-4 py-2.5 rounded-lg
            bg-sand/5 border border-sand/20
            text-night dark:text-sand
            placeholder-sand/40
            transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-ocean focus:border-transparent
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? 'border-red-500/50 focus:ring-red-500/50' : ''}
            ${className}
          `}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
        {hint && !error && <p className="text-xs text-sand/50">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
