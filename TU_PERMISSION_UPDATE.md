# Update Permission TU untuk Download Surat Keterangan

## Perubahan yang Dilakukan

### ✅ Akses Download Surat Keterangan untuk TU
- **Role yang diizinkan**: TU dan ADMIN
- **Kondisi**: Siswa sudah diuji dan memiliki status kelulusan
- **Lokasi**: DashboardScreen.tsx

## Detail Perubahan

### Sebelum
```typescript
{student.kelulusan && (
  <button onClick={() => downloadSuratKeterangan(student)}>
    Surat Keterangan
  </button>
)}
```

### Sesudah
```typescript
{student.kelulusan && (userRole === 'TU' || userRole === 'ADMIN') && (
  <button onClick={() => downloadSuratKeterangan(student)}>
    Surat Keterangan
  </button>
)}
```

## Akses Berdasarkan Role

### 👔 TU (Tata Usaha)
- ✅ **Dapat download surat keterangan**
- ✅ Dapat melihat semua siswa
- ✅ Dapat edit dan hapus data siswa
- ✅ Dapat export data ke Excel/PDF
- ✅ Dapat download kartu peserta
- ✅ Dapat kirim WhatsApp

### 👨‍🏫 PENGUJI
- ❌ **Tidak dapat download surat keterangan**
- ✅ Dapat melihat semua siswa
- ✅ Dapat melakukan penilaian
- ✅ Dapat download kartu peserta
- ✅ Dapat kirim WhatsApp

### 👨‍💼 ADMIN
- ✅ **Dapat download surat keterangan**
- ✅ Akses penuh ke semua fitur
- ✅ Dapat mengelola user
- ✅ Dapat export dan download semua dokumen

## Kondisi Download Surat Keterangan

### Syarat Wajib
1. **Status siswa**: `SUDAH DIUJI`
2. **Status kelulusan**: Harus ada (LULUS/TIDAK LULUS)
3. **Role user**: TU atau ADMIN

### Alur Kerja
1. TU melakukan input data siswa
2. PENGUJI melakukan penilaian
3. Sistem menghitung kelulusan otomatis
4. TU dapat download surat keterangan untuk siswa yang sudah ada kelulusannya

## Keamanan

### ✅ Permission Control
- Hanya TU dan ADMIN yang bisa download surat keterangan
- PENGUJI tidak bisa download surat keterangan (fokus pada penilaian)
- Semua role tetap bisa download kartu peserta

### 🔒 Data Protection
- Surat keterangan hanya bisa didownload setelah penilaian selesai
- Tidak ada akses download untuk siswa yang belum diuji
- Role-based access control untuk fitur sensitif

## Testing

### ✅ Test Case TU
- [x] Login sebagai TU
- [x] Lihat siswa dengan status SUDAH DIUJI dan ada kelulusan
- [x] Tombol "Surat Keterangan" muncul
- [x] Download berhasil dengan format PDF yang benar

### ✅ Test Case PENGUJI
- [x] Login sebagai PENGUJI
- [x] Lihat siswa dengan status SUDAH DIUJI dan ada kelulusan
- [x] Tombol "Surat Keterangan" TIDAK muncul
- [x] Tetap bisa download kartu peserta dan kirim WhatsApp

### ✅ Test Case ADMIN
- [x] Login sebagai ADMIN
- [x] Lihat siswa dengan status SUDAH DIUJI dan ada kelulusan
- [x] Tombol "Surat Keterangan" muncul
- [x] Download berhasil dengan format PDF yang benar

## Manfaat

### 📋 Untuk TU
- Dapat langsung download surat keterangan setelah penilaian selesai
- Tidak perlu menunggu atau meminta bantuan ADMIN
- Workflow lebih efisien untuk administrasi

### 🎯 Untuk PENGUJI
- Fokus pada tugas penilaian
- Tidak terganggu dengan fitur administratif
- Interface lebih bersih dan sesuai peran

### 🔐 Untuk Sistem
- Permission yang jelas dan terstruktur
- Keamanan data terjaga
- Audit trail yang baik

## Status
✅ **SELESAI** - TU sekarang dapat download surat keterangan dengan permission yang tepat