# Supabase Setup Guide

## Prerequisites
Your Supabase project credentials are already configured in the application:
- **Supabase URL**: https://fuwfnakfiykehjkklqrb.supabase.co
- **Anon Key**: Already configured in `src/lib/supabase.ts`

## Setup Steps

### 1. Create Database Tables

1. Go to your Supabase Dashboard: https://app.supabase.com
2. Select your project: `fuwfnakfiykehjkklqrb`
3. Click on **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy the contents of `supabase-schema.sql` file
6. Paste it into the SQL editor
7. Click **Run** or press `Ctrl+Enter`

This will create:
- ✅ `users` table for authentication and user management
- ✅ `students` table for student registration data
- ✅ Default admin user (username: `admin`, password: `admin123`)
- ✅ Indexes for better performance
- ✅ Row Level Security policies

### 1b. Upgrade Existing Schema (Jika Sudah Pernah Dibuat)

Jika Anda melihat error 400 saat membaca/menyimpan data `students`, jalankan kembali file `supabase-schema.sql` untuk menambahkan kolom penilaian yang dibutuhkan aplikasi:

- `mathCorrect` (INTEGER, default 0)
- `hafalanBenar` (INTEGER, default 0)
- `nilaiAkhir` (INTEGER, default 0)
- `kelulusan` (TEXT, nilai: `LULUS` atau `TIDAK LULUS`)

File `supabase-schema.sql` sudah mencakup bagian upgrade (ALTER TABLE) sehingga aman dijalankan ulang.

### 2. Verify Setup

After running the SQL:

1. Go to **Table Editor** in the left sidebar
2. You should see two tables:
   - `users` - with 1 row (default admin)
   - `students` - empty initially
     - Pastikan kolom berikut tersedia: `penilaianAnak`, `penilaianOrtu`, `mathCorrect`, `hafalanBenar`, `nilaiAkhir`, `kelulusan`, `status`, `penguji`, `createdAt`

### 3. Test the Application

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open the application in your browser (usually http://localhost:3000)

3. Login with default credentials:
   - **Username**: `admin`
   - **Password**: `admin123`

4. As admin, you can:
   - Create new users (TU, PENGUJI, ADMIN roles)
   - Manage user accounts
   - Access all features

### 4. Security Notes

⚠️ **Important**: For production use, you should:

1. **Change the default admin password** immediately after first login
2. **Use environment variables** for sensitive data:
   - Create a `.env` file (already configured)
   - Never commit `.env` to version control
   
3. **Update RLS Policies** in Supabase for better security:
   - Currently, all operations are allowed for development
   - In production, restrict based on user roles

### 5. Database Structure

#### Users Table
| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Unique user ID |
| name | TEXT | Full name |
| username | TEXT | Login username (unique) |
| password | TEXT | Password (stored as plain text for now) |
| role | TEXT | TU, PENGUJI, or ADMIN |
| createdAt | TIMESTAMP | Creation date |
| createdBy | TEXT | Username of creator |

#### Students Table
| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Unique student ID |
| noTes | TEXT | Test number (unique) |
| lembaga | TEXT | Institution (SDITA, SMPITA, SMAITA) |
| lembagaName | TEXT | Full institution name |
| data | JSONB | Student form data |
| penilaianAnak | JSONB | Child assessment scores |
| penilaianOrtu | JSONB | Parent assessment scores |
| mathCorrect | INTEGER | Correct math answers (0-5) |
| hafalanBenar | INTEGER | Correct memorization verses (0-15) |
| nilaiAkhir | INTEGER | Final score (0-100) |
| kelulusan | TEXT | LULUS or TIDAK LULUS |
| status | TEXT | BELUM DINILAI or SUDAH DINILAI |
| penguji | TEXT | Examiner name |
| createdAt | TIMESTAMP | Registration date |

## Features

### Role-Based Access Control

- **ADMIN**: 
  - Create, edit, delete users
  - Reset user passwords
  - Access all TU and PENGUJI features
  - View user management dashboard

- **TU (Tata Usaha)**:
  - Register new students
  - Edit student information
  - Delete registrations
  - View all students

- **PENGUJI (Examiner)**:
  - View assigned students
  - Conduct assessments
  - Submit evaluation scores
  - View student details

### Data Persistence

All data is now stored in Supabase PostgreSQL database:
- ✅ Real-time sync across devices
- ✅ Automatic backups
- ✅ Scalable storage
- ✅ No data loss on browser refresh

## Troubleshooting

### Issue: Tables not created
**Solution**: Make sure you're in the correct Supabase project and have sufficient permissions.

### Issue: Connection errors
**Solution**: Verify your Supabase URL and Anon Key in `src/lib/supabase.ts`.

### Issue: Cannot login
**Solution**: Check that the `users` table was created and contains the default admin user.

### Issue: Data not saving
**Solution**:
- Check browser console for errors.
- Jika error 400 saat mengakses `students`, jalankan ulang `supabase-schema.sql` (bagian upgrade akan menambahkan kolom yang hilang).
- Verify RLS policies are set correctly.

## Support

For issues or questions:
1. Check the browser console for error messages
2. Review Supabase logs in the Dashboard
3. Verify all tables and policies are created correctly



