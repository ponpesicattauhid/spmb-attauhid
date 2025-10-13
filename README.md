# SPMB Ponpes IC At Tauhid

Sistem Penerimaan Murid Baru untuk Pondok Pesantren IC At Tauhid, Bangka Belitung.

## ✨ Fitur Utama

### 🔐 Autentikasi
- **Tata Usaha (TU)**: Input dan kelola data pendaftaran
- **Penguji**: Lakukan penilaian calon murid

### 📋 Manajemen Data Murid
- Input data calon murid baru
- Edit data murid yang sudah terdaftar
- Hapus data murid
- Pencarian dan filter berdasarkan lembaga
- Auto-generate nomor tes dengan format: `{LEMBAGA}-{TAHUN_AJARAN}-{NO_URUT}`
  - Contoh: `SD-2526-001`, `SMP-2526-002`, `SMA-2526-003`

### 🏫 Lembaga
- SD Islam Terpadu At Tauhid (SDITA)
- SMP Islam Terpadu At Tauhid (SMPITA)
- SMA Islam Terpadu At Tauhid (SMAITA)

### 📊 Penilaian
- Sistem penilaian dengan skala 1-5
- Penilaian untuk calon murid (pertanyaan anak)
- Penilaian untuk orang tua

### 📄 Kartu Peserta
- **Download PDF**: Download kartu peserta dalam format PDF yang profesional
- **Kirim via WhatsApp**: Kirim informasi jadwal tes langsung ke nomor WhatsApp orang tua

### 🔔 Notifikasi
- Notifikasi sukses saat menyimpan data
- Notifikasi saat mengedit data
- Notifikasi saat menghapus data
- Notifikasi saat menyimpan penilaian

## 🚀 Instalasi

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev

# Build untuk production
npm run build
```

## 📱 Cara Penggunaan

### Login
1. Pilih role: **Tata Usaha (TU)** atau **Penguji**

### Tata Usaha (TU)
1. Pilih lembaga untuk menambah calon murid baru
2. Isi form pendaftaran lengkap
3. Klik **Simpan Data**
4. Nomor tes akan di-generate otomatis

### Download & Kirim Kartu Peserta
1. Di dashboard, klik tombol **PDF** untuk download kartu peserta
2. Klik tombol **WhatsApp** untuk mengirim informasi ke orang tua via WhatsApp
3. Kartu peserta berisi:
   - Nomor tes
   - Data lengkap calon murid
   - Jadwal tes (tanggal, jam, tempat)
   - Catatan penting

### Penguji
1. Lihat jadwal tes hari ini
2. Klik **Mulai Penilaian** untuk memberikan penilaian
3. Beri nilai 1-5 untuk setiap pertanyaan
4. Klik **Simpan Penilaian**

## 🛠️ Teknologi

- **React 18** dengan TypeScript
- **Vite** untuk build tool
- **Tailwind CSS** untuk styling
- **Lucide React** untuk icons
- **jsPDF** untuk generate PDF
- **WhatsApp API** untuk integrasi WhatsApp

## 📂 Struktur Project

```
src/
├── components/          # Komponen React
│   ├── LoginScreen.tsx
│   ├── DashboardScreen.tsx
│   ├── FormScreen.tsx
│   ├── PenilaianScreen.tsx
│   └── Toast.tsx
├── data/               # Data statis
│   └── constants.ts
├── hooks/              # Custom hooks
│   └── useStudentData.ts
├── types/              # TypeScript types
│   └── index.ts
├── utils/              # Utility functions
│   ├── helpers.ts
│   └── pdfGenerator.ts
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## 📋 Format Nomor Tes

Format: `{LEMBAGA}-{TAHUN_AJARAN}-{NO_URUT}`

- **LEMBAGA**: SD, SMP, atau SMA
- **TAHUN_AJARAN**: 2 digit tahun mulai + 2 digit tahun akhir (contoh: 2526 untuk tahun ajaran 2025/2026)
- **NO_URUT**: 3 digit nomor urut (001, 002, 003, ...)

### Contoh:
- `SD-2526-001` - Murid SD pertama tahun ajaran 2025/2026
- `SMP-2526-001` - Murid SMP pertama tahun ajaran 2025/2026
- `SMA-2526-015` - Murid SMA ke-15 tahun ajaran 2025/2026

## 📱 Format WhatsApp

Pesan WhatsApp akan berisi:
- Nomor tes
- Data calon murid
- Jadwal tes lengkap
- Catatan penting untuk peserta

## 🎨 Desain

Aplikasi menggunakan desain minimalis, modern, dan professional dengan:
- Color scheme: Emerald green sebagai warna utama
- Responsive design untuk semua ukuran layar
- Smooth animations dan transitions
- Clean dan intuitive user interface

## 📝 Lisensi

© 2024 Pondok Pesantren IC At Tauhid, Bangka Belitung