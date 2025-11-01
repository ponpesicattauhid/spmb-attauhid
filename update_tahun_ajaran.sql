-- SQL Script untuk Update Tahun Ajaran dari 2526 ke 2627
-- Jalankan script ini di database untuk update semua data sekaligus

-- Update nomor tes dari 2526 ke 2627
UPDATE students 
SET noTes = REPLACE(noTes, '2526', '2627')
WHERE noTes LIKE '%2526%';

-- Verifikasi hasil update
SELECT noTes, lembaga, data->>'namaSiswa' as nama_siswa
FROM students 
WHERE noTes LIKE '%2627%'
ORDER BY noTes;

-- Check berapa banyak yang diupdate
SELECT 
  COUNT(*) as total_updated,
  'Siswa dengan tahun ajaran 2627' as description
FROM students 
WHERE noTes LIKE '%2627%';
