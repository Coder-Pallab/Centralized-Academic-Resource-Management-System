export const formatFileSize = (bytes) => {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
};

export const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

export const formatRelativeTime = (dateStr) => {
  const diffDays = Math.floor((new Date() - new Date(dateStr)) / 86400000);
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return formatDate(dateStr);
};

export const formatNumber = (n) => n >= 1000000 ? `${(n/1000000).toFixed(1)}M` : n >= 1000 ? `${(n/1000).toFixed(1)}K` : String(n);
export const truncate = (str, max = 80) => str && str.length > max ? str.slice(0, max) + '...' : (str || '');
export const getFileExtension = (filename) => filename ? filename.split('.').pop().toLowerCase() : '';
export const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

