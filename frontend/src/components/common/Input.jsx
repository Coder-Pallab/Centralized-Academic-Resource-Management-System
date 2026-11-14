import React, { forwardRef } from 'react';

const Input = forwardRef(function Input({
  label, error, hint, icon: Icon, iconPosition = 'left',
  className = '', containerClassName = '', required, ...props
}, ref) {
  return (
    <div className={`space-y-1 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="w-4 h-4 text-gray-400" />
          </div>
        )}
        <input
          ref={ref}
          className={`w-full px-3 py-2 bg-white dark:bg-gray-800 border rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600'}
            ${Icon && iconPosition === 'left' ? 'pl-9' : ''}
            ${Icon && iconPosition === 'right' ? 'pr-9' : ''}
            ${className}`}
          {...props}
        />
        {Icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Icon className="w-4 h-4 text-gray-400" />
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
      {hint && !error && <p className="text-xs text-gray-500 dark:text-gray-400">{hint}</p>}
    </div>
  );
});

export default Input;
