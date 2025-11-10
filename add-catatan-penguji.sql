-- Script untuk menambahkan kolom catatan penguji dan informasi tambahan
-- Jalankan di Supabase SQL Editor

-- Tambahkan kolom informasi tambahan jika belum ada
ALTER TABLE students ADD COLUMN IF NOT EXISTS "riwayatPenyakit" TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS "pekerjaanOrangTua" TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS "catatanPenguji" TEXT;

-- Verifikasi kolom sudah ditambahkan
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'students' 
AND column_name IN ('riwayatPenyakit', 'pekerjaanOrangTua', 'catatanPenguji')
ORDER BY column_name;