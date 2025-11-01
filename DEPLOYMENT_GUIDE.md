# 🚀 Panduan Redeploy Aplikasi SPMB At-Tauhid

## Ringkasan Perubahan yang Akan Di-deploy

### ✅ Fitur Baru yang Ditambahkan
1. **Logo Integration** - Logo asli terintegrasi di PDF surat keterangan
2. **Field Asrama** - Tambahan field "Asrama/Non Asrama" di form siswa
3. **Permission TU** - TU dapat download surat keterangan
4. **Nomor Surat Unik** - Sistem penomoran otomatis berdasarkan nomor tes
5. **Redaksi Update** - Format surat sesuai standar baru

### 🔧 File yang Dimodifikasi
- `src/types/index.ts` - Tambah field asrama, hapus petugasCadangan
- `src/components/FormScreen.tsx` - UI field asrama
- `src/components/DashboardScreen.tsx` - Permission TU, tampilan asrama
- `src/utils/suratKeteranganGenerator.ts` - Logo, redaksi, nomor surat
- `src/utils/helpers.ts` - Default value asrama
- `src/utils/exportUtils.ts` - Export field asrama
- `src/assets/logos/logoConstants.ts` - Logo base64

## 🚀 Cara Redeploy

### Opsi 1: Menggunakan Vercel CLI (Recommended)

```bash
# 1. Install Vercel CLI (jika belum ada)
npm install -g vercel

# 2. Login ke Vercel (jika belum login)
vercel login

# 3. Deploy ke production
npm run deploy
```

### Opsi 2: Menggunakan Git Push (Jika terhubung dengan Git)

```bash
# 1. Add semua perubahan
git add .

# 2. Commit dengan pesan yang jelas
git commit -m "feat: Add logo integration, asrama field, TU permission, unique surat numbering"

# 3. Push ke branch main/master
git push origin main
```

### Opsi 3: Manual Build dan Upload

```bash
# 1. Build aplikasi
npm run build

# 2. Upload folder 'dist' ke hosting provider
# (Sesuaikan dengan provider hosting yang digunakan)
```

## 🔍 Verifikasi Deployment

### ✅ Checklist Setelah Deploy

#### 1. **Logo di PDF**
- [ ] Login sebagai TU/ADMIN
- [ ] Download surat keterangan siswa yang lulus
- [ ] Pastikan logo muncul di header (kiri: Ponpes ICT, kanan: SMP/SMA)

#### 2. **Field Asrama**
- [ ] Buka form tambah siswa baru
- [ ] Pastikan ada dropdown "Status Asrama"
- [ ] Pilih "Asrama" dan simpan
- [ ] Cek di dashboard apakah status muncul

#### 3. **Permission TU**
- [ ] Login sebagai TU
- [ ] Lihat siswa yang sudah lulus
- [ ] Pastikan tombol "Surat Keterangan" muncul
- [ ] Download berhasil

#### 4. **Nomor Surat Unik**
- [ ] Download surat keterangan untuk beberapa siswa berbeda
- [ ] Pastikan nomor surat berbeda sesuai nomor tes
- [ ] Format: `[nomor]/SLP/[SMPITA/SMAITA]/[bulan]/[tahun]`

#### 5. **Redaksi Baru**
- [ ] Kop surat: "SMPITA/SMAITA AT-TAUHID PANGKALPINANG"
- [ ] Kepala sekolah sesuai lembaga (SMP: Meditoma, SMA: Delly Arhadath)
- [ ] Biaya sesuai status asrama

## 🛠️ Troubleshooting

### ❌ Jika Build Gagal

```bash
# 1. Clear cache
npm run clean
rm -rf node_modules
rm package-lock.json

# 2. Install ulang dependencies
npm install

# 3. Build ulang
npm run build
```

### ❌ Jika Logo Tidak Muncul
- Pastikan file PNG ada di `src/assets/logos/`
- Cek console browser untuk error
- Verifikasi base64 di `logoConstants.ts`

### ❌ Jika Field Asrama Tidak Muncul
- Clear browser cache
- Hard refresh (Ctrl+F5)
- Cek localStorage untuk data lama

## 📊 Monitoring Setelah Deploy

### 🔍 Yang Perlu Dipantau
1. **Performance** - Loading time PDF generation
2. **Error Rate** - Console errors di browser
3. **User Feedback** - Keluhan dari TU/PENGUJI
4. **Data Integrity** - Pastikan data lama tetap aman

### 📈 Metrics Success
- [ ] PDF generation < 3 detik
- [ ] No console errors
- [ ] All features working as expected
- [ ] Positive user feedback

## 🔄 Rollback Plan

### Jika Ada Masalah Serius

```bash
# 1. Rollback ke versi sebelumnya
vercel rollback

# 2. Atau deploy commit sebelumnya
git revert HEAD
git push origin main
```

## 📞 Support

### 🆘 Jika Butuh Bantuan
1. **Check logs**: `vercel logs [deployment-url]`
2. **Browser console**: F12 → Console tab
3. **Network tab**: Cek failed requests
4. **Contact developer**: Dengan screenshot error

## 🎉 Setelah Deploy Sukses

### 📢 Informasi ke User
1. **Beritahu TU** - Fitur baru field asrama dan permission download
2. **Training singkat** - Cara menggunakan field asrama
3. **Dokumentasi** - Share panduan penggunaan fitur baru

### 📝 Update Documentation
- [ ] Update user manual
- [ ] Update training materials
- [ ] Update FAQ

---

## 🚀 Ready to Deploy!

Semua perubahan sudah siap untuk di-deploy. Pilih salah satu opsi deployment di atas dan ikuti checklist verifikasi untuk memastikan semua fitur berjalan dengan baik.

**Good luck! 🍀**