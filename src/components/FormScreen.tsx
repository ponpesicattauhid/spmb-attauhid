import React from 'react';
import { ChevronLeft, Check, User } from 'lucide-react';
import { FormData, LembagaData, Petugas, UserRole } from '../types';

interface FormScreenProps {
  selectedLembaga: LembagaData | null;
  formData: FormData;
  editingId: string | null;
  petugasList: Petugas[];
  userRole: UserRole;
  onBack: () => void;
  onSave: () => void;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const FormScreen: React.FC<FormScreenProps> = ({
  selectedLembaga,
  formData,
  editingId,
  petugasList,
  userRole,
  onBack,
  onSave,
  onFormChange
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-teal-400 to-blue-500 pb-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 relative z-10">
        {/* Header */}
        <div className="glass rounded-3xl shadow-2xl p-4 md:p-6 mb-6 animate-fade-in hover-lift">
          <button
            onClick={onBack}
            className="flex items-center text-gray-700 hover:text-emerald-600 mb-4 transition-all font-semibold transform hover:translate-x-[-4px]"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Kembali ke Dashboard
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl md:text-3xl font-black bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                {editingId ? '✏️ Edit Data Calon Siswa' : '➕ Tambah Calon Siswa Baru'}
              </h2>
              <p className="text-gray-700 font-semibold mt-1">{selectedLembaga?.fullName}</p>
            </div>
            <div className={`hidden md:flex items-center justify-center w-16 h-16 bg-gradient-to-br ${selectedLembaga?.color} rounded-2xl shadow-xl hover:scale-110 transition-transform`}>
              {selectedLembaga && React.createElement(selectedLembaga.icon, { className: "w-8 h-8 text-white" })}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="glass rounded-3xl shadow-2xl p-4 md:p-6 mb-4 animate-fade-in hover-lift">
          <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
              <User className="w-5 h-5 text-white" />
            </div>
            Data Calon Siswa
          </h3>
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">👨‍👩‍👦 Nama Orang Tua *</label>
                <input
                  type="text"
                  name="namaOrangTua"
                  value={formData.namaOrangTua}
                  onChange={onFormChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 transition-all bg-white/50 backdrop-blur-sm font-medium"
                  placeholder="Masukkan nama orang tua"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">👤 Nama Calon Siswa *</label>
                <input
                  type="text"
                  name="namaSiswa"
                  value={formData.namaSiswa}
                  onChange={onFormChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 transition-all bg-white/50 backdrop-blur-sm font-medium"
                  placeholder="Masukkan nama siswa"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">📍 Tempat Lahir *</label>
                <input
                  type="text"
                  name="tempatLahir"
                  value={formData.tempatLahir}
                  onChange={onFormChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 transition-all bg-white/50 backdrop-blur-sm font-medium"
                  placeholder="Contoh: Bangka"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">📅 Tanggal Lahir *</label>
                <input
                  type="date"
                  name="tanggalLahir"
                  value={formData.tanggalLahir}
                  onChange={onFormChange}
                  aria-label="Tanggal Lahir"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 transition-all bg-white/50 backdrop-blur-sm font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">🆔 NIK *</label>
                <input
                  type="text"
                  name="nik"
                  value={formData.nik}
                  onChange={onFormChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 transition-all bg-white/50 backdrop-blur-sm font-medium"
                  placeholder="16 digit NIK"
                  maxLength={16}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">⚧ Jenis Kelamin *</label>
                <select
                  name="jenisKelamin"
                  value={formData.jenisKelamin}
                  onChange={onFormChange}
                  aria-label="Jenis Kelamin"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 transition-all bg-white/50 backdrop-blur-sm font-semibold"
                >
                  <option value="">Pilih</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">📱 Kontak Orang Tua (WhatsApp) *</label>
                <input
                  type="tel"
                  name="kontakOrtu"
                  value={formData.kontakOrtu}
                  onChange={onFormChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 transition-all bg-white/50 backdrop-blur-sm font-medium"
                  placeholder="0812xxxxx atau 62812xxxxx"
                  aria-label="Nomor WhatsApp Orang Tua"
                />
                <p className="text-xs text-gray-600 mt-1 font-medium">
                  💡 Format: 0812xxxxx atau 62812xxxxx (akan dinormalisasi otomatis)
                </p>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">🎓 Status Alumni</label>
                <select
                  name="alumni"
                  value={formData.alumni}
                  onChange={onFormChange}
                  aria-label="Status Alumni"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 transition-all bg-white/50 backdrop-blur-sm font-semibold"
                >
                  <option value="TIDAK">Tidak</option>
                  <option value="YA">Ya</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">📆 Tanggal Tes *</label>
                <input
                  type="date"
                  name="tanggalTes"
                  value={formData.tanggalTes}
                  onChange={onFormChange}
                  aria-label="Tanggal Tes"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 transition-all bg-white/50 backdrop-blur-sm font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">⏰ Jam Tes *</label>
                <input
                  type="time"
                  name="jamTes"
                  value={formData.jamTes}
                  onChange={onFormChange}
                  aria-label="Jam Tes"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 transition-all bg-white/50 backdrop-blur-sm font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">👔 Petugas TU *</label>
                {userRole === 'TU' ? (
                  <input
                    type="text"
                    value={formData.petugas}
                    readOnly
                    className="w-full px-4 py-3 border-2 border-emerald-300 bg-emerald-50 rounded-xl font-semibold text-gray-700 cursor-not-allowed"
                    placeholder="Auto-fill dari akun login"
                  />
                ) : (
                  <select
                    name="petugas"
                    value={formData.petugas}
                    onChange={onFormChange}
                    aria-label="Petugas TU"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 transition-all bg-white/50 backdrop-blur-sm font-semibold"
                  >
                    <option value="">Pilih Petugas</option>
                    {petugasList.map((p, i) => (
                      <option key={i} value={p.name}>{p.name} - {p.role}</option>
                    ))}
                  </select>
                )}
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">🏠 Status Asrama *</label>
                <select
                  name="asrama"
                  value={formData.asrama}
                  onChange={onFormChange}
                  aria-label="Status Asrama"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 transition-all bg-white/50 backdrop-blur-sm font-semibold"
                >
                  <option value="">Pilih Status</option>
                  <option value="NON ASRAMA">Non Asrama</option>
                  <option value="ASRAMA">Asrama</option>
                </select>
              </div>
            </div>


          </div>
        </div>

        {/* Submit Button */}
        <div className="sticky bottom-4 glass rounded-2xl shadow-2xl p-4 animate-fade-in">
          <button
            onClick={onSave}
            className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 text-white py-4 rounded-xl font-black text-lg hover:shadow-2xl transition-all transform hover:scale-[1.02] flex items-center justify-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative z-10 flex items-center">
              <Check className="w-6 h-6 mr-2" />
              {editingId ? '✏️ Update Data' : '💾 Simpan Data'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormScreen;

