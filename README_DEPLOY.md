Deploy Guide

Aplikasi ini React + Vite (TypeScript) dengan Supabase.

1) Environment Variables (wajib)
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- VITE_TAHUN_AJARAN (opsional, contoh 2627)

2) Build
- npm ci
- npm run build
- Output: folder dist/

3) Opsi Deploy yang disarankan
- Vercel: framework Vite, build npm run build, output dist
- Netlify: build npm run build, publish dist
- Render (Static Site): build npm run build, publish dist

4) Supabase
- Jalankan supabase-schema.sql sekali di SQL Editor
- Set RLS/policies sudah termasuk di file schema

5) Pasca Deploy cek
- Login, tambah siswa, cetak PDF, kirim WA
- Ubah Tahun Ajaran di Dashboard TU dan refresh

6) Troubleshooting
- 400 constraint: jalankan bagian constraint di supabase-schema.sql
- No Tes tahun ajaran: set VITE_TAHUN_AJARAN atau atur dari Dashboard TU
- Popup WA diblokir: izinkan pop-up di browser


