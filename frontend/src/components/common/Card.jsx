import React from 'react';

export default function Card({ children, className = '', hover = false, onClick, padding = true }) {
  return (
    <div
      className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm
        ${hover ? 'hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer' : ''}
        ${padding ? 'p-6' : ''}
        ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
