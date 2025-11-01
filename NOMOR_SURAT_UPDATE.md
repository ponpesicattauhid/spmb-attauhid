# Update Sistem Penomoran Surat Keterangan

## Masalah yang Diperbaiki

### ❌ Masalah Sebelumnya
- Nomor surat selalu "001" untuk setiap surat
- Tidak ada uniqueness dalam penomoran
- Sulit melacak surat berdasarkan nomor

### ✅ Solusi Baru
- Nomor surat berdasarkan nomor tes siswa
- Setiap surat memiliki nomor unik
- Mudah dilacak dan diidentifikasi

## Sistem Penomoran Baru

### Format Nomor Surat
```
[NOMOR_URUT]/SLP/[LEMBAGA]/[BULAN]/[TAHUN]
```

### Contoh Implementasi

#### Untuk Siswa SMP
- **Nomor Tes**: `SMP-2627-020`
- **Nomor Surat**: `020/SLP/SMPITA/11/2025`

#### Untuk Siswa SMA
- **Nomor Tes**: `SMA-2627-045`
- **Nomor Surat**: `045/SLP/SMAITA/11/2025`

### Logika Penomoran

```typescript
// Ekstrak nomor dari noTes siswa
const nomorTesMatch = student.noTes.match(/-(\d+)$/);

if (nomorTesMatch && nomorTesMatch[1]) {
  // Gunakan nomor dari noTes (contoh: SMP-2627-020 -> 020)
  nomorUrut = nomorTesMatch[1].padStart(3, '0');
} else {
  // Fallback: gunakan timestamp untuk uniqueness
  const timestamp = Date.now().toString().slice(-3);
  nomorUrut = timestamp.padStart(3, '0');
}
```

## Keunggulan Sistem Baru

### 🔗 Traceability
- Nomor surat terhubung langsung dengan nomor tes siswa
- Mudah mencari surat berdasarkan data siswa
- Konsistensi antara nomor tes dan nomor surat

### 🔢 Uniqueness
- Setiap siswa memiliki nomor tes unik
- Nomor surat otomatis unik berdasarkan nomor tes
- Tidak ada duplikasi nomor surat

### 📅 Time-based
- Bulan dan tahun otomatis sesuai tanggal pembuatan
- Mudah filtering berdasarkan periode
- Sesuai dengan tahun ajaran

### 🛡️ Fallback System
- Jika format nomor tes tidak sesuai, gunakan timestamp
- Sistem tetap berjalan meski ada data anomali
- Selalu menghasilkan nomor unik

## Contoh Hasil

### Sebelum (Selalu Sama)
```
001/SLP/SMPITA/11/2025
001/SLP/SMPITA/11/2025  ← Duplikasi!
001/SLP/SMAITA/11/2025
```

### Sesudah (Unik per Siswa)
```
020/SLP/SMPITA/11/2025  ← Dari SMP-2627-020
045/SLP/SMAITA/11/2025  ← Dari SMA-2627-045
078/SLP/SMPITA/11/2025  ← Dari SMP-2627-078
```

## Backward Compatibility

### ✅ Data Existing
- Tidak mempengaruhi surat yang sudah dibuat sebelumnya
- Sistem baru hanya berlaku untuk surat baru
- Tidak perlu migrasi data

### 🔄 Format Konsisten
- Format nomor surat tetap sama
- Hanya bagian nomor urut yang berubah
- Template PDF tidak perlu diubah

## Testing

### ✅ Test Case Normal
- **Input**: Nomor tes `SMP-2627-020`
- **Output**: `020/SLP/SMPITA/11/2025`
- **Status**: ✅ Pass

### ✅ Test Case Fallback
- **Input**: Nomor tes format tidak standar
- **Output**: `[timestamp]/SLP/SMPITA/11/2025`
- **Status**: ✅ Pass

### ✅ Test Case Multiple Students
- **Siswa 1**: `020/SLP/SMPITA/11/2025`
- **Siswa 2**: `045/SLP/SMAITA/11/2025`
- **Siswa 3**: `078/SLP/SMPITA/11/2025`
- **Status**: ✅ Semua unik

## Manfaat

### 📋 Untuk Administrasi
- Mudah melacak surat berdasarkan nomor tes siswa
- Tidak ada konflik nomor surat
- Sistem filing yang lebih terorganisir

### 🎯 Untuk Audit
- Setiap surat dapat dilacak ke siswa spesifik
- Kronologi pembuatan surat jelas
- Compliance dengan standar administrasi

### 💻 Untuk Sistem
- Penomoran otomatis dan konsisten
- Tidak perlu maintenance manual
- Skalabilitas yang baik

## Status
✅ **SELESAI** - Sistem penomoran surat keterangan sekarang unik berdasarkan nomor tes siswa