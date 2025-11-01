-- SQL Script untuk Sinkronisasi Tahun Ajaran
-- Update semua nomor tes dari 2526 ke 2627

-- 1. Update nomor tes di tabel students
UPDATE students 
SET noTes = REPLACE(noTes, '2526', '2627')
WHERE noTes LIKE '%2526%';

-- 2. Verifikasi hasil update
SELECT 
  noTes,
  lembaga,
  data->>'namaSiswa' as nama_siswa,
  data->>'namaOrangTua' as nama_orang_tua
FROM students 
WHERE noTes LIKE '%2627%'
ORDER BY noTes;

-- 3. Check berapa banyak yang diupdate
SELECT 
  COUNT(*) as total_updated,
  'Siswa dengan tahun ajaran 2627' as description
FROM students 
WHERE noTes LIKE '%2627%';

-- 4. Check apakah masih ada yang 2526
SELECT 
  COUNT(*) as remaining_old,
  'Siswa yang masih pakai 2526' as description
FROM students 
WHERE noTes LIKE '%2526%';
