# Vercel Deployment Guide

## ✅ Security Check Complete
- `.env.local` is properly excluded from git
- `SUPABASE-CREDENTIALS.txt` is properly excluded from git
- Code pushed to GitHub: https://github.com/TheAccidentalTeacher/FoodHistory

---

## Deploy to Vercel

### Step 1: Import Project
1. Go to https://vercel.com/new
2. Click "Import Project"
3. Select your GitHub account
4. Find and import: `TheAccidentalTeacher/FoodHistory`

### Step 2: Configure Environment Variables
**CRITICAL:** Add these 3 environment variables before deploying:

```
NEXT_PUBLIC_SUPABASE_URL=https://upikopjdvcvisduysmwk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwaWtvcGpkdmN2aXNkdXlzbXdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4ODQxMzQsImV4cCI6MjA1NDQ2MDEzNH0.WBHPyGZlgXKjMSlD13ozgDYRyLqzZOOhvWhD93kObck
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwaWtvcGpkdmN2aXNkdXlzbXdrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODg4NDEzNCwiZXhwIjoyMDU0NDYwMTM0fQ.Kc8sWD0hQtK6LAjJVDTzkPB_Jfuj7sLI5sJvBm7IYfY
```

**How to add them in Vercel:**
1. During import, scroll to "Environment Variables" section
2. Add each variable name and value
3. Check "Production", "Preview", and "Development" for all three
4. Click "Add" for each one

### Step 3: Deploy Settings
- **Framework Preset:** Next.js (should auto-detect)
- **Build Command:** `npm run build` (auto-configured)
- **Output Directory:** `.next` (auto-configured)
- **Install Command:** `npm install` (auto-configured)
- **Root Directory:** Leave as `.` (root)

### Step 4: Deploy!
Click "Deploy" and wait 2-3 minutes.

---

## Post-Deployment

### Test Your Deployment
Once live, test these pages:
1. `/signup` - Create test account
2. `/login` - Sign in
3. `/dashboard` - View dashboard
4. `/units` - Browse units (will be empty until seeded)

### Seed Content (Run Locally)
After deployment works, seed Unit 4:
```bash
npm run seed -- --unit 4
```

### Your Deployment URLs
- **Production:** `https://food-history-[random].vercel.app`
- **Custom Domain:** Can add in Vercel dashboard settings

---

## Troubleshooting

### Error: "Could not connect to Supabase"
- Check that all 3 environment variables are set correctly in Vercel
- Redeploy after adding/fixing variables

### Error: "Database connection failed"
- Verify your Supabase SQL schema ran successfully
- Check Supabase API keys are still valid in the dashboard

### Error: Build failed
- Check the build logs in Vercel
- Usually means a TypeScript error or missing dependency

---

## Important Notes

⚠️ **Never commit** `.env.local` or `SUPABASE-CREDENTIALS.txt` to git
✅ **Always use** Vercel's environment variable UI for secrets
🔄 **Redeploy required** when environment variables change
