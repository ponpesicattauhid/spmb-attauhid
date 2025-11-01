# 🔧 Fix Nomor Tes - SDITA Masih 2526

## ❌ Masalah:
- ✅ SMP & SMA: Nomor tes sudah benar (2627)
- ❌ SDITA: Masih pakai 2526 (harusnya 2627)
- ✅ Setting tahun ajaran: Sudah 2627

## 🔍 Kemungkinan Penyebab:

### 1. **Cache Issue**
- Browser cache menyimpan data lama
- Aplikasi cache tahun ajaran lama

### 2. **Database Issue**
- Data siswa lama masih ada di database
- Logic generate nomor tes membaca data lama

### 3. **Environment Variable Issue**
- VITE_TAHUN_AJARAN tidak ter-update
- Build cache masih pakai nilai lama

---

## 🚀 SOLUSI:

### **Step 1: Clear Cache & Hard Refresh**
```bash
# Di browser:
Ctrl + F5 (Windows)
Cmd + Shift + R (Mac)

# Atau buka Incognito/Private window
```

### **Step 2: Cek Environment Variable**
Pastikan di Vercel:
- `VITE_TAHUN_AJARAN = 2627`

### **Step 3: Redeploy dengan Cache Clear**
1. Vercel Dashboard → Project Settings
2. **"Functions"** → **"Clear Build Cache"**
3. **Redeploy** dengan cache OFF

### **Step 4: Cek Database (Jika Masih Error)**
1. Buka Supabase Dashboard
2. **Table Editor** → `students`
3. Filter: `lembaga = 'SD'` dan `tahun_ajaran = '2526'`
4. **Delete** data lama jika ada

### **Step 5: Manual Update Database**
```sql
-- Update tahun ajaran untuk SD yang masih 2526
UPDATE students 
SET tahun_ajaran = '2627' 
WHERE lembaga = 'SD' AND tahun_ajaran = '2526';
```

---

## 🎯 EXPECTED RESULT:

Setelah fix:
- ✅ SDITA: Nomor tes format `SD-2627-XXX`
- ✅ SMPITA: Nomor tes format `SMP-2627-XXX`  
- ✅ SMAITA: Nomor tes format `SMA-2627-XXX`

---

## 🔄 ALTERNATIF: Force Update

Jika masih bermasalah, coba:
1. **Logout** dari aplikasi
2. **Clear browser data** (Cookies, Cache, Local Storage)
3. **Login kembali**
4. **Test tambah data baru**

---

**Coba Step 1 dulu (hard refresh), apakah SDITA sudah benar?**
