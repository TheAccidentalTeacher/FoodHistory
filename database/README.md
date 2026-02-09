# Database Schema

This directory contains the database schema and migration files for the Food Throughout History application.

## Files

### `init-schema.sql`

Complete PostgreSQL database schema for Supabase. This file creates:

- **24 tables** organized into 5 categories:
  - Content Tables (units, lessons, reading_sections, videos, activities)
  - Assessment Tables (quizzes, quiz_questions, essay_prompts, project_prompts)
  - User Tables (student_profiles, parent_profiles)
  - Progress Tracking (student_progress, quiz_attempts, essay_submissions, project_submissions, video_progress)
  - Geography Tables (geography_exercises, geography_attempts, geography_skill_tracking)
  - AI Tutor (ai_tutor_conversations)

- **Row Level Security (RLS) Policies**:
  - Students can only access their own data
  - Parents can view their students' data
  - Content is readable by all authenticated users

- **Indexes** for optimal query performance
- **Triggers** for automatic timestamp updates

## How to Use

### Step 1: Create Supabase Project

1. Go to https://supabase.com/dashboard
2. Create a new project
3. Wait for provisioning (~2 minutes)

### Step 2: Run Schema SQL

1. Open SQL Editor in Supabase dashboard
2. Click "New query"
3. Copy entire contents of `init-schema.sql`
4. Paste into editor
5. Click "Run" (or press Ctrl+Enter)
6. Wait for execution to complete

### Step 3: Verify

Check Table Editor - you should see all 24 tables created.

## Schema Overview

### Content Hierarchy

```
units (20 units)
  └── lessons (4 per unit = 80 total)
        ├── reading_sections (multiple per lesson)
        ├── videos (YouTube embeds)
        ├── activities (interactive exercises)
        └── quizzes (one per lesson)
              └── quiz_questions (10-15 per quiz)
```

### User Workflow

```
Student signs up
  → Creates student_profile
  → Views units and lessons
  → Tracks progress in student_progress
  → Takes quizzes → quiz_attempts
  → Submits essays → essay_submissions
  → Submits projects → project_submissions
  → Uses AI tutor → ai_tutor_conversations
  → Improves geography → geography_attempts
```

## Database Relationships

- **One-to-Many**: unit → lessons, lesson → videos, quiz → quiz_questions
- **Many-to-One**: student_progress → student_profile, quiz_attempts → student_profile
- **Foreign Keys**: All relationships enforced with CASCADE deletes where appropriate

## Security

All user-related tables have **Row Level Security** enabled:

- Students can only view/modify their own records
- Parents can view records of their linked students
- Content tables are read-only for authenticated users
- Service role key bypasses RLS (use carefully!)

## Next Steps

After initializing the schema:

1. Configure Storage buckets (essays, projects, avatars)
2. Test authentication flow (signup → login → dashboard)
3. Seed initial content (Units 1-3 for testing)
4. Deploy to Vercel with environment variables

## Troubleshooting

**Error: "relation already exists"**
- Tables already created. Either drop existing tables or use a fresh project.

**Error: "permission denied"**
- Make sure you're running SQL as the project owner (service role).

**Error: "extension does not exist"**
- Run `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";` first.

## Maintenance

To reset the database completely:

```sql
-- WARNING: This deletes ALL data!
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;

-- Then run init-schema.sql again
```

## Schema Version

**Version:** 1.0.0  
**Last Updated:** January 2025  
**Compatible With:** Supabase PostgreSQL 15+
