# 🚀 Solusi Manual Upload Perubahan

## 🚨 Root Cause Masalah
- Folder ini adalah **download** dari GitHub (bukan Git repository)
- Perubahan fitur baru hanya ada di **lokal**
- Vercel deploy dari **repository GitHub** yang belum ter-update
- Jadi fitur baru tidak ter-deploy

## ✅ Solusi: Manual Upload ke GitHub

### **Opsi 1: Upload via GitHub Web Interface**

#### Step 1: Buka Repository GitHub
1. Buka: https://github.com/ponpesicattauhid/spmb-attauhid
2. Login dengan akun yang memiliki akses

#### Step 2: Upload File yang Diubah
Upload file-file berikut satu per satu:

**📁 Files yang Harus Di-upload:**
```
src/types/index.ts
src/components/FormScreen.tsx
src/components/DashboardScreen.tsx
src/utils/suratKeteranganGenerator.ts
src/utils/helpers.ts
src/utils/exportUtils.ts
src/assets/logos/logoConstants.ts
src/lib/supabase.ts
vite.config.ts
```

#### Step 3: Cara Upload
1. **Klik file** yang ingin diubah di GitHub
2. **Klik "Edit"** (ikon pensil)
3. **Copy-paste** isi file dari lokal
4. **Commit changes** dengan pesan: "Add fitur asrama, logo, TU permission, nomor unik"

### **Opsi 2: Zip & Upload Bulk**

#### Step 1: Buat Zip File
```bash
# Buat folder dengan file yang diubah
mkdir upload-changes
cp src/types/index.ts upload-changes/
cp src/components/FormScreen.tsx upload-changes/
cp src/components/DashboardScreen.tsx upload-changes/
cp src/utils/suratKeteranganGenerator.ts upload-changes/
cp src/utils/helpers.ts upload-changes/
cp src/utils/exportUtils.ts upload-changes/
cp src/assets/logos/logoConstants.ts upload-changes/
cp src/lib/supabase.ts upload-changes/
cp vite.config.ts upload-changes/
```

#### Step 2: Upload ke GitHub
1. **Drag & drop** files ke repository
2. **Commit** dengan pesan yang jelas

### **Opsi 3: Clone Fresh & Manual Copy**

```bash
# Clone repository
git clone https://github.com/ponpesicattauhid/spmb-attauhid.git fresh-repo
cd fresh-repo

# Copy file yang diubah dari folder spmb-attauhid-main
# Kemudian commit & push
git add .
git commit -m "feat: Add logo, asrama field, TU permission, unique numbering"
git push origin main
```

## 📋 File Changes Summary

### **src/types/index.ts**
- ✅ Tambah field `asrama: 'ASRAMA' | 'NON ASRAMA'`
- ❌ Hapus field `petugasCadangan: string`

### **src/components/FormScreen.tsx**
- ✅ Tambah dropdown "Status Asrama"
- ❌ Hapus field "Petugas Cadangan"

### **src/components/DashboardScreen.tsx**
- ✅ Tambah permission TU untuk download surat
- ✅ Tampilkan status asrama di card siswa

### **src/utils/suratKeteranganGenerator.ts**
- ✅ Logo integration dengan base64
- ✅ Redaksi update (SMPITA/SMAITA)
- ✅ Nomor surat unik berdasarkan nomor tes
- ✅ Biaya sesuai status asrama

### **src/assets/logos/logoConstants.ts**
- ✅ Logo base64 untuk ICT, SMP, SMA

### **src/lib/supabase.ts**
- ✅ Fallback environment variables

### **vite.config.ts**
- ✅ Define environment variables untuk production

## 🎯 Prioritas Upload

### **High Priority (Wajib):**
1. `src/types/index.ts` - Interface baru
2. `src/components/FormScreen.tsx` - Field asrama
3. `src/utils/suratKeteranganGenerator.ts` - Logo & redaksi
4. `src/assets/logos/logoConstants.ts` - Logo base64

### **Medium Priority:**
5. `src/components/DashboardScreen.tsx` - TU permission
6. `src/utils/helpers.ts` - Default asrama
7. `src/utils/exportUtils.ts` - Export asrama

### **Low Priority:**
8. `src/lib/supabase.ts` - Supabase fix
9. `vite.config.ts` - Build config

## ⚡ Quick Test

### Setelah Upload, Test:
1. **Tunggu Vercel auto-deploy** (2-3 menit)
2. **Hard refresh** browser (Ctrl+F5)
3. **Cek field asrama** di form tambah siswa
4. **Cek tombol surat keterangan** untuk TU

## 📞 Bantuan Upload

### Jika Butuh Bantuan:
1. **Screenshot** file yang ingin diupload
2. **Copy-paste** isi file ke chat
3. Saya bantu format untuk upload ke GitHub

---

## 🚀 Action Plan

**Langkah Selanjutnya:**
1. **Pilih Opsi 1** (upload via GitHub web) - paling mudah
2. **Mulai dari file prioritas tinggi**
3. **Test setelah setiap upload**
4. **Konfirmasi fitur berfungsi**

**Mari mulai upload file pertama: `src/types/index.ts`** 📁