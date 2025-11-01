# Panduan Sinkronisasi Tahun Ajaran

## 🎯 **Masalah**
- **Tahun Ajaran di Dashboard TU:** `2627` ✅
- **No. Tes di Data Santri:** `SMP-2526-004` ❌ (masih 2526)

## 🔧 **Solusi**

### **Cara 1: Update Manual (Per Siswa)**

**Langkah:**
1. **Login sebagai TU**
2. **Klik tombol "Edit"** (biru) pada siswa `MAHIRAH SOLIHATUNNISA`
3. **Ubah nomor tes** dari `SMP-2526-004` menjadi `SMP-2627-004`
4. **Save**
5. **Ulangi untuk siswa lain:**
   - `MUHAMMAD SYAFIQ AL QAFI`: `SMP-2526-003` → `SMP-2627-003`
   - `AZKA VISCARA`: `SMP-2526-002` → `SMP-2627-002`

### **Cara 2: SQL Script (Database)**

**Jalankan script SQL:**
```sql
-- Update semua nomor tes dari 2526 ke 2627
UPDATE students 
SET noTes = REPLACE(noTes, '2526', '2627')
WHERE noTes LIKE '%2526%';
```

### **Cara 3: Test Export PDF**

**Setelah update:**
1. **Export PDF** (tombol merah)
2. **Check header:** Seharusnya tampil **"Tahun Ajaran 2026/2027"** ✅
3. **Check tabel:** No. Tes seharusnya `SMP-2627-xxx`

## 📋 **Expected Result**

**Sebelum:**
```
Tahun Ajaran di Dashboard: 2627
No. Tes Santri: SMP-2526-004, SMP-2526-003, SMP-2526-002
PDF Display: 2025/2026 ❌
```

**Sesudah:**
```
Tahun Ajaran di Dashboard: 2627
No. Tes Santri: SMP-2627-004, SMP-2627-003, SMP-2627-002
PDF Display: 2026/2027 ✅
```

## 🎯 **Action Items**

1. **Pilih cara update** (manual atau SQL)
2. **Update semua nomor tes** dari 2526 ke 2627
3. **Test export PDF**
4. **Verify:** Tahun ajaran di PDF = 2026/2027

## 💡 **Catatan**

- **Santri baru** akan otomatis dapat nomor tes dengan `2627`
- **Santri lama** perlu diupdate manual atau via SQL
- **Tahun ajaran di dashboard** sudah benar (`2627`)
