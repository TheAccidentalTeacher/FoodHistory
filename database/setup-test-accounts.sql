-- =====================================================
-- TEST ACCOUNTS SETUP
-- Run this in Supabase SQL Editor
-- =====================================================

-- STEP 1: Verify parent account exists
SELECT id, email, raw_user_meta_data 
FROM auth.users 
WHERE email = 'test@test.com';
-- Expected: 9d09d825-c23f-4f7d-b986-04da68025fe

-- STEP 2: Create student auth user AND profile in one transaction
DO $$
DECLARE
  new_student_id uuid;
  parent_user_id uuid;
BEGIN
  -- Get parent user ID
  SELECT id INTO parent_user_id 
  FROM auth.users 
  WHERE email = 'test@test.com';
  
  IF parent_user_id IS NULL THEN
    RAISE EXCEPTION 'Parent account test@test.com not found';
  END IF;

  -- Create auth user
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'kidtest@test.com',
    crypt('testpassword123', gen_salt('bf')),  -- Password: testpassword123
    now(),
    '{"full_name": "Timothy Test", "role": "student"}'::jsonb,
    now(),
    now(),
    '',
    '',
    '',
    ''
  )
  RETURNING id INTO new_student_id;

  -- Create student profile linked to parent
  INSERT INTO student_profiles (
    id,
    email,
    full_name,
    age,
    geography_skill_level,
    parent_id
  ) VALUES (
    new_student_id,
    'kidtest@test.com',
    'Timothy Test',
    15,
    2,
    parent_user_id
  );

  RAISE NOTICE 'Student created with ID: %, linked to parent: %', new_student_id, parent_user_id;
END $$;

-- STEP 3: Verify the setup
SELECT 
  sp.id as student_id,
  sp.email as student_email,
  sp.full_name as student_name,
  sp.age,
  pp.email as parent_email,
  pp.full_name as parent_name
FROM student_profiles sp
JOIN parent_profiles pp ON sp.parent_id = pp.id
WHERE sp.email = 'kidtest@test.com';


-- =====================================================
-- EASIER METHOD: Use Supabase Dashboard UI
-- =====================================================
-- 1. Go to Authentication → Users → Add User
--    - Email: kidtest@test.com
--    - Password: testpassword123
--    - Auto Confirm User: YES
--    - Copy the generated UUID
--
-- 2. Go to Table Editor → student_profiles → Insert Row
--    - id: [paste UUID from step 1]
--    - email: kidtest@test.com
--    - full_name: Timothy Test
--    - age: 15
--    - geography_skill_level: 2
--    - parent_id: 9d09d825-c23f-4f7d-b986-04da68025fe
--    - created_at: now()
--    - updated_at: now()
--
-- 3. Done! Student is linked to parent.
