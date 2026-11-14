import React from 'react';
import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white border-transparent',
  secondary: 'bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700',
  danger: 'bg-red-600 hover:bg-red-700 text-white border-transparent',
  ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 border-transparent',
  success: 'bg-green-600 hover:bg-green-700 text-white border-transparent',
};

const sizes = {
  xs: 'text-xs px-2.5 py-1.5 rounded-md',
  sm: 'text-sm px-3 py-1.5 rounded-lg',
  md: 'text-sm px-4 py-2 rounded-lg',
  lg: 'text-base px-5 py-2.5 rounded-lg',
};

export default function Button({
  children, variant = 'primary', size = 'md', loading = false,
  icon: Icon, iconPosition = 'left', className = '', disabled, fullWidth, ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-medium border transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!loading && Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
      {children}
      {!loading && Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
    </button>
  );
}
