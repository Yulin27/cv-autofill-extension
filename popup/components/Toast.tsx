import React, { useEffect } from 'react';
import { ToastMessage } from '../types';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface ToastProps {
  toast: ToastMessage;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  const styles = {
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  return (
    <div className={`fixed bottom-4 left-4 right-4 z-50 flex items-start p-4 mb-4 rounded-lg border shadow-lg transition-all duration-300 transform translate-y-0 opacity-100 ${styles[toast.type]}`}>
      <div className="flex-shrink-0 mr-3 mt-0.5">
        {icons[toast.type]}
      </div>
      <div className="flex-1 text-sm font-medium">
        {toast.message}
      </div>
      <button onClick={onClose} className="ml-3 inline-flex flex-shrink-0 text-gray-400 hover:text-gray-600 focus:outline-none">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
