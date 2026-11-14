import React from 'react';
import { FileText, FileSpreadsheet, Presentation, Archive, FileCode, File } from 'lucide-react';

const config = {
  pdf: { icon: FileText, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
  docx: { icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  doc: { icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  xlsx: { icon: FileSpreadsheet, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
  xls: { icon: FileSpreadsheet, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
  pptx: { icon: Presentation, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20' },
  ppt: { icon: Presentation, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20' },
  zip: { icon: Archive, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  rar: { icon: Archive, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
};

const sizes = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-12 h-12', xl: 'w-16 h-16' };
const iconSizes = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6', xl: 'w-8 h-8' };

export default function FileIcon({ extension = '', size = 'md' }) {
  const ext = extension.toLowerCase();
  const { icon: Icon = File, color = 'text-gray-500', bg = 'bg-gray-100 dark:bg-gray-800' } = config[ext] || {};
  return (
    <div className={`${sizes[size]} ${bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
      <Icon className={`${iconSizes[size]} ${color}`} />
    </div>
  );
}
