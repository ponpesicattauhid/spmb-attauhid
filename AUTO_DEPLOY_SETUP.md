# 🔄 Setup Auto-Redeploy System

## 🚀 GitHub Actions Workflow (Sudah Dibuat)

File: `.github/workflows/deploy.yml` sudah dibuat dengan konfigurasi:
- ✅ **Trigger**: Push ke branch main/master
- ✅ **Auto-build**: npm run build
- ✅ **Auto-deploy**: Deploy ke Vercel
- ✅ **Environment**: Production ready

## 🔧 Setup di GitHub Repository

### Step 1: Upload Workflow File
1. **Upload file** `.github/workflows/deploy.yml` ke repository
2. **Commit** dengan pesan: "Add auto-deploy workflow"

### Step 2: Setup Secrets di GitHub
1. **Buka repository** → **Settings** → **Secrets and variables** → **Actions**
2. **Add secrets** berikut:

```
VERCEL_TOKEN=your_vercel_token_here
ORG_ID=your_vercel_org_id
PROJECT_ID=prj_fbyfDxAOxi0H8lkwozVRg1qSh6I0
```

### Step 3: Get Vercel Tokens
```bash
# Install Vercel CLI (sudah ada)
npm install -g vercel

# Login dan get tokens
vercel login
vercel link  # Link to existing project
```

## 🎯 Cara Kerja Auto-Deploy

### Workflow Trigger:
```yaml
on:
  push:
    branches: [ main, master ]  # Auto-deploy saat push
  pull_request:
    branches: [ main, master ]  # Test saat PR
```

### Build Process:
1. **Checkout** code dari GitHub
2. **Install** dependencies (npm ci)
3. **Build** aplikasi (npm run build)
4. **Deploy** ke Vercel production

### Timeline:
- **Push code** → **2-3 menit** → **Live deployment**

## 📁 Upload Package Ready

### Folder `dist` Contents:
```
dist/
├── index.html (0.47 kB)
└── assets/
    ├── index-BGC8VNqk.css (38.61 kB)
    ├── purify.es-aGzT-_H7.js (22.15 kB)
    ├── index.es-CyGANmgr.js (150.45 kB)
    ├── html2canvas.esm-CBrSDip1.js (201.42 kB)
    └── index-CvnIopGl.js (3,945.74 kB) ← All new features here!
```

### Files to Upload:
1. **`dist/` folder** (complete build)
2. **`.github/workflows/deploy.yml`** (auto-deploy)
3. **`vercel.json`** (Vercel config)

## 🚀 Upload Instructions

### Method 1: Drag & Drop (Easiest)
1. **Open GitHub repository** in browser
2. **Drag `dist` folder** from Windows Explorer
3. **Drop** in GitHub interface
4. **Commit**: "Deploy: All new features included"

### Method 2: Zip Upload
1. **Zip `dist` folder**
2. **Upload zip** to GitHub
3. **Extract** in repository
4. **Commit changes**

### Method 3: Manual File Upload
1. **Create `dist` folder** in GitHub
2. **Upload each file** individually
3. **Maintain folder structure**

## 🔄 Future Auto-Deploy

### After Initial Setup:
1. **Make changes** to source code locally
2. **Build**: `npm run build`
3. **Upload new `dist`** to GitHub
4. **Auto-deploy** triggers automatically

### Or with Git (Future):
```bash
git add .
git commit -m "feat: new feature"
git push origin main
# Auto-deploy triggers in 2-3 minutes
```

## 🔍 Monitoring Auto-Deploy

### GitHub Actions Tab:
- **View workflow** runs
- **Check build** logs
- **Monitor deployment** status

### Vercel Dashboard:
- **Deployment history**
- **Build logs**
- **Performance metrics**

## 🛠️ Troubleshooting Auto-Deploy

### If Workflow Fails:
1. **Check GitHub Actions** logs
2. **Verify secrets** are set correctly
3. **Check Vercel** project settings
4. **Manual deploy** as fallback

### Common Issues:
- **Missing secrets** → Add in GitHub Settings
- **Wrong project ID** → Verify in Vercel
- **Build errors** → Check package.json scripts
- **Permission issues** → Check Vercel team access

---

## 🎉 Ready for Upload & Auto-Deploy!

### Current Status:
- ✅ **Build completed** (7.36s)
- ✅ **All features included** in dist
- ✅ **Auto-deploy workflow** created
- ✅ **Vercel config** ready

### Next Steps:
1. **Upload `dist` folder** to GitHub
2. **Upload `.github/workflows/deploy.yml`**
3. **Setup GitHub secrets** (optional for now)
4. **Test deployment**

**Folder `dist` siap upload dan auto-deploy sudah dikonfigurasi!** 🚀