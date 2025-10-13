import React, { useEffect } from 'react';
import { Check, X, AlertCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ 
  message, 
  type = 'success', 
  onClose, 
  duration = 3000 
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const config = {
    success: {
      icon: Check,
      bgColor: 'bg-emerald-500',
      borderColor: 'border-emerald-600'
    },
    error: {
      icon: X,
      bgColor: 'bg-red-500',
      borderColor: 'border-red-600'
    },
    warning: {
      icon: AlertCircle,
      bgColor: 'bg-orange-500',
      borderColor: 'border-orange-600'
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-500',
      borderColor: 'border-blue-600'
    }
  };

  const { icon: Icon, bgColor, borderColor } = config[type];

  return (
    <div className="fixed top-6 right-6 z-50 animate-slide-in">
      <div className={`${bgColor} ${borderColor} border-l-8 px-6 py-5 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[320px] max-w-md backdrop-blur-sm hover:scale-105 transition-transform`}>
        <div className="flex-shrink-0 text-white bg-white/20 rounded-full p-2 animate-pulse">
          <Icon className="w-6 h-6" />
        </div>
        <p className="flex-1 font-bold text-white text-base">{message}</p>
        <button
          onClick={onClose}
          aria-label="Tutup notifikasi"
          className="flex-shrink-0 text-white hover:bg-white/30 rounded-full p-2 transition-all transform hover:scale-110"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Toast;

