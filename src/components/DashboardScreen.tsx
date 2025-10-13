import React from 'react';
import { LogOut, School, Calendar, FileText, Edit, Trash2, UserCheck, Eye, ClipboardList, Search, Settings, User as UserIcon, MessageCircle } from 'lucide-react';
import { UserRole, Student, LembagaData, User } from '../types';
import { downloadKartuPeserta, sendViaWhatsApp } from '../utils/pdfGenerator';
import { supabase } from '../lib/supabase';

interface DashboardScreenProps {
  userRole: UserRole;
  currentUser: User | null;
  registeredStudents: Student[];
  lembagaData: LembagaData[];
  filterLembaga: string;
  filterStatus: string;
  searchQuery: string;
  filteredStudents: Student[];
  onLogout: () => void;
  onAddStudent: (lembaga: LembagaData) => void;
  onEditStudent: (student: Student) => void;
  onDeleteStudent: (id: string) => void;
  onStartPenilaian: (student: Student) => void;
  onFilterLembagaChange: (value: string) => void;
  onFilterStatusChange: (value: string) => void;
  onSearchQueryChange: (value: string) => void;
  onOpenAdmin: () => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({
  userRole,
  currentUser,
  // registeredStudents, // not used in this component directly
  lembagaData,
  filterLembaga,
  filterStatus,
  searchQuery,
  filteredStudents,
  onLogout,
  onAddStudent,
  onEditStudent,
  onDeleteStudent,
  onStartPenilaian,
  onFilterLembagaChange,
  onFilterStatusChange,
  onSearchQueryChange,
  onOpenAdmin
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-teal-400 to-blue-500 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 relative z-10">
        {/* Header */}
        <div className="glass rounded-3xl shadow-2xl p-4 md:p-6 mb-6 animate-fade-in hover-lift">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                Dashboard {userRole === 'TU' ? 'Tata Usaha' : userRole === 'PENGUJI' ? 'Penguji' : 'Administrator'}
              </h1>
              <p className="text-gray-700 font-medium">SPMB Ponpes IC At Tauhid</p>
              {currentUser && (
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-1.5 rounded-full shadow-lg">
                    <UserIcon className="w-4 h-4 text-white" />
                    <span className="text-sm font-bold text-white">{currentUser.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-gray-600 bg-white px-2 py-1 rounded-full">
                    {currentUser.role}
                  </span>
                </div>
              )}
            </div>
          <div className="flex items-center gap-2">
            {/* Atur Tahun Ajaran (TU Only) */}
            {userRole === 'TU' && (
              <div className="hidden md:flex items-center gap-2 mr-2">
                <label htmlFor="tahunAjaran" className="text-sm text-gray-700">Tahun Ajaran</label>
                <input
                  id="tahunAjaran"
                  type="text"
                  inputMode="numeric"
                  pattern="\\d{4}"
                  defaultValue={(typeof window !== 'undefined' && window.localStorage.getItem('tahunAjaran')) || ''}
                  onBlur={async (e) => {
                    const v = e.currentTarget.value.trim();
                    if (/^\d{4}$/.test(v)) {
                      window.localStorage.setItem('tahunAjaran', v);
                      
                      // Simpan ke Supabase juga untuk sinkronisasi global
                      try {
                        const { error } = await supabase
                          .from('app_settings')
                          .upsert({ key: 'tahun_ajaran', value: v });
                        
                        if (error) {
                          console.warn('Gagal menyimpan Tahun Ajaran ke database:', error);
                      // Toast disediakan dari App; opsional untuk production build
                        } else {
                          // noop
                        }
                      } catch (err) {
                        console.warn('Error saving tahun ajaran to Supabase:', err);
                      }
                      
                      setTimeout(() => window.location.reload(), 1000);
                    } else if (v !== '') {
                      // noop: format invalid
                    }
                  }}
                  placeholder="2627"
                  className="w-20 px-2 py-1 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 text-sm"
                  title="Format 4 digit, mis. 2627"
                />
              </div>
            )}
              {currentUser?.role === 'ADMIN' && (
                <button
                  onClick={onOpenAdmin}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all transform hover:scale-105 font-semibold"
                >
                  <Settings className="w-5 h-5" />
                  <span className="hidden md:inline">Kelola User</span>
                </button>
              )}
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:shadow-xl transition-all transform hover:scale-105 font-semibold"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden md:inline">Keluar</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-5 rounded-2xl shadow-lg hover-lift transform transition-all">
              <div className="text-white/90 text-sm font-semibold mb-1">
                {filterLembaga === 'ALL' ? 'Total Pendaftar' : `Pendaftar ${lembagaData.find(l => l.id === filterLembaga)?.name || 'Lembaga'}`}
              </div>
              <div className="text-3xl font-black text-white">{filteredStudents.length}</div>
              <div className="mt-2 h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white/80 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-5 rounded-2xl shadow-lg hover-lift transform transition-all">
              <div className="text-white/90 text-sm font-semibold mb-1">Sudah Diuji</div>
              <div className="text-3xl font-black text-white">
                {filteredStudents.filter(s => s.status === 'SUDAH DIUJI').length}
              </div>
              <div className="mt-2 h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white/80 rounded-full transition-all" style={{ width: `${(filteredStudents.filter(s => s.status === 'SUDAH DIUJI').length / Math.max(filteredStudents.length, 1)) * 100}%` }}></div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-5 rounded-2xl shadow-lg hover-lift transform transition-all">
              <div className="text-white/90 text-sm font-semibold mb-1">Belum Diuji</div>
              <div className="text-3xl font-black text-white">
                {filteredStudents.filter(s => s.status === 'BELUM DIUJI').length}
              </div>
              <div className="mt-2 h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white/80 rounded-full transition-all" style={{ width: `${(filteredStudents.filter(s => s.status === 'BELUM DIUJI').length / Math.max(filteredStudents.length, 1)) * 100}%` }}></div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-5 rounded-2xl shadow-lg hover-lift transform transition-all">
              <div className="text-white/90 text-sm font-semibold mb-1">Tes Hari Ini</div>
              <div className="text-3xl font-black text-white">
                {filteredStudents.filter(s => s.data.tanggalTes === new Date().toISOString().split('T')[0]).length}
              </div>
              <div className="mt-2 h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white/80 rounded-full transition-all" style={{ width: `${(filteredStudents.filter(s => s.data.tanggalTes === new Date().toISOString().split('T')[0]).length / Math.max(filteredStudents.length, 1)) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Student Button (TU Only) */}
        {userRole === 'TU' && (
          <div className="mb-6 animate-fade-in">
            <h2 className="text-xl font-bold text-white mb-4 drop-shadow-lg">Tambah Calon Siswa Baru</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {lembagaData.map((lembaga) => {
                const Icon = lembaga.icon;
                return (
                  <button
                    key={lembaga.id}
                    onClick={() => onAddStudent(lembaga)}
                    className="glass hover:scale-105 rounded-2xl p-5 transition-all transform hover:shadow-2xl group"
                  >
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${lembaga.color} rounded-xl mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-sm font-bold text-gray-800 group-hover:text-emerald-700 transition-colors">{lembaga.name}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="glass rounded-2xl shadow-xl p-4 mb-6 animate-fade-in">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 w-5 h-5 transition-colors" />
                <input
                  type="text"
                  placeholder="Cari nama siswa, orang tua, atau no. tes..."
                  value={searchQuery}
                  onChange={(e) => onSearchQueryChange(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 transition-all bg-white/50 backdrop-blur-sm font-medium"
                />
              </div>
            </div>
            <div className="w-full md:w-56">
              <select
                value={filterLembaga}
                onChange={(e) => onFilterLembagaChange(e.target.value)}
                aria-label="Filter Lembaga"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 transition-all bg-white/50 backdrop-blur-sm font-semibold"
              >
                <option value="ALL">🏫 Semua Lembaga</option>
                {lembagaData.map(l => (
                  <option key={l.id} value={l.id}>{l.name}</option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-56">
              <select
                value={filterStatus}
                onChange={(e) => onFilterStatusChange(e.target.value)}
                aria-label="Filter Status"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 transition-all bg-white/50 backdrop-blur-sm font-semibold"
              >
                <option value="ALL">📊 Semua Status</option>
                <option value="BELUM DIUJI">🔴 Belum Diuji</option>
                <option value="SUDAH DIUJI">🟡 Sudah Diuji</option>
                <option value="LULUS">🟢 Lulus</option>
                <option value="TIDAK LULUS">🔴 Tidak Lulus</option>
              </select>
            </div>
          </div>
        </div>

        {/* Students List */}
        <div className="glass rounded-2xl shadow-xl p-4 md:p-6 animate-fade-in">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent mb-6">
            {userRole === 'PENGUJI' ? '📅 Jadwal Tes Hari Ini' : '📋 Daftar Calon Siswa'}
          </h2>
          
          {filteredStudents.length === 0 ? (
            <div className="text-center py-16 animate-scale-in">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ClipboardList className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-600 font-semibold text-lg">
                {userRole === 'PENGUJI' ? 'Tidak ada jadwal tes hari ini' : 'Belum ada data pendaftaran'}
              </p>
              <p className="text-gray-400 text-sm mt-2">Silakan tambahkan data calon siswa baru</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredStudents.map((student, index) => {
                const lembaga = lembagaData.find(l => l.id === student.lembaga);
                const Icon = lembaga?.icon || School;
                
                return (
                  <div key={student.id} className="bg-white/60 backdrop-blur-sm border-2 border-white rounded-2xl p-5 hover:shadow-xl transition-all transform hover:scale-[1.01] group animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                    <div className="flex items-start gap-4">
                      <div className={`hidden md:flex items-center justify-center w-14 h-14 bg-gradient-to-br ${lembaga?.color} rounded-xl flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div>
                            <h3 className="font-black text-gray-800 text-xl mb-1">{student.data.namaSiswa}</h3>
                            <p className="text-sm text-gray-600 font-medium">👨‍👩‍👦 {student.data.namaOrangTua}</p>
                          </div>
                          <span className={`px-4 py-2 rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 ${
                            student.status === 'SUDAH DIUJI' 
                              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                              : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                          }`}>
                            {student.status === 'SUDAH DIUJI' ? '✓' : '○'}
                            {student.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-emerald-600" />
                            <span className="font-medium">{student.noTes}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <School className="w-4 h-4 text-emerald-600" />
                            <span>{lembaga?.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-emerald-600" />
                            <span>{student.data.tanggalTes} - {student.data.jamTes}</span>
                          </div>
                        </div>

                        {/* Petugas TU dari data siswa (sinkron dengan daftar TU Admin) */}
                        {(student.data.petugas || student.data.petugasCadangan) && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                            {student.data.petugas && (
                              <div className="flex items-center gap-2">
                                <UserIcon className="w-4 h-4 text-emerald-600" />
                                <span>Petugas: {student.data.petugas}</span>
                              </div>
                            )}
                            {student.data.petugasCadangan && (
                              <div className="flex items-center gap-2">
                                <UserCheck className="w-4 h-4 text-emerald-600" />
                                <span>Cadangan: {student.data.petugasCadangan}</span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Informasi Penguji */}
                        {student.status === 'SUDAH DIUJI' && student.penguji && (
                          <div className="mb-3">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <UserCheck className="w-4 h-4 text-blue-600" />
                              <span className="font-medium">Diuji oleh: <span className="text-blue-600 font-bold">{student.penguji}</span></span>
                            </div>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2">
                          {userRole === 'TU' && (
                            <>
                              <button
                                onClick={() => onEditStudent(student)}
                                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all transform hover:scale-105 text-sm font-semibold"
                              >
                                <Edit className="w-4 h-4" />
                                Edit
                              </button>
                              <button
                                onClick={() => onDeleteStudent(student.id)}
                                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all transform hover:scale-105 text-sm font-semibold"
                              >
                                <Trash2 className="w-4 h-4" />
                                Hapus
                              </button>
                            </>
                          )}
                          {userRole === 'PENGUJI' && (
                            <button
                              onClick={() => onStartPenilaian(student)}
                              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:shadow-lg transition-all transform hover:scale-105 text-sm font-bold"
                            >
                              {student.status === 'SUDAH DIUJI' ? (
                                <>
                                  <Eye className="w-4 h-4" />
                                  Lihat Penilaian
                                </>
                              ) : (
                                <>
                                  <UserCheck className="w-4 h-4" />
                                  Mulai TES
                                </>
                              )}
                            </button>
                          )}
                          {/* Aksi Kartu: Download PDF & Kirim WhatsApp */}
                          <button
                            onClick={() => downloadKartuPeserta(student)}
                            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:shadow-lg transition-all transform hover:scale-105 text-sm font-semibold"
                            aria-label="Download Kartu Peserta PDF"
                          >
                            <FileText className="w-4 h-4" />
                            PDF
                          </button>
                          <button
                            onClick={() => sendViaWhatsApp(student)}
                            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all transform hover:scale-105 text-sm font-semibold"
                            aria-label="Kirim WhatsApp ke Orang Tua"
                          >
                            <MessageCircle className="w-4 h-4" />
                            WA
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;

