-- =====================================================
-- SIMPLE: Link existing student to parent
-- =====================================================

-- Check what student profiles exist
SELECT * FROM student_profiles;

-- Find the student's UUID
SELECT id, email FROM auth.users WHERE email = 'kidtest@test.com';

-- Link existing student profile to parent
UPDATE student_profiles 
SET parent_id = (SELECT id FROM auth.users WHERE email = 'test@test.com')
WHERE id = '68895e30-6a3a-4b89-8aff-9e69d45d951e';

-- Verify it worked
SELECT 
  sp.email as student,
  pp.email as parent
FROM student_profiles sp
JOIN parent_profiles pp ON sp.parent_id = pp.id
WHERE sp.email = 'kidtest@test.com';
