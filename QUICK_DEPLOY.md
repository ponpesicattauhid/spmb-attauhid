# ⚡ Quick Deploy to Vercel

## 🎯 Super Quick (5 Menit)

### 1. Setup Supabase
```
1. Buka https://app.supabase.com/
2. Create new project
3. SQL Editor → Copy paste isi supabase-schema.sql → Run
4. Settings → API → Copy URL & anon key
```

### 2. Deploy ke Vercel
```bash
# Push ke GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/spmb-attauhid.git
git push -u origin main
```

```
1. Buka https://vercel.com
2. Import project dari GitHub
3. Add Environment Variables:
   - VITE_SUPABASE_URL = (paste dari step 1)
   - VITE_SUPABASE_ANON_KEY = (paste dari step 1)
   - VITE_TAHUN_AJARAN = 2627
4. Deploy!
```

### 3. Done! ✅
Aplikasi Anda live di: `https://spmb-attauhid.vercel.app`

---

## 🔧 Local Development

```bash
# 1. Copy env.example ke .env
cp env.example .env

# 2. Edit .env dengan Supabase credentials Anda

# 3. Install & Run
npm install
npm run dev
```

---

## 📱 Next Steps

- Test login TU/Penguji
- Tambah data calon murid
- Download PDF & kirim WA
- Setup custom domain (opsional)

**Detail lengkap:** Lihat `DEPLOY_VERCEL.md`

