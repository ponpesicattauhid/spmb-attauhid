import React from 'react';
import { GraduationCap, FileText, UserCheck, ChevronRight } from 'lucide-react';
import { UserRole } from '../types';

interface LoginScreenProps {
  onLogin: (role: UserRole) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl mb-4 shadow-lg">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            SPMB Ponpes IC At Tauhid
          </h1>
          <p className="text-gray-600">Sistem Penerimaan Mahasiswa/Siswa Baru</p>
          <p className="text-sm text-gray-500 mt-1">Bangka Belitung</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Pilih Akses</h2>
          
          <div className="space-y-4">
            <button
              onClick={() => onLogin('TU')}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-between"
            >
              <div className="flex items-center">
                <FileText className="w-6 h-6 mr-3" />
                <div className="text-left">
                  <div className="font-bold">Tata Usaha (TU)</div>
                  <div className="text-sm text-blue-100">Input & kelola data pendaftaran</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onLogin('PENGUJI')}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-between"
            >
              <div className="flex items-center">
                <UserCheck className="w-6 h-6 mr-3" />
                <div className="text-left">
                  <div className="font-bold">Penguji</div>
                  <div className="text-sm text-emerald-100">Lakukan penilaian calon siswa</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;

