# Dokumentasi Fungsi Ekspor PDF

## 📋 Ringkasan

Semua fungsi ekspor PDF telah **diperbarui** untuk menggunakan **jsPDF murni (plain text)** tanpa `html2canvas`. Ini menghasilkan dokumen PDF yang lebih profesional, ringan, dan konsisten.

---

## ✅ Perubahan yang Dilakukan

### 1. **File: `src/utils/exportUtils.ts`**

#### Fungsi `exportToPDF()` - Export Data Semua Siswa
**Status:** ✅ Diperbarui menggunakan jsPDF + autoTable

**Fitur:**
- ✅ **Header Dokumen Profesional**
  - Background berwarna dengan logo placeholder
  - Judul utama dan sub-judul institusi
  - Informasi tahun ajaran

- ✅ **Ringkasan Data dalam Format Teks Murni**
  - 5 kotak statistik dengan warna berbeda:
    - Total Siswa (Biru)
    - Sudah Diuji (Hijau)
    - Belum Diuji (Orange)
    - Lulus (Hijau)
    - Tidak Lulus (Merah)
  - Menggunakan rect dan text murni jsPDF

- ✅ **Tabel Data dengan Styling Rapi**
  - Menggunakan plugin `jspdf-autotable`
  - Header berwarna biru dengan teks putih
  - Alternating row colors untuk readability
  - Column width yang optimal
  - Color coding untuk status dan kelulusan
  - Support multi-halaman otomatis

- ✅ **Footer Otomatis di Setiap Halaman**
  - Tanggal/waktu pencetakan
  - Nama sistem
  - Penomoran halaman (Halaman X dari Y)

#### Fungsi `exportStudentToPDF()` - Export Data Per Siswa
**Status:** ✅ Diperbarui menggunakan jsPDF murni

**Fitur:**
- ✅ **Header Dokumen**
  - Background header berwarna
  - Informasi institusi lengkap
  - Tahun ajaran per santri

- ✅ **Layout Per-Santri Terstruktur**
  - **Section 1: Informasi Calon Santri**
    - Box header dengan background biru muda
    - 12 field data lengkap
    - Alternating row background
    - Color coding untuk status tes
    - Format tanggal Indonesia lengkap
    
  - **Section 2: Hasil Penilaian**
    - 2 kotak besar side-by-side:
      - Nilai Akhir (dengan background biru)
      - Status Kelulusan (dengan color coding)
    - Border dan styling profesional
    
  - **Section 3: Rincian Nilai** (opsional)
    - Ditampilkan jika data tersedia
    - Nilai Matematika
    - Nilai Hafalan
    - Nilai Wawancara (rata-rata)

- ✅ **Footer**
  - Garis pemisah
  - Tanggal/waktu pencetakan
  - Nama sistem

### 2. **File: `src/utils/pdfGenerator.ts`**
**Status:** ✅ Sudah menggunakan jsPDF murni (tidak perlu perubahan)

Fungsi `generateKartuPesertaPDF()` sudah sempurna dengan plain text.

---

## 🎨 Konsistensi Design

### Font
- **Font Family:** Helvetica (built-in jsPDF)
- **Font Sizes:**
  - Header utama: 16-18pt
  - Sub-header: 12-14pt
  - Body text: 10pt
  - Footer: 8pt
  - Nilai besar: 24pt

### Colors (RGB)
- **Primary Blue:** `[37, 99, 235]` - Header, accent
- **Success Green:** `[16, 185, 129]` - Lulus, Sudah Diuji
- **Warning Orange:** `[245, 158, 11]` - Belum Diuji
- **Danger Red:** `[239, 68, 68]` - Tidak Lulus
- **Gray:** `[100, 100, 100]` - Secondary text

### Spacing
- **Page Margins:** 20mm
- **Line Height:** 7mm (normal), 8mm (dengan padding)
- **Section Spacing:** 8-15mm
- **Box Padding:** Proporsional sesuai konten

### Page Format
- **Orientation:** Portrait
- **Format:** A4 (210mm x 297mm)
- **Unit:** Millimeter (mm)

---

## 📦 Dependencies yang Ditambahkan

```json
{
  "jspdf-autotable": "^3.8.4"
}
```

**Catatan:** Library `html2canvas` masih ada di `package.json` karena mungkin digunakan di tempat lain, tapi **TIDAK digunakan** di fungsi ekspor PDF.

---

## 🚀 Cara Penggunaan

### Export Semua Data Siswa
```typescript
import { exportToPDF } from './utils/exportUtils';
import { lembagaData } from './data/constants';

// Di dalam component
const handleExportPDF = async () => {
  const result = await exportToPDF(students, lembagaData);
  if (result.success) {
    console.log(result.message);
  }
};
```

### Export Data Per Siswa
```typescript
import { exportStudentToPDF } from './utils/exportUtils';
import { lembagaData } from './data/constants';

// Di dalam component
const handleExportStudent = async (student: Student) => {
  const result = await exportStudentToPDF(student, lembagaData);
  if (result.success) {
    console.log(result.message);
  }
};
```

---

## ✨ Keuntungan Menggunakan jsPDF Murni

1. **Performance Lebih Baik**
   - Tidak perlu render HTML ke canvas
   - File PDF lebih kecil
   - Proses lebih cepat

2. **Kualitas Teks Lebih Baik**
   - Teks murni (bukan gambar)
   - Bisa di-copy dari PDF
   - Searchable text

3. **Konsistensi Layout**
   - Tidak tergantung rendering browser
   - Layout selalu sama di semua device
   - Tidak ada masalah dengan font rendering

4. **Professional Output**
   - Spacing presisi
   - Alignment sempurna
   - Color coding yang jelas

5. **Multi-page Support**
   - Otomatis split ke halaman baru
   - Footer di setiap halaman
   - Page numbering

---

## 🔍 Testing

Build berhasil tanpa error:
```bash
✓ tsc --noEmit (Type checking passed)
✓ vite build (Build successful)
```

---

## 📝 Catatan Penting

1. **AutoTable Plugin:** Memerlukan import `'jspdf-autotable'` dan deklarasi module untuk TypeScript
2. **Color Coding:** Status dan kelulusan memiliki warna yang berbeda untuk memudahkan identifikasi
3. **Date Formatting:** Menggunakan format Indonesia lengkap (e.g., "Senin, 14 Oktober 2025")
4. **Text Wrapping:** Otomatis untuk teks panjang menggunakan `splitTextToSize()`
5. **Filename Convention:** 
   - Semua siswa: `Hasil_Tes_SPMB_YYYY-MM-DD.pdf`
   - Per siswa: `Hasil_Tes_[NoTes]_[Nama].pdf`

---

## 🎯 Hasil Akhir

Semua fungsi ekspor PDF kini menggunakan **jsPDF murni** dengan:
- ✅ Header dokumen profesional
- ✅ Ringkasan data dalam format teks murni
- ✅ Tabel data dengan styling yang rapi
- ✅ Layout per-santri yang terstruktur
- ✅ Font konsisten (Helvetica)
- ✅ Spasi dan margin proporsional
- ✅ Penomoran halaman otomatis
- ✅ Penyusunan elemen logis dan mudah dibaca

**Status:** ✅ **SELESAI dan SIAP DIGUNAKAN**

