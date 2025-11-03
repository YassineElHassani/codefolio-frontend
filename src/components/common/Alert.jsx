import React from 'react';

const Alert = React.forwardRef(
  ({ children, type = 'info', title, onClose, className = '', ...props }, ref) => {
    const types = {
      success: {
        bg: 'bg-green-500/10 border-green-500/30',
        text: 'text-green-700 dark:text-green-400',
        icon: '✓',
      },
      error: {
        bg: 'bg-red-500/10 border-red-500/30',
        text: 'text-red-700 dark:text-red-400',
        icon: '✕',
      },
      warning: {
        bg: 'bg-yellow-500/10 border-yellow-500/30',
        text: 'text-yellow-700 dark:text-yellow-400',
        icon: '⚠',
      },
      info: {
        bg: 'bg-blue-500/10 border-blue-500/30',
        text: 'text-blue-700 dark:text-blue-400',
        icon: 'ⓘ',
      },
    };

    const typeStyles = types[type] || types.info;

    return (
      <div
        ref={ref}
        className={`
          rounded-lg border backdrop-blur-sm
          px-4 py-3 flex items-start gap-3
          ${typeStyles.bg} ${typeStyles.text}
          ${className}
        `}
        {...props}
      >
        <span className="shrink-0 font-bold mt-0.5">{typeStyles.icon}</span>
        <div className="flex-1">
          {title && <p className="font-semibold mb-1">{title}</p>}
          {typeof children === 'string' ? <p className="text-sm">{children}</p> : children}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="shrink-0 hover:opacity-70 transition-opacity font-bold"
          >
            ✕
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;
