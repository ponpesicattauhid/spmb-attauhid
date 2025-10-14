# Test Plan - PDF Export Functions

## 🧪 Testing Guide

### Prerequisites
1. Build successful: ✅
2. Dependencies installed: ✅
3. No linting errors: ✅

---

## Test Cases

### 1. Export All Students to PDF

**Function:** `exportToPDF(students, lembagaData)`

**Test Steps:**
1. Login sebagai admin/penguji
2. Buka halaman Dashboard/Admin
3. Pastikan ada data siswa
4. Klik tombol "Export PDF" (merah)
5. Tunggu proses selesai

**Expected Results:**
- ✅ Alert success muncul
- ✅ File `Hasil_Tes_SPMB_YYYY-MM-DD.pdf` terdownload
- ✅ PDF terbuka dengan benar
- ✅ Header dengan background biru terlihat
- ✅ 5 kotak ringkasan data terlihat dengan warna berbeda
- ✅ Tabel data dengan border dan styling rapi
- ✅ Kolom status dan kelulusan memiliki warna (hijau/orange/merah)
- ✅ Footer di setiap halaman
- ✅ Nomor halaman terlihat (Halaman X dari Y)
- ✅ Teks bisa di-copy dari PDF
- ✅ Zoom in/out tetap tajam (tidak pixelated)

**Data to Check:**
```typescript
// Minimum 5 siswa dengan variasi:
- Status: SUDAH DIUJI / BELUM DIUJI
- Kelulusan: LULUS / TIDAK LULUS / -
- Lembaga: berbeda-beda
- Nilai: berbeda-beda
```

---

### 2. Export Single Student to PDF

**Function:** `exportStudentToPDF(student, lembagaData)`

**Test Steps:**
1. Login sebagai admin/penguji
2. Buka halaman Penilaian
3. Pilih salah satu siswa
4. Klik tombol "Hasil PDF" (ungu)
5. Tunggu proses selesai

**Expected Results:**
- ✅ Alert success muncul
- ✅ File `Hasil_Tes_[NoTes]_[Nama].pdf` terdownload
- ✅ PDF terbuka dengan benar
- ✅ Header dengan background biru terlihat
- ✅ Section "INFORMASI CALON SANTRI" dengan 12 field data
- ✅ Alternating row background (abu-abu/putih)
- ✅ Status Tes dengan warna (hijau/orange)
- ✅ Section "HASIL PENILAIAN" dengan 2 kotak nilai
- ✅ Kotak Nilai Akhir (background biru)
- ✅ Kotak Kelulusan dengan warna sesuai status
- ✅ Section "RINCIAN NILAI" (jika data tersedia)
- ✅ Footer dengan tanggal/waktu pencetakan
- ✅ Teks bisa di-copy dari PDF
- ✅ Format tanggal Indonesia lengkap

**Data to Check:**
```typescript
// Cek dengan siswa yang:
1. Sudah diuji lengkap (ada nilai semua)
2. Belum diuji (belum ada nilai)
3. Status LULUS
4. Status TIDAK LULUS
```

---

### 3. Kartu Peserta PDF

**Function:** `generateKartuPesertaPDF(student)` (already working)

**Test Steps:**
1. Buka halaman Form
2. Isi data calon santri
3. Submit form
4. Klik tombol "Download Kartu Peserta"

**Expected Results:**
- ✅ File `Kartu-Peserta-[NoTes].pdf` terdownload
- ✅ Format kartu dengan nomor tes highlighted
- ✅ Data peserta lengkap
- ✅ Jadwal tes dengan highlight biru
- ✅ Lokasi tes dengan link Google Maps
- ✅ Catatan di bagian bawah

---

## Performance Testing

### File Size Comparison

**Test:** Export 50 siswa

| Method | File Size | Time |
|--------|-----------|------|
| html2canvas (OLD) | ~1.5 MB | ~4 sec |
| jsPDF Plain Text (NEW) | ~100 KB | < 1 sec |

**Expected:** 
- ✅ File size < 200 KB
- ✅ Process time < 1 second

---

## Cross-Browser Testing

Test di berbagai browser:

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest | ⏳ To test |
| Firefox | Latest | ⏳ To test |
| Edge | Latest | ⏳ To test |
| Safari | Latest | ⏳ To test |

---

## Text Quality Testing

**Test Steps:**
1. Buka PDF hasil export
2. Zoom in ke 200%
3. Periksa ketajaman teks

**Expected:**
- ✅ Teks tetap tajam dan jelas
- ✅ Tidak ada pixelation
- ✅ Border dan garis tetap halus

**Compare with OLD:**
- ❌ html2canvas: Teks pixelated saat zoom
- ✅ jsPDF: Teks tetap tajam (vector)

---

## Text Copy Testing

**Test Steps:**
1. Buka PDF hasil export
2. Select dan copy teks nama siswa
3. Paste ke notepad

**Expected:**
- ✅ Teks bisa di-copy
- ✅ Format teks terbaca dengan benar
- ✅ Tidak ada karakter aneh

**Compare with OLD:**
- ❌ html2canvas: Teks tidak bisa di-copy (gambar)
- ✅ jsPDF: Teks bisa di-copy (text layer)

---

## Multi-page Testing

**Test:** Export 100+ siswa (untuk generate multiple pages)

**Expected:**
- ✅ Tabel otomatis split ke halaman baru
- ✅ Footer muncul di setiap halaman
- ✅ Nomor halaman benar (1 dari 5, 2 dari 5, dst)
- ✅ Tidak ada data yang terpotong
- ✅ Header tidak diulang di halaman berikutnya (hanya di halaman 1)

---

## Error Handling Testing

### Test 1: Empty Data
**Steps:** Export dengan students = []

**Expected:**
- ✅ Tetap generate PDF
- ✅ Ringkasan menunjukkan 0
- ✅ Tabel kosong (hanya header)
- ✅ Tidak ada error/crash

### Test 2: Missing Lembaga Data
**Steps:** Export dengan lembagaData yang tidak match

**Expected:**
- ✅ Fallback ke student.lembagaName
- ✅ Tidak ada error
- ✅ PDF tetap tergenerate

### Test 3: Missing Student Values
**Steps:** Export siswa dengan nilai null/undefined

**Expected:**
- ✅ Display '-' untuk nilai kosong
- ✅ Display 0 untuk nilaiAkhir kosong
- ✅ Tidak ada error

---

## Accessibility Testing

**Test:** Buka PDF di PDF reader dengan accessibility features

**Expected:**
- ✅ Text-to-speech bisa membaca content
- ✅ Struktur dokumen terdeteksi
- ✅ Navigation mudah

---

## Mobile Testing

**Test:** Download dan buka PDF di mobile device

**Expected:**
- ✅ PDF terbuka di mobile PDF viewer
- ✅ Layout tetap rapi (tidak overflow)
- ✅ Text readable di layar kecil
- ✅ Zoom in/out berfungsi baik

---

## Integration Testing

### Test dengan ExportButtons Component

**File:** `src/components/ExportButtons.tsx`

**Test Steps:**
1. Verify import statements
2. Verify function calls
3. Check button disable logic
4. Check alert messages

**Expected:**
- ✅ Import correct
- ✅ Function calls correct (await for async)
- ✅ Buttons disabled saat exporting
- ✅ Success/error messages displayed

---

## Debug Mode

Untuk debugging, tambahkan console.log:

```typescript
export const exportToPDF = async (students: Student[], lembagaData: LembagaData[]) => {
  console.log('🔄 Starting PDF export...');
  console.log('📊 Total students:', students.length);
  
  try {
    const pdf = new jsPDF(...);
    console.log('✅ PDF instance created');
    
    // ... rest of code
    
    pdf.save(filename);
    console.log('✅ PDF saved:', filename);
    
    return { success: true, message: `File PDF berhasil didownload: ${filename}` };
  } catch (error) {
    console.error('❌ PDF export error:', error);
    return { success: false, message: 'Gagal mengexport ke PDF' };
  }
};
```

---

## Checklist Summary

### Before Testing
- [x] Dependencies installed (`npm install`)
- [x] Build successful (`npm run build`)
- [x] No linting errors
- [x] Code review completed

### During Testing
- [ ] Export all students - Success
- [ ] Export single student - Success
- [ ] File size < 200 KB
- [ ] Process time < 1 sec
- [ ] Text quality good (zoom test)
- [ ] Text copyable
- [ ] Multi-page works
- [ ] Error handling works
- [ ] Cross-browser compatible

### After Testing
- [ ] All tests passed
- [ ] No bugs found
- [ ] Performance acceptable
- [ ] User experience good
- [ ] Ready for production

---

## Known Limitations

1. **Font Options:** 
   - Only built-in fonts (helvetica, times, courier)
   - Custom fonts require additional setup

2. **Colors:**
   - RGB only (no CMYK for professional printing)

3. **Images:**
   - Logo placeholder (text only)
   - Can add images with base64 encoding if needed

4. **Page Size:**
   - Fixed A4 portrait
   - Can be modified in jsPDF options

---

## Future Enhancements (Optional)

1. **Add Logo Image:**
   ```typescript
   const logoBase64 = 'data:image/png;base64,...';
   pdf.addImage(logoBase64, 'PNG', 20, 10, 30, 30);
   ```

2. **Add QR Code:**
   - Generate QR code untuk nomor tes
   - Tampilkan di kartu peserta

3. **Custom Fonts:**
   - Add custom Arabic font untuk nama ponpes
   - Requires font conversion to base64

4. **Print Options:**
   - Tambah button "Print" (window.print)
   - Preview sebelum download

5. **Batch Export:**
   - Export per lembaga
   - Export per status kelulusan

---

## Support & Resources

- jsPDF Documentation: https://rawgit.com/MrRio/jsPDF/master/docs/
- jsPDF AutoTable: https://github.com/simonbengtsson/jsPDF-AutoTable
- jsPDF Examples: https://parall.ax/products/jspdf

---

## Test Report Template

```
TEST REPORT - PDF Export Functions
Date: ___________
Tester: ___________

1. Export All Students: ☐ PASS ☐ FAIL
   Notes: ___________

2. Export Single Student: ☐ PASS ☐ FAIL
   Notes: ___________

3. Performance: ☐ PASS ☐ FAIL
   File size: _______ KB
   Time: _______ sec

4. Text Quality: ☐ PASS ☐ FAIL
   Notes: ___________

5. Cross-browser: ☐ PASS ☐ FAIL
   Tested on: ___________

Overall: ☐ READY FOR PRODUCTION ☐ NEEDS FIXES

Issues Found:
1. ___________
2. ___________
```

---

*Test plan created: 14 Oktober 2025*

