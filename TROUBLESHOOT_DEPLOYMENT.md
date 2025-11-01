# 🔧 Troubleshooting: Fitur Baru Belum Tampil

## 🚨 Kemungkinan Penyebab

### 1. **Browser Cache Issue**
Browser masih menggunakan versi lama yang ter-cache.

**Solusi:**
```bash
# Hard refresh browser
Ctrl + F5 (Windows)
Cmd + Shift + R (Mac)

# Atau clear cache manual:
F12 → Application → Storage → Clear site data
```

### 2. **Deployment Tidak Include Perubahan Terbaru**
Build mungkin menggunakan commit lama sebelum perubahan.

**Cek:**
- Apakah semua perubahan sudah di-commit ke Git?
- Apakah Vercel deploy dari branch yang benar?

### 3. **Environment Variables Issue**
Mungkin ada masalah dengan environment variables di production.

### 4. **Build Cache Issue**
Vercel mungkin menggunakan build cache lama.

## 🔍 Langkah Debugging

### Step 1: Cek Browser Console
```bash
F12 → Console tab
# Cari error messages
# Cari warning tentang missing components
```

### Step 2: Cek Network Tab
```bash
F12 → Network tab
# Refresh halaman
# Cek apakah ada failed requests
# Cek timestamp file assets (harus terbaru)
```

### Step 3: Cek Source Code di Browser
```bash
F12 → Sources tab
# Buka file JavaScript yang ter-load
# Cari kode fitur baru (contoh: "asrama", "SMPITA", dll)
```

## 🚀 Solusi Cepat

### Opsi 1: Force Redeploy
```bash
# Jika menggunakan Git
git commit --allow-empty -m "force redeploy"
git push origin main

# Atau trigger manual redeploy di Vercel dashboard
```

### Opsi 2: Clear Vercel Build Cache
1. Buka Vercel Dashboard
2. Pilih project
3. Settings → Functions → Clear Cache
4. Redeploy

### Opsi 3: Manual Build & Upload
```bash
# Build ulang dengan force
rm -rf dist/
npm run build

# Upload manual ke Vercel dashboard
# Atau deploy via CLI
```

## 🔍 Cek Fitur Spesifik

### Field Asrama (Paling Mudah Dicek)
**Lokasi:** Form tambah siswa baru
**Yang Harus Ada:** Dropdown "Status Asrama" dengan pilihan:
- Non Asrama
- Asrama

**Jika Tidak Ada:**
- Cek console error
- Cek apakah FormScreen.tsx ter-update
- Cek types/index.ts untuk interface FormData

### TU Permission
**Lokasi:** Dashboard siswa yang sudah lulus
**Yang Harus Ada:** Tombol "Surat Keterangan" untuk role TU

**Jika Tidak Ada:**
- Login sebagai TU
- Cek siswa dengan status SUDAH DIUJI + LULUS
- Cek console untuk error permission

### Logo di PDF
**Lokasi:** Download surat keterangan
**Yang Harus Ada:** Logo di header PDF (kiri: Ponpes ICT, kanan: SMP/SMA)

**Jika Tidak Ada:**
- Cek console saat generate PDF
- Cek network untuk base64 logo loading
- Cek logoConstants.ts ter-load

## 📋 Quick Verification Commands

### Cek Git Status
```bash
git status
git log --oneline -5
# Pastikan commit terakhir include semua perubahan
```

### Cek Build Output
```bash
ls -la dist/assets/
# Cek timestamp file - harus terbaru
```

### Cek Environment
```bash
# Cek apakah .env ter-load
cat .env
```

## 🆘 Emergency Fix

### Jika Semua Gagal:
1. **Backup data** (export dari Supabase jika perlu)
2. **Fresh clone** repository
3. **Manual apply** semua perubahan
4. **Fresh build & deploy**

```bash
# Fresh start
git clone [repository-url] fresh-spmb
cd fresh-spmb
npm install
npm run build
# Deploy manual
```

## 📞 Debugging Checklist

### ✅ Yang Perlu Dicek:
- [ ] Browser cache cleared (hard refresh)
- [ ] Console tidak ada error
- [ ] Network requests sukses semua
- [ ] Git commit include semua perubahan
- [ ] Vercel deploy dari branch yang benar
- [ ] Build timestamp terbaru
- [ ] Environment variables ter-set
- [ ] Source code di browser include perubahan

### 🔍 Specific Feature Check:
- [ ] **Field Asrama**: Form → Dropdown "Status Asrama"
- [ ] **TU Permission**: Dashboard → Tombol "Surat Keterangan" (role TU)
- [ ] **Logo PDF**: Download surat → Logo di header
- [ ] **Nomor Unik**: Multiple download → Nomor berbeda
- [ ] **Redaksi**: Format surat → "SMPITA/SMAITA AT-TAUHID"

---

## 🎯 Next Steps

1. **Coba hard refresh** browser dulu (Ctrl+F5)
2. **Cek console** untuk error messages
3. **Verifikasi** apakah fitur paling mudah (field asrama) muncul
4. **Report back** hasil debugging untuk solusi lebih spesifik

**Mari kita debug step by step untuk menemukan root cause!** 🔍