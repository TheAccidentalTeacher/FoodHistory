# Deployment Quick Reference

## ✅ What's Done

- Next.js 16.1.6 app fully built (Phases 0-3 complete)
- Supabase project active with 24 tables
- GitHub repo: https://github.com/TheAccidentalTeacher/FoodHistory
- Local development environment working
- Security: `.env.local` excluded from git
- Credentials documented in `DEPLOYMENT-CREDENTIALS.md`

## 🚀 Vercel Deployment Steps

1. **Connect GitHub to Vercel**
   - Go to vercel.com
   - Import project from GitHub: `TheAccidentalTeacher/FoodHistory`

2. **Set Environment Variables**
   - Go to Settings → Environment Variables
   - Add 3 variables (see `DEPLOYMENT-CREDENTIALS.md`):
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`

3. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Test signup/login

## 🔑 Critical Info

**Supabase Project ID:** `uplkcrjdvcxisduysmwk`  
**Supabase URL:** `https://uplkcrjdvcxisduysmwk.supabase.co`

⚠️ **Common Mistake:** Make sure the project ref in the URL matches exactly (it's easy to misread the random string)

## 🧪 Testing After Deployment

1. Go to your Vercel URL
2. Click "Get Started" or "Sign Up"
3. Fill in:
   - Email: test@test.com
   - Password: testtest
   - Full Name: Timothy
   - Account Type: Student
   - Age: 15
4. Should redirect to `/dashboard`
5. Should see "Welcome, Timothy!" with 0% progress

## 📁 File Locations

- **Credentials:** `DEPLOYMENT-CREDENTIALS.md` (gitignored)
- **Local env:** `c:\Users\scoso\WEBSITES\FoodHistory\.env.local`
- **Database schema:** `database/schema.sql` (448 lines, already applied)
- **Homepage:** `src/app/page.tsx`
- **Dashboard:** `src/app/dashboard/page.tsx`

## 🐛 Troubleshooting

**ERR_NAME_NOT_RESOLVED?**
- Double-check Supabase URL in Vercel matches: `uplkcrjdvcxisduysmwk`
- Redeploy after fixing

**Build fails?**
- Check console for TypeScript errors
- Verify all imports are correct
- Make sure no curly quotes in code

**Login fails?**
- Check Supabase project is active (not paused)
- Verify API keys match the project
- Check browser console for errors
