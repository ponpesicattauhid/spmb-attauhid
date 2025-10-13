# ⚡ Quick Fix - Repository Private

## 🔍 Masalah: Repository Private → Perlu Authentication

### 🌟 SOLUSI TERCEPAT: Personal Access Token

#### Step 1: Generate Token (2 menit)
1. Buka: https://github.com/settings/tokens
2. **"Generate new token"** → **"Generate new token (classic)"**
3. Isi:
   - **Note:** SPMB At Tauhid
   - **Expiration:** 90 days
   - **Scopes:** ✅ **repo** (full control)
4. **"Generate token"**
5. ⚠️ **COPY TOKEN** (contoh: `ghp_abc123xyz`)

#### Step 2: Push dengan Token
```bash
# Ganti YOUR_TOKEN dengan token yang dicopy
git remote set-url origin https://YOUR_TOKEN@github.com/ponpesicattauhid/spmb-attauhid.git
git push -u origin main
```

**Contoh:**
```bash
git remote set-url origin https://ghp_abc123xyz@github.com/ponpesicattauhid/spmb-attauhid.git
git push -u origin main
```

---

## 🔄 ALTERNATIF: Buat Repository Public

#### Step 1: Ubah ke Public
1. Buka: https://github.com/ponpesicattauhid/spmb-attauhid
2. **Settings** → **General**
3. Scroll ke bawah → **"Change repository visibility"**
4. **"Make public"**
5. Konfirmasi

#### Step 2: Push Normal
```bash
git push -u origin main
```

---

## 🎯 Mana yang Dipilih?

**Public Repository** = Lebih mudah, tidak perlu token
**Private Repository** = Lebih aman, perlu token

**Rekomendasi:** Public dulu untuk project SPMB ini, mudah diakses tim.

---

## ✅ Setelah Push Berhasil

Lanjut ke:
1. Setup Supabase database
2. Deploy ke Vercel
3. Test aplikasi

Baca: `DEPLOYMENT_STEPS.md`
