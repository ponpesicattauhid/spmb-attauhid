# 🔧 Vercel Build Error - Troubleshooting

## ❌ Error: "Command 'npm run build' exited with 1"

### 🔍 Analisis Masalah:
- ✅ Environment Variables: Sudah benar (3 variabel set)
- ✅ Build lokal: Sukses (1.2MB, 6.6s)
- ❌ Build di Vercel: Gagal (11s, exit code 1)

### 🎯 Kemungkinan Penyebab:

1. **Node.js Version Mismatch**
2. **Dependencies Issue**
3. **Build Command Problem**
4. **Memory/Timeout Issue**

---

## 🚀 SOLUSI 1: Cek Build Logs Detail

### Step 1: Lihat Build Logs
1. Di Vercel dashboard, klik deployment yang error
2. Scroll ke bawah → **"Build Logs"** atau **"Function Logs"**
3. Lihat error detail yang menyebabkan exit code 1

### Step 2: Screenshot Error Logs
Copy-paste error message dari build logs untuk analisis lebih lanjut.

---

## 🚀 SOLUSI 2: Fix Build Command

### Option A: Simplify Build Command
Ubah di Vercel settings:
- **Build Command:** `npm run build` → `npm ci && npm run build`
- **Output Directory:** `dist`

### Option B: Use Custom Build Script
Buat script khusus untuk Vercel:

```json
// package.json
{
  "scripts": {
    "build": "tsc && vite build",
    "build:vercel": "npm ci && tsc && vite build"
  }
}
```

---

## 🚀 SOLUSI 3: Force Clean Build

### Step 1: Clear All Cache
1. Vercel Dashboard → Project Settings
2. **"Functions"** → **"Clear Build Cache"**
3. **"Redeploy"** dengan cache OFF

### Step 2: Update package.json
Pastikan dependencies lengkap:

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.75.0",
    "jspdf": "^3.0.3",
    "lucide-react": "^0.294.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/jspdf": "^1.3.3",
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.3.6",
    "typescript": "^5.2.2",
    "vite": "^5.0.8"
  }
}
```

---

## 🚀 SOLUSI 4: Alternative Build Config

### Update vite.config.ts untuk Vercel:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})
```

---

## 🚀 SOLUSI 5: Deploy via CLI (Alternative)

Jika web interface bermasalah:

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Set environment variables via CLI
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY  
vercel env add VITE_TAHUN_AJARAN

# Deploy again
vercel --prod
```

---

## 📋 ACTION PLAN

### Immediate Steps:
1. **Cek Build Logs** di Vercel untuk error detail
2. **Clear Build Cache** di project settings
3. **Redeploy** dengan cache OFF

### If Still Failing:
1. **Update build command** ke `npm ci && npm run build`
2. **Simplify vite.config.ts**
3. **Try CLI deployment**

---

## 🎯 Expected Result

Setelah fix:
- ✅ Build sukses di Vercel
- ✅ App live di: `https://spmb-attauhid.vercel.app`
- ✅ Login TU/Penguji berfungsi
- ✅ Database connection OK

---

**Next: Cek build logs detail untuk melihat error spesifik!**
