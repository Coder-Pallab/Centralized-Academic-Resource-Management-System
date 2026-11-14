import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { AlertTriangle } from 'lucide-react';

export default function ConfirmDialog({ isOpen, onClose, onConfirm, title = 'Confirm Action', message, confirmLabel = 'Confirm', cancelLabel = 'Cancel', variant = 'danger', loading = false }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${variant === 'danger' ? 'bg-red-100 dark:bg-red-900/20' : 'bg-yellow-100 dark:bg-yellow-900/20'}`}>
          <AlertTriangle className={`w-6 h-6 ${variant === 'danger' ? 'text-red-600' : 'text-yellow-600'}`} />
        </div>
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
        {message && <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{message}</p>}
        <div className="flex gap-3 justify-center">
          <Button variant="secondary" onClick={onClose} disabled={loading}>{cancelLabel}</Button>
          <Button variant={variant} onClick={onConfirm} loading={loading}>{confirmLabel}</Button>
        </div>
      </div>
    </Modal>
  );
}
