import { BookOpen, GraduationCap, School } from 'lucide-react';
import { LembagaData, Petugas, Penguji, PenilaianData } from '../types';

export const lembagaData: LembagaData[] = [
  {
    id: 'SDITA',
    name: 'SDITA',
    fullName: 'SD Islam Terpadu At Tauhid',
    icon: School,
    color: 'from-blue-500 to-blue-600',
    prefix: 'SD'
  },
  {
    id: 'SMPITA',
    name: 'SMPITA',
    fullName: 'SMP Islam Terpadu At Tauhid',
    icon: BookOpen,
    color: 'from-green-500 to-green-600',
    prefix: 'SMP'
  },
  {
    id: 'SMAITA',
    name: 'SMAITA',
    fullName: 'SMA Islam Terpadu At Tauhid',
    icon: GraduationCap,
    color: 'from-purple-500 to-purple-600',
    prefix: 'SMA'
  }
];

export const petugasList: Petugas[] = [
  { name: 'Satria', role: 'TU SDITA' },
  { name: 'Nanda', role: 'TU SMPITA' },
  { name: 'Supian', role: 'TU MTA / SMAITA' }
];

export const pengujiList: Penguji[] = [
  { name: 'Subrian Muji', role: 'PENGUJI AT TAUHID' },
  { name: 'Heri Febri', role: 'PENGUJI AT TAUHID' },
  { name: 'Faturahman', role: 'PENGUJI AT TAUHID' },
  { name: 'Akbar Wiguna', role: 'PENGUJI AT TAUHID' },
  { name: 'Azali Ahmad', role: 'PENGUJI ICT' },
  { name: 'Delly', role: 'PENGUJI ICT' },
  { name: 'Meditoma', role: 'PENGUJI ICT' },
  { name: 'Randhy Raviza', role: 'PENGUJI ICT' },
  { name: 'Yasser', role: 'PENGUJI ICT' },
  { name: 'Nayotama', role: 'PENGUJI ICT' }
];

export const penilaianSD: PenilaianData = {
  anak: [
    'Bangun Pagi',
    'Sholat Lima Waktu',
    'Iqra (menyimak bacaan Iqra)',
    'Pengenalan huruf Hijaiyah',
    'Jumlah Hafalan',
    'Penilaian Bacaan hafalan',
    'Penilaian Tajwid hafalan',
    'Bersedia Menghafal Al Qur\'an Setiap Hari',
    'Pengenalan abjad dan angka',
    'Kemampuan Membaca',
    'Kemampuan Menulis',
    'Kemampuan Berhitung',
    'Meninggalkan HP Game, Musik, Nonton Film'
  ],
  ortu: [
    'Penampilan orang tua',
    'Sikap orang tua jika anak tidak sholat 5 waktu',
    'Tipe anak (cari Info dari orang tua)',
    'Kajian yang diikuti orang tua',
    'Kesanggupan orang tua mengikuti kajian dan Program Tahsin Wali Santri',
    'Alasan memilih sekolah di At Tauhid',
    'Pernyataan sanggup sekolah meski kurikulumnya berat',
    'Komitmen melarang anak menonton tayangan tidak mendidik',
    'Prestasi yang diraih di Sekolah',
    'Cara orang tua agar anak bisa menghafal',
    'Kesanggupan membimbing anak menghafal di rumah',
    'Kesanggupan melunasi uang pangkal',
    'Kesanggupan membayar biaya tambahan kegiatan',
    'Kesanggupan melunasi biaya daftar ulang',
    'Sikap terhadap uang pangkal tidak bisa dikembalikan',
    'Kesanggupan mentaati semua aturan sekolah',
    'Penilaian terhadap Anak',
    'Penilaian terhadap orang tua',
    'Pekerjaan orang tua',
    'Riwayat Penyakit calon Santri',
    'Peraturan kredit poin'
  ]
};

export const penilaianSMP: PenilaianData = {
  anak: [
    'Bangun Pagi',
    'Sholat Lima Waktu',
    'Rutinitas Baca Al Qur\'an',
    'Kemampuan Baca Al Qur\'an | TES BACA QUR\'AN',
    'Jumlah Hafalan',
    'Nilai Tugas Hafalan',
    'Nilai Tajwid',
    'Bersedia Menghafal Al Qur\'an sesuai target Setiap hari',
    'Bersedia diberi sanksi jika tidak menghafal',
    'Kegiatan di rumah setelah isya dan Setelah subuh',
    'Alasan memilih sekolah di At Tauhid',
    'Komitmen tidak memiliki HP secara pribadi',
    'Komitmen untuk menaati semua aturan pondok',
    'Prestasi yang pernah diraih'
  ],
  ortu: [
    'Penampilan orang tua',
    'Sikap orang tua jika anak tidak sholat 5 waktu',
    'Tipe anak (cari Info dari orang tua)',
    'Kajian yang diikuti orang tua',
    'Kesanggupan mengikuti kajian dan Program Tahsin Wali Santri',
    'Alasan memilih sekolah di At Tauhid',
    'Pernyataan sanggup sekolah meski kurikulumnya berat',
    'Komitmen tidak memberikan HP kepada anak',
    'Cara orang tua agar anak bisa menghafal',
    'Komitmen membantu membimbing anak menghafal di rumah',
    'Kesanggupan melunasi uang pangkal',
    'Kesanggupan membayar biaya tambahan kegiatan',
    'Kesanggupan melunasi biaya daftar ulang Rp. 600.000',
    'Sikap terhadap uang pangkal tidak bisa dikembalikan',
    'Kesanggupan mentaati semua aturan sekolah',
    'Sikap terhadap Peraturan kredit poin',
    'Sikap terhadap SPP paling lambat tgl 10',
    'Penilaian terhadap Anak',
    'Penilaian terhadap orang tua',
    'Riwayat Penyakit calon Santri',
    'Pekerjaan orang tua'
  ]
};

export const penilaianSMA: PenilaianData = {
  anak: [
    'Bangun Pagi',
    'Sholat Lima Waktu',
    'Rutinitas Baca Al Qur\'an',
    'Kemampuan Baca Al Qur\'an | TES BACA QUR\'AN',
    'Jumlah Hafalan',
    'Nilai Tugas Hafalan',
    'Nilai Tajwid',
    'Bersedia Menghafal Al Qur\'an sesuai target Setiap hari',
    'Kegiatan di rumah setelah isya dan Setelah subuh',
    'Alasan memilih sekolah di At Tauhid',
    'Komitmen Tidak Menonton Tayangan Tidak Mendidik',
    'Komitmen untuk menaati semua aturan pondok',
    'Prestasi yang pernah diraih'
  ],
  ortu: [
    'Penampilan orang tua',
    'Sikap orang tua jika anak tidak sholat 5 waktu',
    'Tipe anak (cari Info dari orang tua)',
    'Kajian yang diikuti orang tua',
    'Kesanggupan mengikuti kajian dan Program Tahsin Wali Santri',
    'Alasan memilih sekolah di At Tauhid',
    'Pernyataan sanggup sekolah meski kurikulumnya berat',
    'Komitmen tidak memberikan HP kepada anak',
    'Cara orang tua agar anak bisa menghafal',
    'Komitmen membantu membimbing anak menghafal di rumah',
    'Kesanggupan melunasi uang pangkal',
    'Kesanggupan membayar biaya tambahan kegiatan',
    'Kesanggupan melunasi biaya daftar ulang Rp. 600.000',
    'Sikap terhadap uang pangkal tidak bisa dikembalikan',
    'Kesanggupan mentaati semua aturan sekolah',
    'Sikap terhadap Peraturan kredit poin',
    'Sikap terhadap SPP paling lambat tgl 10',
    'Sikap terhadap Peraturan Pengabdian santri',
    'Sikap terhadap Ijazah pondok diberikan setelah 1 tahun',
    'Penilaian terhadap Anak',
    'Penilaian terhadap orang tua',
    'Riwayat Penyakit calon Santri',
    'Pekerjaan orang tua'
  ]
};

