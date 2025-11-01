# Update Field Data Calon Siswa

## Perubahan yang Dilakukan

### ✅ Field Baru: Status Asrama
- **Lokasi**: FormData interface
- **Tipe**: `'ASRAMA' | 'NON ASRAMA'`
- **Default**: `'NON ASRAMA'`
- **UI**: Dropdown dengan pilihan "Non Asrama" dan "Asrama"
- **Icon**: 🏠

### ❌ Field yang Dihapus: Petugas Cadangan
- **Alasan**: Tidak diperlukan lagi sesuai permintaan
- **Dampak**: Semua referensi telah dibersihkan

## File yang Dimodifikasi

### 1. `src/types/index.ts`
```typescript
export interface FormData {
  // ... field lainnya
  asrama: 'ASRAMA' | 'NON ASRAMA';  // ✅ BARU
  petugas: string;
  // petugasCadangan: string;        // ❌ DIHAPUS
}

export interface Student {
  // ... field lainnya
  // asrama?: boolean;               // ❌ DIHAPUS (pindah ke FormData)
}
```

### 2. `src/components/FormScreen.tsx`
- ✅ Menambahkan dropdown "Status Asrama"
- ❌ Menghapus field "Petugas Cadangan"
- 🎨 Menggunakan icon 🏠 untuk field asrama

### 3. `src/components/DashboardScreen.tsx`
- ✅ Menampilkan status asrama di card siswa
- ❌ Menghapus tampilan petugas cadangan
- 🎨 Menggunakan icon biru untuk status asrama

### 4. `src/utils/helpers.ts`
- ✅ Default value `asrama: 'NON ASRAMA'`
- ❌ Menghapus `petugasCadangan: ''`

### 5. `src/utils/exportUtils.ts`
- ✅ Kolom export "Status Asrama"
- ❌ Menghapus kolom "Petugas Cadangan"

### 6. `src/utils/suratKeteranganGenerator.ts`
- ✅ Menggunakan `student.data.asrama === 'ASRAMA'`
- ✅ Biaya otomatis sesuai status asrama

## Integrasi dengan Surat Keterangan

### Status Asrama di PDF
```typescript
// Deteksi status asrama dari form data
const isAsrama = student.data.asrama === 'ASRAMA';

// Biaya sesuai status
const uangPangkal = isAsrama ? 'Rp. 12.800.000,-' : 'Rp. 9.800.000,-';
const spp = isAsrama ? 'Rp. 1.300.000,-' : 'Rp. 450.000,-';

// Keterangan di data siswa
{ label: 'Keterangan', value: ': ' + statusAsrama }
```

### Biaya Berdasarkan Status
| Status | Uang Pangkal | SPP |
|--------|-------------|-----|
| Non Asrama | Rp. 9.800.000,- | Rp. 450.000,- |
| Asrama | Rp. 12.800.000,- | Rp. 1.300.000,- |

## Backward Compatibility

### ✅ Data Lama Tetap Aman
- Field baru memiliki default value
- Tidak ada breaking changes pada data existing
- Fungsi existing tetap berjalan normal

### 🔄 Migrasi Otomatis
- Data siswa lama akan menggunakan default "NON ASRAMA"
- Tidak perlu migrasi manual database
- Sistem tetap stabil

## Testing

### ✅ Validasi Form
- Field asrama wajib diisi (ada default)
- Dropdown berfungsi dengan baik
- Data tersimpan dengan benar

### ✅ Validasi PDF
- Status asrama muncul di surat keterangan
- Biaya sesuai dengan status yang dipilih
- Format tetap konsisten

### ✅ Validasi Export
- Kolom "Status Asrama" muncul di Excel
- Data ter-export dengan benar
- Tidak ada error pada export

## Status
✅ **SELESAI** - Field asrama berhasil ditambahkan dan petugas cadangan dihapus tanpa merusak fungsi existing