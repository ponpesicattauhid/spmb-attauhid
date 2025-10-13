import { Student, PenilaianData, UserRole } from '../types';
import { penilaianSD, penilaianSMP, penilaianSMA } from '../data/constants';

export const generateNoTes = (prefix: string, registeredStudents: Student[]): string => {
  const existingNumbers = registeredStudents
    .filter(s => s.lembaga === prefix)
    .map(s => parseInt(s.noTes.split('-')[2]))
    .filter(n => !isNaN(n));
  
  const nextNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;
  return `${prefix}-2627-${nextNumber.toString().padStart(3, '0')}`;
};

export const getPenilaianByLembaga = (lembagaId: string): PenilaianData => {
  switch (lembagaId) {
    case 'SDITA':
      return penilaianSD;
    case 'SMPITA':
      return penilaianSMP;
    case 'SMAITA':
      return penilaianSMA;
    default:
      return penilaianSMP;
  }
};

export const getFilteredStudents = (
  students: Student[],
  filterLembaga: string,
  searchQuery: string,
  userRole: UserRole
): Student[] => {
  let filtered = students;

  if (filterLembaga !== 'ALL') {
    filtered = filtered.filter(s => s.lembaga === filterLembaga);
  }

  if (searchQuery) {
    filtered = filtered.filter(s => 
      s.data.namaSiswa.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.data.namaOrangTua.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.noTes.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (userRole === 'PENGUJI') {
    const today = new Date().toISOString().split('T')[0];
    filtered = filtered.filter(s => s.data.tanggalTes === today);
  }

  return filtered;
};

export const getInitialFormData = () => ({
  namaOrangTua: '',
  namaSiswa: '',
  tempatLahir: '',
  tanggalLahir: '',
  nik: '',
  jenisKelamin: '',
  kontakOrtu: '',
  tanggalTes: '',
  jamTes: '',
  alumni: 'TIDAK' as const,
  petugas: '',
  petugasCadangan: ''
});

