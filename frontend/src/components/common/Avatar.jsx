import React from 'react';

const sizes = { xs: 'w-6 h-6 text-xs', sm: 'w-8 h-8 text-sm', md: 'w-10 h-10 text-base', lg: 'w-12 h-12 text-lg', xl: 'w-16 h-16 text-xl', '2xl': 'w-20 h-20 text-2xl' };

function getInitials(name) {
  if (!name) return '?';
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

function getColor(name) {
  const colors = ['bg-blue-500','bg-purple-500','bg-green-500','bg-orange-500','bg-red-500','bg-teal-500','bg-pink-500','bg-indigo-500'];
  if (!name) return colors[0];
  return colors[name.charCodeAt(0) % colors.length];
}

export default function Avatar({ src, name, size = 'md', className = '' }) {
  if (src) {
    return <img src={src} alt={name || 'Avatar'} className={`${sizes[size]} rounded-full object-cover ${className}`} />;
  }
  return (
    <div className={`${sizes[size]} ${getColor(name)} rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 ${className}`}>
      {getInitials(name)}
    </div>
  );
}
