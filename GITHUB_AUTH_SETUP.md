# 🔑 Setup Authentication untuk Private GitHub Repository

## ✅ Status: Repository Private - Perlu Authentication

Repository Anda: `ponpesicattauhid/spmb-attauhid` (Private)

---

## 🚀 Opsi 1: Personal Access Token (RECOMMENDED)

### Step 1: Generate Personal Access Token

1. Buka GitHub → **Settings** (icon profil kanan atas)
2. Scroll ke bawah → **Developer settings** (di sidebar kiri)
3. **Personal access tokens** → **Tokens (classic)**
4. Klik **"Generate new token"** → **"Generate new token (classic)"**
5. Isi form:
   - **Note:** "SPMB At Tauhid Deployment"
   - **Expiration:** 90 days (atau No expiration)
   - **Select scopes:** ✅ **repo** (full control of private repositories)
6. Klik **"Generate token"**
7. ⚠️ **COPY TOKEN** (hanya muncul sekali!)

### Step 2: Push dengan Token

Setelah dapat token, jalankan command ini (ganti `YOUR_TOKEN`):

```bash
git remote set-url origin https://YOUR_TOKEN@github.com/ponpesicattauhid/spmb-attauhid.git
git push -u origin main
```

**Contoh:**
```bash
git remote set-url origin https://ghp_abc123xyz@github.com/ponpesicattauhid/spmb-attauhid.git
git push -u origin main
```

---

## 🔄 Opsi 2: Git Credential Manager (Windows)

### Step 1: Setup Credential Manager

```bash
git config --global credential.helper manager-core
```

### Step 2: Push (akan minta login)

```bash
git push -u origin main
```

- Username: `ponpesicattauhid`
- Password: **Gunakan Personal Access Token** (bukan password GitHub)

---

## 🌐 Opsi 3: Buat Repository Public (Paling Mudah)

### Step 1: Ubah ke Public

1. Buka repository: https://github.com/ponpesicattauhid/spmb-attauhid
2. **Settings** → **General**
3. Scroll ke bawah → **"Change repository visibility"**
4. **"Make public"**
5. Ketik nama repository untuk konfirmasi
6. **"I understand, change repository visibility"**

### Step 2: Push Normal

```bash
git push -u origin main
```

---

## ✅ Verifikasi Berhasil

Setelah push berhasil, Anda akan melihat:

```
Enumerating objects: 52, done.
Counting objects: 100% (52/52), done.
Delta compression using up to 8 threads
Compressing objects: 100% (49/49), done.
Writing objects: 100% (52/52), 27.45 KiB | 2.28 MiB/s, done.
Total 52 (delta 13), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (13/13), done.
To https://github.com/ponpesicattauhid/spmb-attauhid.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

## 🎯 Rekomendasi

**Untuk project SPMB:** Saya sarankan **Opsi 3** (Public) karena:
- ✅ Tidak perlu setup authentication
- ✅ Mudah diakses oleh tim
- ✅ Vercel mudah import
- ✅ Tidak ada masalah credential

**Untuk keamanan:** Jika harus private, gunakan **Opsi 1** (Personal Access Token)

---

## 📋 Checklist

- [ ] Generate Personal Access Token (jika private)
- [ ] Update remote URL dengan token
- [ ] Push ke GitHub
- [ ] Verifikasi file ada di GitHub
- [ ] Lanjut deploy ke Vercel

---

## 🚀 Next Step: Deploy ke Vercel

Setelah push berhasil, lanjut ke:
1. Setup Supabase database
2. Deploy ke Vercel
3. Set environment variables
4. Test aplikasi

Baca: `DEPLOYMENT_STEPS.md` untuk panduan lengkap!

