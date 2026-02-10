-- =====================================================
-- MANUAL STUDENT-PARENT LINKING SQL
-- =====================================================
-- Use this to link existing student accounts to parent accounts
-- Run this in Supabase SQL Editor after replacing the UUIDs
-- =====================================================

-- STEP 1: Find your parent user ID (you already know yours: 9d09d825-c23f-4f7d-b986-04da68025fe)
-- But if you need to find it again:
SELECT id, email, raw_user_meta_data->>'first_name' as first_name 
FROM auth.users 
WHERE email = 'test@test.com';  -- Replace with your parent email

-- STEP 2: Find the student user ID you want to link
SELECT id, email, raw_user_meta_data->>'first_name' as first_name 
FROM auth.users 
WHERE email = 'student@example.com';  -- Replace with student email

-- STEP 3: Link the student to the parent
-- Replace STUDENT_UUID and PARENT_UUID with actual IDs
UPDATE student_profiles 
SET parent_id = 'PARENT_UUID'  -- e.g., '9d09d825-c23f-4f7d-b986-04da68025fe'
WHERE id = 'STUDENT_UUID';     -- The student's user ID

-- EXAMPLE: Link student to your test account
-- UPDATE student_profiles 
-- SET parent_id = '9d09d825-c23f-4f7d-b986-04da68025fe'
-- WHERE email = 'timothy@example.com';

-- STEP 4: Verify the link
SELECT 
  sp.id as student_id,
  sp.email as student_email,
  sp.full_name as student_name,
  sp.parent_id,
  pp.email as parent_email,
  pp.full_name as parent_name
FROM student_profiles sp
LEFT JOIN parent_profiles pp ON sp.parent_id = pp.id
WHERE sp.parent_id = 'PARENT_UUID';  -- Your parent UUID

-- =====================================================
-- QUICK LINK (for your test account)
-- =====================================================
-- After Timothy signs up, run this with his user ID:
-- UPDATE student_profiles 
-- SET parent_id = '9d09d825-c23f-4f7d-b986-04da68025fe'
-- WHERE id = 'TIMOTHY_USER_ID_HERE';

-- =====================================================
-- VIEW ALL STUDENTS LINKED TO YOUR ACCOUNT
-- =====================================================
SELECT 
  sp.id,
  sp.email,
  sp.full_name,
  sp.age,
  sp.geography_skill_level,
  sp.created_at,
  COUNT(DISTINCT spr.lesson_id) as lessons_completed
FROM student_profiles sp
LEFT JOIN student_progress spr ON sp.id = spr.student_id AND spr.status = 'completed'
WHERE sp.parent_id = '9d09d825-c23f-4f7d-b986-04da68025fe'  -- Your parent UUID
GROUP BY sp.id, sp.email, sp.full_name, sp.age, sp.geography_skill_level, sp.created_at
ORDER BY sp.created_at DESC;

-- =====================================================
-- UNLINK A STUDENT (if needed)
-- =====================================================
-- UPDATE student_profiles 
-- SET parent_id = NULL
-- WHERE id = 'STUDENT_UUID';
