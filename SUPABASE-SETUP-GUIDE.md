# Supabase Setup Guide for Food Throughout History

This guide will walk you through setting up the Supabase backend for the Food Throughout History application.

## Prerequisites

✅ **Already Completed:**
- Next.js application initialized
- Supabase client utilities created
- Authentication pages (login/signup) built
- TypeScript type definitions created
- Protected routes configured

## Step 1: Create Supabase Project (5 minutes)

1. **Go to Supabase Dashboard:**
   - Visit: https://supabase.com/dashboard
   - Sign in with GitHub (or create account if needed)

2. **Create New Project:**
   - Click **"New Project"** button
   - **Organization:** Select your organization (or create one)
   - **Project Name:** `food-history-app`
   - **Database Password:** Generate a strong password (save it securely!)
   - **Region:** `US West` (or closest to your location)
   - **Pricing Plan:** Free (sufficient for development)
   - Click **"Create new project"**

3. **Wait for Provisioning:**
   - Takes ~2 minutes for project to be ready
   - Status will show "Project is being set up..."
   - You'll see "Project is ready" when complete

## Step 2: Get API Credentials (2 minutes)

1. **Navigate to Project Settings:**
   - Click **Settings** (gear icon) in left sidebar
   - Click **API** under "Project Settings"

2. **Copy API Credentials:**
   You'll need these three values:
   
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Anon/Public Key** (starts with `eyJ...` - long JWT token)
   - **Service Role Key** (starts with `eyJ...` - different token)

3. **Add to `.env.local` File:**
   - Open `.env.local` in your FoodHistory project
   - Replace the placeholder values:
   
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

   - Save the file

## Step 3: Run Database Schema (10 minutes)

1. **Open SQL Editor:**
   - In Supabase dashboard, click **SQL Editor** in left sidebar
   - Click **"New query"** button

2. **Copy Database Schema:**
   - Open `BRAINSTORM-COMPLETE.md` in your project (or see schema below)
   - Find Section 4.2: "Database Schema (SQL)"
   - Copy the entire SQL schema

3. **Execute Schema SQL:**
   - Paste SQL into Supabase SQL Editor
   - Click **Run** button (or press Ctrl+Enter)
   - Wait for execution to complete
   - You should see "Success. No rows returned"

4. **Verify Tables Created:**
   - Click **Table Editor** in left sidebar
   - You should see these tables:
     - `units`
     - `lessons`
     - `reading_sections`
     - `videos`
     - `activities`
     - `quizzes`
     - `quiz_questions`
     - `essay_prompts`
     - `project_prompts`
     - `student_profiles`
     - `parent_profiles`
     - `student_progress`
     - `quiz_attempts`
     - `essay_submissions`
     - `project_submissions`

## Step 4: Configure Storage Buckets (5 minutes)

1. **Create Storage Buckets:**
   - Click **Storage** in left sidebar
   - Click **"Create a new bucket"**
   
   Create these three buckets:
   
   **Bucket 1: Essays**
   - Name: `essays`
   - Public: No (private)
   - Click "Create bucket"
   
   **Bucket 2: Projects**
   - Name: `projects`
   - Public: No (private)
   - Click "Create bucket"
   
   **Bucket 3: Avatars**
   - Name: `avatars`
   - Public: Yes (for profile pictures)
   - Click "Create bucket"

2. **Set Storage Policies:**
   For each bucket, click the bucket name → Policies → "New policy"
   
   **For essays and projects:**
   ```sql
   -- Allow authenticated users to upload
   CREATE POLICY "Authenticated users can upload"
   ON storage.objects FOR INSERT
   TO authenticated
   WITH CHECK (bucket_id = 'essays' OR bucket_id = 'projects');
   
   -- Allow users to read their own files
   CREATE POLICY "Users can read own files"
   ON storage.objects FOR SELECT
   TO authenticated
   USING (auth.uid() = owner);
   ```
   
   **For avatars:**
   ```sql
   -- Allow public read access
   CREATE POLICY "Public avatars are publicly accessible"
   ON storage.objects FOR SELECT
   TO public
   USING (bucket_id = 'avatars');
   
   -- Allow authenticated users to upload
   CREATE POLICY "Authenticated users can upload avatars"
   ON storage.objects FOR INSERT
   TO authenticated
   WITH CHECK (bucket_id = 'avatars');
   ```

## Step 5: Enable Row Level Security (Already Done!)

The SQL schema includes Row Level Security (RLS) policies automatically:

- **Students** can only view their own profiles and progress
- **Parents** can view profiles of their students
- **Content** (units, lessons, videos) is publicly readable
- **Submissions** (essays, projects) are only visible to student and parent

No additional configuration needed! ✅

## Step 6: Test Authentication (5 minutes)

1. **Start Development Server:**
   ```powershell
   npm run dev
   ```

2. **Create Test Student Account:**
   - Navigate to: http://localhost:3000/signup
   - Fill out the form:
     - Email: `timothy@example.com`
     - Password: `password123`
     - First Name: `Timothy`
     - Last Name: `Test`
     - Role: `Student`
     - Age: `15`
   - Click "Sign Up"
   - Should redirect to `/dashboard`

3. **Verify in Supabase:**
   - Go to Supabase dashboard
   - Click **Authentication** → **Users**
   - You should see Timothy's account listed
   - Click **Table Editor** → `student_profiles`
   - You should see Timothy's profile record

4. **Test Login:**
   - Sign out from dashboard
   - Navigate to: http://localhost:3000/login
   - Enter email: `timothy@example.com`
   - Enter password: `password123`
   - Click "Sign In"
   - Should redirect to `/dashboard`

5. **Create Test Parent Account:**
   - Sign out
   - Navigate to: http://localhost:3000/signup
   - Fill out the form:
     - Email: `parent@example.com`
     - Password: `password123`
     - First Name: `Jane`
     - Last Name: `Parent`
     - Role: `Parent`
   - Click "Sign Up"
   - Should redirect to `/dashboard`
   - Verify different dashboard content for parent role

## 📋 Verification Checklist

After completing all steps, verify:

- ✅ Supabase project created and active
- ✅ API credentials added to `.env.local`
- ✅ Database schema executed successfully
- ✅ All 16+ tables visible in Table Editor
- ✅ Storage buckets created (essays, projects, avatars)
- ✅ Storage policies configured
- ✅ Test student account created
- ✅ Test parent account created
- ✅ Login works correctly
- ✅ Dashboard displays personalized content
- ✅ Users visible in Authentication tab

## 🎉 Success!

Phase 2 is now complete! You have:

- ✅ Working authentication system (signup, login, logout)
- ✅ Role-based access control (student vs parent)
- ✅ Protected routes (dashboard requires login)
- ✅ Database schema with all required tables
- ✅ Storage buckets for file uploads
- ✅ Row Level Security policies
- ✅ Session management with automatic refresh

## Next Steps: Phase 3 - Core Content System

Once Supabase is configured, we'll move to Phase 3:

1. **Create Database Seeding Scripts** - Parse Units 4-6 from markdown to database
2. **Build Lesson Display Components** - Viewer for reading sections, videos, activities
3. **Create Unit Navigation Pages** - Browse units, view lesson details
4. **Test with Real Content** - Display Unit 4, Lesson 1 in application

Ready to continue? Just let me know once Supabase is set up!

---

## 🆘 Troubleshooting

**Issue: signup/Auth error: Database error saving new user**

**Solution:** Make sure the database schema was executed completely. Check that these tables exist:
- `student_profiles`
- `parent_profiles`

**Issue: "Invalid API key"**

**Solution:** 
1. Double-check `.env.local` has correct values from Supabase dashboard
2. Make sure there are no extra spaces or quotes around the values
3. Restart dev server after changing `.env.local`

**Issue: "Failed to fetch" errors**

**Solution:**
1. Verify Supabase project URL is correct (should end with `.supabase.co`)
2. Check project status in Supabase dashboard (should be "Active")
3. Try regenerating API keys if they were copied incorrectly

**Issue: SQL schema errors**

**Solution:**
1. Make sure you're running the SQL in the correct project
2. Check that no tables exist already (drop them if needed)
3. Run the schema in sections if getting timeout errors

---

**Need Help?** Check the Supabase documentation:
- https://supabase.com/docs/guides/auth
- https://supabase.com/docs/guides/database
- https://supabase.com/docs/guides/storage
