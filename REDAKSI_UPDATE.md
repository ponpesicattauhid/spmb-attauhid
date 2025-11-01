# Update Redaksi Surat Keterangan SPMB

## Perubahan yang Dilakukan

### 1. Header Surat
- ✅ Disesuaikan dengan lembaga (SMP/SMA)
- ✅ Menampilkan "SMPITA/SMAITA AT-TAUHID PANGKALPINANG" (disingkat)
- ✅ NPSN ditampilkan dengan format yang benar

### 2. Nomor Surat
- ✅ Format: `[NO.SURAT]/SLP/[SMPITA/SMAITA]/[BULAN]/[TAHUN]`
- ✅ Otomatis generate berdasarkan tanggal dan lembaga
- ✅ Contoh: `001/SLP/SMPITA/10/2025`

### 3. Pembukaan Surat
- ✅ Disesuaikan dengan lembaga (Kepala SMP/SMA)
- ✅ Menyebutkan NPSN dengan benar

### 4. Data Siswa
- ✅ Nama, Jenis Kelamin, NIK, Tempat/Tgl Lahir, Nama Orangtua, Nomor Tes
- ✅ Keterangan: Non Asrama/Asrama (field baru ditambahkan)

### 5. Status Kelulusan
- ✅ "dinyatakan LULUS dari tes seleksi penerimaan peserta didik baru Tahun Ajaran 2026/2027"

### 6. Informasi Pembayaran (Jika Lulus)
- ✅ Prosedur daftar ulang 50% + SPP Juli 2026
- ✅ Batas waktu 14 hari + 1 bulan pelunasan
- ✅ Biaya berbeda untuk Asrama/Non Asrama:
  - Non Asrama: UP Rp. 9.800.000,- | SPP Rp. 450.000,-
  - Asrama: UP Rp. 12.800.000,- | SPP Rp. 1.300.000,-

### 7. Kepala Sekolah
- ✅ SMP: Meditoma, S.Pd. (NIY. 199405220720181024)
- ✅ SMA: Delly Arhadath, S.Pd. (NIY. 200001120120231160)

### 8. Tanggal Surat
- ✅ Otomatis menggunakan tanggal saat surat dibuat
- ✅ Format: "Pangkalpinang, [tanggal lengkap]"

### 9. Tembusan
- ✅ Ketua Panitia PPDB Tahun Ajaran 2026/2027
- ✅ Staf Administrasi Sistem Yayasan
- ✅ Staf Keuangan Yayasan

## Field Baru yang Ditambahkan

### Student Interface
```typescript
export interface Student {
  // ... field existing
  asrama?: boolean; // true = asrama, false = non asrama
  // ... field lainnya
}
```

## Contoh Output

**Header:**
```
PONDOK PESANTREN
ISLAMIC CENTRE AT-TAUHID BANGKA BELITUNG
SMPITA AT-TAUHID PANGKALPINANG
NOMOR POKOK SEKOLAH NASIONAL (NPSN) : 70044522
```

**Nomor Surat:**
```
SURAT KETERANGAN TES SPMB 2026/2027
Nomor : 001/SLP/SMPITA/10/2025
```

**Kepala Sekolah:**
```
Pangkalpinang, 1 November 2025

Kepala Sekolah,

Meditoma, S.Pd.
NIY. 199405220720181024
```

## Perbaikan Sinkronisasi

### 10. Fix Deteksi Lembaga & Sinkronisasi Logo
- ✅ **PERBAIKAN PENTING**: Deteksi lembaga sekarang berdasarkan nomor tes
- ✅ Prioritas: Nomor tes (SMP-xxx atau SMA-xxx) > Data lembaga
- ✅ Contoh: Nomor tes "SMP-2627-020" → Kop surat "SMPITA" + Logo SMP
- ✅ **LOGO SINKRON**: Logo kanan sekarang menggunakan deteksi lembaga yang sama
- ✅ Fallback ke data lembaga jika nomor tes tidak jelas

### Logika Deteksi Lembaga & Logo
```typescript
// Prioritaskan deteksi dari nomor tes
const isSMPFromNoTes = student.noTes.toUpperCase().startsWith('SMP');
const isSMAFromNoTes = student.noTes.toUpperCase().startsWith('SMA');

if (isSMPFromNoTes) {
  isSMP = true;  // SMPITA + Logo SMP
} else if (isSMAFromNoTes) {
  isSMP = false; // SMAITA + Logo SMA
} else {
  // Fallback ke data lembaga
  isSMP = lembaga?.id === 'smp';
}

// Logo menggunakan variabel isSMP yang sama
const rightLogo = isSMP ? LOGO_SMP_ATTAUHID : LOGO_SMA_ATTAUHID;
```

## Status
✅ **SELESAI** - Redaksi surat telah diperbarui dan sinkronisasi diperbaiki