import React from 'react';

const Card = React.forwardRef(
  ({ children, className = '', hover = true, glassEffect = true, ...props }, ref) => {
    const baseStyles = 'rounded-2xl backdrop-blur-md transition-all duration-300';
    
    const glassStyles = glassEffect
      ? 'bg-sand/10 border border-sand/20 shadow-[0_16px_40px_rgba(0,0,0,0.25)]'
      : 'bg-sand dark:bg-night border border-sand/10';

    const hoverStyles = hover
      ? 'hover:bg-sand/20 hover:border-sand/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]'
      : '';

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${glassStyles} ${hoverStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
