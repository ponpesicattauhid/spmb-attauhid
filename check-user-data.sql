-- Check user data untuk melihat field name dan username
SELECT id, name, username, role, "createdAt" 
FROM users 
WHERE username LIKE '%azali%' OR name LIKE '%azali%' OR role = 'PENGUJI'
ORDER BY "createdAt" DESC;

-- Update user Azali jika name kosong (gunakan username sebagai name)
UPDATE users 
SET name = username 
WHERE username = 'azali' AND (name IS NULL OR name = '' OR name = username);

-- Cek hasil update
SELECT id, name, username, role 
FROM users 
WHERE username = 'azali';
