import React from 'react';

export default function StatCard({ title, value, icon: Icon, iconColor = 'text-blue-600', iconBg = 'bg-blue-50 dark:bg-blue-900/20', change, changeType = 'up', subtitle, className = '' }) {
  return (
    <div className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{subtitle}</p>}
          {change !== undefined && (
            <p className={`text-xs font-medium mt-2 ${changeType === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {changeType === 'up' ? '↑' : '↓'} {change}% from last month
            </p>
          )}
        </div>
        {Icon && (
          <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
        )}
      </div>
    </div>
  );
}
