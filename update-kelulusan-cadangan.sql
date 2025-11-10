-- Script untuk menambahkan status CADANGAN ke constraint kelulusan
-- Jalankan di Supabase SQL Editor

-- Drop constraint lama
ALTER TABLE students DROP CONSTRAINT IF EXISTS students_kelulusan_check;

-- Tambahkan constraint baru dengan CADANGAN
ALTER TABLE students 
  ADD CONSTRAINT students_kelulusan_check 
  CHECK ("kelulusan" IS NULL OR "kelulusan" IN ('LULUS', 'CADANGAN', 'TIDAK LULUS'));

-- Verifikasi constraint sudah diupdate
SELECT conname, pg_get_constraintdef(oid) as definition
FROM pg_constraint
WHERE conname = 'students_kelulusan_check';