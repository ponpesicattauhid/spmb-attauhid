import React from 'react';
import { ChevronLeft, Check, User } from 'lucide-react';
import { FormData, LembagaData, Petugas } from '../types';

interface FormScreenProps {
  selectedLembaga: LembagaData | null;
  formData: FormData;
  editingId: string | null;
  petugasList: Petugas[];
  onBack: () => void;
  onSave: () => void;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const FormScreen: React.FC<FormScreenProps> = ({
  selectedLembaga,
  formData,
  editingId,
  petugasList,
  onBack,
  onSave,
  onFormChange
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 pb-6">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-emerald-600 mb-4 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Kembali ke Dashboard
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                {editingId ? 'Edit Data Calon Siswa' : 'Tambah Calon Siswa Baru'}
              </h2>
              <p className="text-gray-600">{selectedLembaga?.fullName}</p>
            </div>
            <div className={`hidden md:flex items-center justify-center w-12 h-12 bg-gradient-to-br ${selectedLembaga?.color} rounded-xl`}>
              {selectedLembaga && React.createElement(selectedLembaga.icon, { className: "w-6 h-6 text-white" })}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-emerald-600" />
            Data Calon Siswa
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Orang Tua *</label>
                <input
                  type="text"
                  name="namaOrangTua"
                  value={formData.namaOrangTua}
                  onChange={onFormChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Masukkan nama orang tua"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Calon Siswa *</label>
                <input
                  type="text"
                  name="namaSiswa"
                  value={formData.namaSiswa}
                  onChange={onFormChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Masukkan nama siswa"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tempat Lahir *</label>
                <input
                  type="text"
                  name="tempatLahir"
                  value={formData.tempatLahir}
                  onChange={onFormChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Contoh: Bangka"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Lahir *</label>
                <input
                  type="date"
                  name="tanggalLahir"
                  value={formData.tanggalLahir}
                  onChange={onFormChange}
                  aria-label="Tanggal Lahir"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">NIK *</label>
                <input
                  type="text"
                  name="nik"
                  value={formData.nik}
                  onChange={onFormChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="16 digit NIK"
                  maxLength={16}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Kelamin *</label>
                <select
                  name="jenisKelamin"
                  value={formData.jenisKelamin}
                  onChange={onFormChange}
                  aria-label="Jenis Kelamin"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="">Pilih</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kontak Orang Tua *</label>
                <input
                  type="tel"
                  name="kontakOrtu"
                  value={formData.kontakOrtu}
                  onChange={onFormChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="+62 xxx-xxxx-xxxx"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status Alumni</label>
                <select
                  name="alumni"
                  value={formData.alumni}
                  onChange={onFormChange}
                  aria-label="Status Alumni"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="TIDAK">Tidak</option>
                  <option value="YA">Ya</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Tes *</label>
                <input
                  type="date"
                  name="tanggalTes"
                  value={formData.tanggalTes}
                  onChange={onFormChange}
                  aria-label="Tanggal Tes"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jam Tes *</label>
                <input
                  type="time"
                  name="jamTes"
                  value={formData.jamTes}
                  onChange={onFormChange}
                  aria-label="Jam Tes"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Petugas TU *</label>
                <select
                  name="petugas"
                  value={formData.petugas}
                  onChange={onFormChange}
                  aria-label="Petugas TU"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="">Pilih Petugas</option>
                  {petugasList.map((p, i) => (
                    <option key={i} value={p.name}>{p.name} - {p.role}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Petugas Cadangan</label>
                <select
                  name="petugasCadangan"
                  value={formData.petugasCadangan}
                  onChange={onFormChange}
                  aria-label="Petugas Cadangan"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="">Pilih Petugas Cadangan</option>
                  {petugasList.map((p, i) => (
                    <option key={i} value={p.name}>{p.name} - {p.role}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="sticky bottom-0 bg-white rounded-2xl shadow-lg p-4 border-t-2 border-emerald-100">
          <button
            onClick={onSave}
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3.5 rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
          >
            <Check className="w-5 h-5 mr-2" />
            {editingId ? 'Update Data' : 'Simpan Data'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormScreen;

