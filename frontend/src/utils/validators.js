export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Invalid email address';
export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(password)) return 'Must contain an uppercase letter';
  if (!/[0-9]/.test(password)) return 'Must contain a number';
  return '';
};
export const validateRequired = (value, fieldName = 'This field') => (!value || !String(value).trim()) ? `${fieldName} is required` : '';
export const validatePhone = (phone) => /^[6-9]\d{9}$/.test(phone.replace(/\D/g, '')) ? '' : 'Invalid phone number';

