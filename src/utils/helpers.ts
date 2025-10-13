import { Student, PenilaianData, UserRole, PenilaianScores, KelulusanStatus } from '../types';
import { penilaianSD, penilaianSMP, penilaianSMA } from '../data/constants';

// Fungsi untuk mendapatkan tahun ajaran (format: 2627)
// Bisa dioverride via:
// - localStorage: tahunAjaran (di-set dari Dashboard TU)
// - env: VITE_TAHUN_AJARAN=2627
const getTahunAjaran = (): string => {
  // Env override (mis. untuk memaksa 2627 pada transisi tahun)
  const envTa = (import.meta as any)?.env?.VITE_TAHUN_AJARAN as string | undefined;
  // LocalStorage override (prioritas lebih tinggi karena dikontrol via UI)
  try {
    const lsTa = typeof window !== 'undefined' ? window.localStorage.getItem('tahunAjaran') || '' : '';
    if (/^\d{4}$/.test(lsTa)) return lsTa;
  } catch { /* noop */ }
  if (envTa && /^\d{4}$/.test(envTa)) return envTa;

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 1-12

  // Default aturan akademik: mulai Juli (7)
  const tahunMulai = month >= 7 ? year : year - 1;
  const tahunAkhir = tahunMulai + 1;

  const tahunMulaiStr = tahunMulai.toString().slice(-2);
  const tahunAkhirStr = tahunAkhir.toString().slice(-2);
  return `${tahunMulaiStr}${tahunAkhirStr}`;
};

export const generateNoTes = (lembagaId: string, registeredStudents: Student[]): string => {
  const tahunAjaran = getTahunAjaran();
  
  // Tentukan prefix berdasarkan lembaga ID
  let prefix = '';
  switch (lembagaId) {
    case 'SDITA':
      prefix = 'SD';
      break;
    case 'SMPITA':
      prefix = 'SMP';
      break;
    case 'SMAITA':
      prefix = 'SMA';
      break;
    default:
      prefix = lembagaId;
  }
  
  // Filter siswa dengan lembaga yang sama
  const existingNumbers = registeredStudents
    .filter(s => s.lembaga === lembagaId)
    .map(s => {
      // Parse nomor urut dari format: SD-2627-001
      const parts = s.noTes.split('-');
      if (parts.length === 3) {
        return parseInt(parts[2]);
      }
      return 0;
    })
    .filter(n => !isNaN(n) && n > 0);
  
  const nextNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;
  
  // Format: SD-2627-001
  return `${prefix}-${tahunAjaran}-${nextNumber.toString().padStart(3, '0')}`;
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
  filterStatus: string,
  searchQuery: string,
  userRole: UserRole
): Student[] => {
  let filtered = students;

  if (filterLembaga !== 'ALL') {
    filtered = filtered.filter(s => s.lembaga === filterLembaga);
  }

  if (filterStatus !== 'ALL') {
    if (filterStatus === 'LULUS' || filterStatus === 'TIDAK LULUS') {
      filtered = filtered.filter(s => s.kelulusan === filterStatus);
    } else if (filterStatus === 'SUDAH DIUJI') {
      filtered = filtered.filter(s => s.status === 'SUDAH DIUJI');
    } else if (filterStatus === 'BELUM DIUJI') {
      filtered = filtered.filter(s => s.status === 'BELUM DIUJI');
    }
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

// Hitung kelulusan berdasarkan bobot:
// - Wawancara (gabungan penilaian anak+ortu, skala 1-5 -> 100): 30%
// - Tes Matematika (benar dari 5): 35%
// - Tes Hafalan (benar dari 15): 35%
// KKM: 70
export const calculateKelulusan = (
  penilaianAnak: PenilaianScores,
  penilaianOrtu: PenilaianScores,
  mathCorrect: number,
  hafalanBenar: number
): {
  finalScore: number;
  status: KelulusanStatus;
  breakdown: { interview: number; math: number; hafalan: number };
} => {
  // Clamp input ranges
  const mathBenar = Math.max(0, Math.min(5, Math.round(mathCorrect)));
  const hafalanOk = Math.max(0, Math.min(15, Math.round(hafalanBenar)));

  const anakScores = Object.values(penilaianAnak || {});
  const ortuScores = Object.values(penilaianOrtu || {});
  const allInterviewScores = [...anakScores, ...ortuScores];

  let interviewPercent = 0;
  if (allInterviewScores.length > 0) {
    const avg = allInterviewScores.reduce((sum, v) => sum + v, 0) / allInterviewScores.length;
    interviewPercent = (avg / 5) * 100; // normalize 1-5 to 0-100
  }

  const mathPercent = (mathBenar / 5) * 100;
  const hafalanPercent = (hafalanOk / 15) * 100;

  const weightedInterview = interviewPercent * 0.30;
  const weightedMath = mathPercent * 0.35;
  const weightedHafalan = hafalanPercent * 0.35;

  const finalScoreRaw = weightedInterview + weightedMath + weightedHafalan;
  const finalScore = Math.round(finalScoreRaw * 100) / 100; // 2 decimal places
  const status: KelulusanStatus = finalScore >= 70 ? 'LULUS' : 'TIDAK LULUS';

  return {
    finalScore,
    status,
    breakdown: {
      interview: Math.round(interviewPercent * 100) / 100,
      math: Math.round(mathPercent * 100) / 100,
      hafalan: Math.round(hafalanPercent * 100) / 100
    }
  };
};

