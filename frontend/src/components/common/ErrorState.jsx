import React from 'react';
import { AlertCircle } from 'lucide-react';
import Button from './Button';

export default function ErrorState({ title = 'Something went wrong', description, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">{title}</h3>
      {description && <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-4">{description}</p>}
      {onRetry && <Button variant="secondary" size="sm" onClick={onRetry}>Try Again</Button>}
    </div>
  );
}
