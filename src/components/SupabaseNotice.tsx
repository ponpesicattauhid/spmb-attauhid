import React, { useState } from 'react';
import { Database, X, ExternalLink, CheckCircle } from 'lucide-react';

const SupabaseNotice: React.FC = () => {
  const [dismissed, setDismissed] = useState(() => {
    return localStorage.getItem('supabase_notice_dismissed') === 'true';
  });

  const handleDismiss = () => {
    localStorage.setItem('supabase_notice_dismissed', 'true');
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-md bg-white rounded-xl shadow-2xl border-2 border-blue-200 p-5 z-50 animate-slide-up">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Database className="w-5 h-5 text-white" />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-gray-800">Supabase Setup Diperlukan</h3>
            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              aria-label="Tutup"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          
          <p className="text-sm text-gray-600 mb-3">
            Aplikasi saat ini menggunakan mode lokal. Untuk data persistence, setup Supabase database:
          </p>
          
          <div className="space-y-2 mb-3">
            <div className="flex items-start gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Buka <strong>supabase-schema.sql</strong></span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Jalankan SQL di Supabase Dashboard</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Reload aplikasi</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <a
              href="https://app.supabase.com/project/fuwfnakfiykehjkklqrb/sql/new"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Buka SQL Editor
            </a>
            <button
              onClick={handleDismiss}
              className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm"
            >
              Nanti saja
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupabaseNotice;




