# 🚀 Panduan Deploy ke Vercel

## Persiapan

### 1. Setup Supabase Database
1. Buka [Supabase Dashboard](https://app.supabase.com/)
2. Buat project baru (atau gunakan yang sudah ada)
3. Buka **SQL Editor**
4. Copy-paste isi file `supabase-schema.sql`
5. Klik **Run** untuk eksekusi schema
6. Verifikasi bahwa tabel-tabel sudah terbuat:
   - `students`
   - `evaluations`
   - `settings`

### 2. Dapatkan Supabase Credentials
1. Di Supabase Dashboard, buka **Project Settings** → **API**
2. Copy nilai berikut:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon/public key** → `VITE_SUPABASE_ANON_KEY`

---

## 🌐 Deploy ke Vercel (Metode 1: Via Website)

### Step 1: Push ke Git Repository
```bash
# Inisialisasi git (jika belum)
git init

# Tambahkan semua file
git add .

# Commit
git commit -m "Initial commit - SPMB At Tauhid"

# Hubungkan dengan GitHub/GitLab (contoh GitHub)
git remote add origin https://github.com/username/spmb-attauhid.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy di Vercel
1. Buka [vercel.com](https://vercel.com)
2. Login dengan GitHub/GitLab
3. Klik **Add New...** → **Project**
4. Import repository `spmb-attauhid`
5. **Framework Preset**: Vercel akan auto-detect Vite ✅
6. **Build Settings**: (sudah otomatis dari vercel.json)
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Step 3: Set Environment Variables
Di Vercel project settings, tambahkan:
```
VITE_SUPABASE_URL = https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGci...
VITE_TAHUN_AJARAN = 2627
```

### Step 4: Deploy!
- Klik **Deploy**
- Tunggu 1-2 menit
- Aplikasi Anda akan live di: `https://spmb-attauhid.vercel.app`

---

## 💻 Deploy ke Vercel (Metode 2: Via CLI)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login
```bash
vercel login
```

### Step 3: Deploy
```bash
# Deploy (interactive)
vercel

# Atau langsung production
vercel --prod
```

### Step 4: Set Environment Variables
```bash
vercel env add VITE_SUPABASE_URL
# Paste nilai: https://xxxxx.supabase.co

vercel env add VITE_SUPABASE_ANON_KEY
# Paste nilai: eyJhbGci...

vercel env add VITE_TAHUN_AJARAN
# Paste nilai: 2627
```

### Step 5: Redeploy dengan env vars
```bash
vercel --prod
```

---

## ✅ Testing Pasca Deploy

### 1. Buka aplikasi di browser
Contoh: `https://spmb-attauhid.vercel.app`

### 2. Test Login TU
- Pilih role: **Tata Usaha (TU)**
- Username: (sesuai di Supabase)
- Password: (sesuai di Supabase)

### 3. Test Fitur Utama
- ✅ Tambah calon murid baru
- ✅ Edit data murid
- ✅ Hapus data murid
- ✅ Download PDF kartu peserta
- ✅ Kirim WhatsApp
- ✅ Ubah tahun ajaran dari Dashboard

### 4. Test Login Penguji
- ✅ Login sebagai penguji
- ✅ Lihat jadwal tes hari ini
- ✅ Beri penilaian
- ✅ Simpan penilaian

---

## 🔧 Troubleshooting

### Error: "Failed to fetch"
- Cek apakah `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` sudah benar
- Verifikasi di Vercel Dashboard → Settings → Environment Variables

### Error: "constraint violation"
- Jalankan ulang `supabase-schema.sql` di Supabase SQL Editor
- Pastikan semua constraint dan unique index sudah terbuat

### Nomor Tes tidak generate
- Pastikan `VITE_TAHUN_AJARAN` sudah di-set (contoh: 2627)
- Atau atur dari **Dashboard TU** → Ubah Tahun Ajaran

### WhatsApp popup blocked
- Izinkan popup di browser settings
- Atau klik kanan → "Allow popups from this site"

---

## 🔄 Auto-Deploy

Setelah setup awal, setiap kali Anda push ke repository:
```bash
git add .
git commit -m "Update feature"
git push
```

Vercel akan **otomatis deploy** perubahan Anda! 🎉

---

## 📊 Domain Custom (Opsional)

1. Buka Vercel Dashboard → Project → **Settings** → **Domains**
2. Tambahkan domain Anda (contoh: `spmb.attauhid.sch.id`)
3. Update DNS records sesuai instruksi Vercel
4. Tunggu propagasi DNS (5-48 jam)

---

## 🎯 Production Checklist

- [ ] Supabase schema sudah dijalankan
- [ ] Environment variables sudah di-set di Vercel
- [ ] Repository sudah di-push ke Git
- [ ] Deploy berhasil (status: Ready)
- [ ] Testing login TU & Penguji berhasil
- [ ] Testing tambah/edit/hapus data berhasil
- [ ] Testing PDF & WhatsApp berhasil
- [ ] RLS policies Supabase aktif
- [ ] Custom domain configured (opsional)

---

## 📞 Support

Jika ada masalah, cek:
1. Vercel deployment logs
2. Browser console (F12)
3. Supabase logs di Dashboard

**Selamat! Aplikasi SPMB At Tauhid Anda sudah live! 🚀**

