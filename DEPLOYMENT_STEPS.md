# 🎯 Langkah Deployment - SIAP DEPLOY!

## ✅ Status: Git Repository Siap!

**Commit berhasil:** 48 files, 9501 lines
**Branch:** main

---

## 📋 Langkah Selanjutnya (Pilih Salah Satu)

### 🌟 OPSI A: Deploy via Vercel Website (RECOMMENDED - TERMUDAH)

#### Step 1: Buat Repository di GitHub

1. Buka [github.com](https://github.com) dan login
2. Klik tombol **"+"** → **"New repository"**
3. Isi form:
   - **Repository name:** `spmb-attauhid` (atau nama lain)
   - **Description:** "SPMB Pondok Pesantren IC At Tauhid"
   - **Visibility:** Private atau Public (pilih sesuai kebutuhan)
   - ❌ **JANGAN** centang "Add README" atau .gitignore (sudah ada)
4. Klik **"Create repository"**

#### Step 2: Push ke GitHub

Setelah repository dibuat, GitHub akan menampilkan instructions. Gunakan ini:

```bash
# Hubungkan dengan remote GitHub (ganti URL dengan repository Anda)
git remote add origin https://github.com/USERNAME/spmb-attauhid.git

# Push ke GitHub
git push -u origin main
```

**Contoh jika username Anda "johndoe":**
```bash
git remote add origin https://github.com/johndoe/spmb-attauhid.git
git push -u origin main
```

#### Step 3: Setup Supabase Database

1. Buka [app.supabase.com](https://app.supabase.com/)
2. Klik **"New project"**
3. Isi:
   - **Name:** spmb-attauhid
   - **Database Password:** (buat password yang kuat, simpan!)
   - **Region:** Southeast Asia (Singapore) - terdekat dengan Indonesia
4. Tunggu project selesai dibuat (~2 menit)
5. Buka **SQL Editor** (menu kiri)
6. Klik **"New query"**
7. Copy-paste SEMUA isi file `supabase-schema.sql`
8. Klik **"Run"** atau tekan F5
9. Pastikan sukses (hijau) ✅

#### Step 4: Dapatkan Supabase Credentials

1. Di Supabase Dashboard, klik **⚙️ Settings** → **API**
2. Copy 2 nilai ini (simpan di notepad):
   - **Project URL** → contoh: `https://xxxxx.supabase.co`
   - **Project API keys → anon/public** → contoh: `eyJhbGci...`

#### Step 5: Deploy ke Vercel

1. Buka [vercel.com](https://vercel.com)
2. Klik **"Sign Up"** atau **"Login"**
3. Login dengan **GitHub** (recommended)
4. Klik **"Add New..."** → **"Project"**
5. Di list repository, cari dan pilih **`spmb-attauhid`**
6. Klik **"Import"**

**Configure Project:**
- **Framework Preset:** Vite (auto-detected) ✅
- **Root Directory:** ./ (default)
- **Build Command:** `npm run build` (auto)
- **Output Directory:** `dist` (auto)

#### Step 6: Set Environment Variables

Scroll ke bawah sampai **"Environment Variables"**:

Tambahkan 3 variabel ini:

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | https://xxxxx.supabase.co (dari step 4) |
| `VITE_SUPABASE_ANON_KEY` | eyJhbGci... (dari step 4) |
| `VITE_TAHUN_AJARAN` | 2627 (untuk tahun ajaran 2026/2027) |

Cara input:
1. Ketik nama variabel di kolom "Name"
2. Paste nilai di kolom "Value"
3. Klik **"Add"**
4. Ulangi untuk 3 variabel

#### Step 7: Deploy! 🚀

1. Klik tombol **"Deploy"**
2. Tunggu build selesai (~1-2 menit)
3. Lihat animasi confetti! 🎉
4. Klik **"Visit"** untuk buka aplikasi Anda

**URL Aplikasi:** `https://spmb-attauhid.vercel.app` (atau custom)

---

### 💻 OPSI B: Deploy via Vercel CLI (Untuk Developer)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login ke Vercel
vercel login

# Deploy (interactive setup)
vercel

# Jawab prompts:
# - Set up and deploy? Yes
# - Which scope? (pilih account Anda)
# - Link to existing project? No
# - Project name? spmb-attauhid
# - Directory? ./
# - Override settings? No

# Set environment variables
vercel env add VITE_SUPABASE_URL
# Paste: https://xxxxx.supabase.co

vercel env add VITE_SUPABASE_ANON_KEY
# Paste: eyJhbGci...

vercel env add VITE_TAHUN_AJARAN
# Paste: 2627

# Deploy to production
vercel --prod
```

---

## 🧪 Testing Aplikasi (Wajib!)

Setelah deploy, lakukan testing:

### 1. Buka aplikasi
URL: `https://spmb-attauhid.vercel.app`

### 2. Test Login Tata Usaha
- Role: **Tata Usaha (TU)**
- Test semua fitur:
  - ✅ Tambah calon murid baru
  - ✅ Lihat list murid
  - ✅ Edit data murid
  - ✅ Hapus data murid
  - ✅ Download PDF kartu peserta
  - ✅ Kirim WhatsApp
  - ✅ Ubah tahun ajaran

### 3. Test Login Penguji
- Role: **Penguji**
- Test fitur:
  - ✅ Lihat jadwal tes hari ini
  - ✅ Buka form penilaian
  - ✅ Isi penilaian (skala 1-5)
  - ✅ Simpan penilaian

### 4. Test di Mobile
- Buka di HP (responsiveness)
- Test semua fitur utama

---

## 🔄 Update Aplikasi (Setelah Deploy)

Setiap kali Anda edit code:

```bash
# Stage changes
git add .

# Commit
git commit -m "Deskripsi perubahan"

# Push ke GitHub
git push

# Vercel akan otomatis deploy! 🎉
```

**Auto-deploy aktif!** Setiap push ke GitHub = auto deploy di Vercel

---

## 🌐 Custom Domain (Opsional)

### Jika Punya Domain (contoh: spmb.attauhid.sch.id):

1. Di Vercel Dashboard → Project → **Settings** → **Domains**
2. Klik **"Add"**
3. Input domain: `spmb.attauhid.sch.id`
4. Vercel akan kasih instruksi DNS:
   - Type: **A Record** atau **CNAME**
   - Value: `76.76.21.21` atau `cname.vercel-dns.com`
5. Login ke provider domain Anda (contoh: Niagahoster, Cloudflare, etc)
6. Tambahkan DNS record sesuai instruksi Vercel
7. Tunggu propagasi (5 menit - 48 jam)
8. SSL Certificate otomatis aktif ✅

---

## 🎉 Production Checklist

Pastikan semua sudah ✅:

- [ ] Repository di GitHub berhasil dibuat
- [ ] Code sudah di-push ke GitHub (48 files)
- [ ] Supabase project sudah dibuat
- [ ] Supabase schema (SQL) sudah dijalankan
- [ ] Vercel project sudah dibuat
- [ ] 3 Environment Variables sudah di-set di Vercel
- [ ] Deploy berhasil (status: Ready ✅)
- [ ] Testing login TU berhasil
- [ ] Testing login Penguji berhasil
- [ ] Testing CRUD data murid berhasil
- [ ] Testing PDF download berhasil
- [ ] Testing WhatsApp berhasil
- [ ] Aplikasi bisa diakses dari HP
- [ ] Custom domain (opsional) sudah setup

---

## 🆘 Troubleshooting

### Error: "Failed to fetch" atau koneksi Supabase gagal
**Solusi:**
1. Cek apakah env vars sudah benar di Vercel
2. Vercel Dashboard → Settings → Environment Variables
3. Pastikan `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` benar
4. Re-deploy: Deployments → klik "..." → Redeploy

### Error: "constraint violation" atau database error
**Solusi:**
1. Buka Supabase SQL Editor
2. Jalankan ulang `supabase-schema.sql` (select all → run)
3. Cek apakah semua tabel sudah terbuat

### Nomor Tes tidak ter-generate
**Solusi:**
1. Set `VITE_TAHUN_AJARAN` di Vercel env vars
2. Atau ubah dari Dashboard TU → menu Tahun Ajaran

### WhatsApp popup diblock
**Solusi:**
1. Browser settings → izinkan popup untuk domain Anda
2. Atau klik kanan icon lock → Site settings → Popups: Allow

### Build failed di Vercel
**Solusi:**
1. Cek build logs di Vercel
2. Pastikan `package.json` dependencies sudah lengkap
3. Coba build lokal: `npm run build`
4. Jika lokal sukses tapi Vercel gagal, cek Node version di Vercel settings

---

## 📞 Support

**Dokumentasi Lengkap:**
- Quick Guide: `QUICK_DEPLOY.md`
- Vercel Guide: `DEPLOY_VERCEL.md`
- Supabase Setup: `SUPABASE_SETUP.md`

**Monitoring:**
- Vercel Logs: vercel.com → project → Deployments → View Function Logs
- Supabase Logs: app.supabase.com → Logs
- Browser Console: F12 → Console tab

---

## 🎊 Selamat!

Aplikasi **SPMB Pondok Pesantren IC At Tauhid** Anda sudah LIVE di internet! 🚀

**Share URL Anda:**
- Staff TU: untuk input data pendaftaran
- Penguji: untuk melakukan penilaian
- Orang tua: untuk menerima kartu peserta via WhatsApp

**Next Level:**
- Setup custom domain
- Monitor analytics di Vercel
- Backup database Supabase secara berkala
- Training untuk staff TU dan Penguji

---

💚 **Developed with ❤️ for Pondok Pesantren IC At Tauhid, Bangka Belitung**

