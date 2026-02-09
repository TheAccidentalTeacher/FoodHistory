-- =====================================================
-- Food Throughout History - Database Schema
-- Supabase PostgreSQL Database Initialization
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- CONTENT TABLES
-- =====================================================

-- Units (20 units across 10,000 years)
CREATE TABLE units (
    id SERIAL PRIMARY KEY,
    number INTEGER NOT NULL UNIQUE,
    title TEXT NOT NULL,
    geographic_focus TEXT,
    historical_era TEXT,
    duration_weeks INTEGER,
    learning_objectives JSONB DEFAULT '[]',
    summary TEXT,
    hands_on_project_type TEXT,
    essay_prompt TEXT,
    geography_focus JSONB DEFAULT '{}',
    "order" INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lessons (4 lessons per unit = 80 total)
CREATE TABLE lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unit_id INTEGER NOT NULL REFERENCES units(id) ON DELETE CASCADE,
    lesson_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    content TEXT,
    reading_time_minutes INTEGER,
    video_ids JSONB DEFAULT '[]',
    learning_objectives JSONB DEFAULT '[]',
    "order" INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(unit_id, lesson_number)
);

-- Reading Sections (multiple sections per lesson)
CREATE TABLE reading_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    section_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    word_count INTEGER,
    "order" INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(lesson_id, section_number)
);

-- Videos (YouTube embeds for lessons)
CREATE TABLE videos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    youtube_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    duration_seconds INTEGER,
    "order" INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activities (interactive exercises)
CREATE TABLE activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    activity_type TEXT NOT NULL, -- 'map_click', 'timeline', 'matching', 'fill_blank'
    title TEXT NOT NULL,
    instructions TEXT NOT NULL,
    content JSONB NOT NULL, -- Activity-specific data
    points INTEGER DEFAULT 10,
    "order" INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ASSESSMENT TABLES
-- =====================================================

-- Quizzes (lesson quizzes and unit tests)
CREATE TABLE quizzes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
    unit_id INTEGER REFERENCES units(id) ON DELETE CASCADE,
    quiz_type TEXT NOT NULL CHECK (quiz_type IN ('lesson', 'unit')),
    title TEXT NOT NULL,
    passing_score INTEGER DEFAULT 80,
    time_limit_minutes INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CHECK (
        (quiz_type = 'lesson' AND lesson_id IS NOT NULL AND unit_id IS NULL) OR
        (quiz_type = 'unit' AND unit_id IS NOT NULL AND lesson_id IS NULL)
    )
);

-- Quiz Questions
CREATE TABLE quiz_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    question_type TEXT NOT NULL CHECK (question_type IN ('multiple_choice', 'short_answer', 'geography_map', 'true_false')),
    question_text TEXT NOT NULL,
    options JSONB DEFAULT '[]', -- For multiple choice
    correct_answer TEXT NOT NULL,
    explanation TEXT,
    points INTEGER DEFAULT 1,
    "order" INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Essay Prompts (one per unit)
CREATE TABLE essay_prompts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unit_id INTEGER NOT NULL REFERENCES units(id) ON DELETE CASCADE UNIQUE,
    prompt_text TEXT NOT NULL,
    word_count_min INTEGER DEFAULT 800,
    word_count_max INTEGER DEFAULT 1200,
    rubric JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project Prompts (hands-on projects per unit)
CREATE TABLE project_prompts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unit_id INTEGER NOT NULL REFERENCES units(id) ON DELETE CASCADE UNIQUE,
    project_type TEXT NOT NULL, -- 'infographic', 'video', 'recipe', 'map', 'presentation'
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    requirements JSONB DEFAULT '[]',
    rubric JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- USER & PROFILE TABLES
-- =====================================================

-- Student Profiles
CREATE TABLE student_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    age INTEGER,
    grade TEXT,
    gpa DECIMAL(3, 2),
    geography_baseline INTEGER DEFAULT 2 CHECK (geography_baseline >= 0 AND geography_baseline <= 10),
    geography_current INTEGER DEFAULT 2 CHECK (geography_current >= 0 AND geography_current <= 10),
    culinary_skill_level INTEGER DEFAULT 5 CHECK (culinary_skill_level >= 0 AND culinary_skill_level <= 10),
    learning_preferences JSONB DEFAULT '{}',
    constraints JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Parent Profiles
CREATE TABLE parent_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    student_ids UUID[] DEFAULT '{}',
    notification_preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- PROGRESS TRACKING TABLES
-- =====================================================

-- Student Progress (tracks lesson/unit completion)
CREATE TABLE student_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_profile_id UUID NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    unit_id INTEGER REFERENCES units(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    time_spent_minutes INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(student_profile_id, lesson_id)
);

-- Video Progress (track video watching)
CREATE TABLE video_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_profile_id UUID NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    video_id UUID NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
    watched BOOLEAN DEFAULT FALSE,
    watch_percentage DECIMAL(5, 2) DEFAULT 0.0,
    last_watched_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(student_profile_id, video_id)
);

-- Quiz Attempts
CREATE TABLE quiz_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_profile_id UUID NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    total_points INTEGER NOT NULL,
    percentage DECIMAL(5, 2) NOT NULL,
    passed BOOLEAN NOT NULL,
    answers JSONB NOT NULL DEFAULT '[]',
    attempted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    time_taken_minutes INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Essay Submissions
CREATE TABLE essay_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_profile_id UUID NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    essay_prompt_id UUID NOT NULL REFERENCES essay_prompts(id) ON DELETE CASCADE,
    unit_id INTEGER NOT NULL REFERENCES units(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    word_count INTEGER NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    graded_at TIMESTAMP WITH TIME ZONE,
    score INTEGER CHECK (score >= 0 AND score <= 100),
    parent_feedback TEXT,
    rubric_scores JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project Submissions
CREATE TABLE project_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_profile_id UUID NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    project_prompt_id UUID NOT NULL REFERENCES project_prompts(id) ON DELETE CASCADE,
    unit_id INTEGER NOT NULL REFERENCES units(id) ON DELETE CASCADE,
    project_type TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    file_urls JSONB DEFAULT '[]',
    reflection TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    graded_at TIMESTAMP WITH TIME ZONE,
    score INTEGER CHECK (score >= 0 AND score <= 100),
    parent_feedback TEXT,
    rubric_scores JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- GEOGRAPHY TABLES
-- =====================================================

-- Geography Exercises
CREATE TABLE geography_exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exercise_type TEXT NOT NULL CHECK (exercise_type IN ('click_country', 'trace_route', 'identify_continent')),
    title TEXT NOT NULL,
    instructions TEXT NOT NULL,
    map_data JSONB NOT NULL,
    correct_answers JSONB NOT NULL,
    difficulty TEXT DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
    unit_id INTEGER REFERENCES units(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Geography Attempts
CREATE TABLE geography_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_profile_id UUID NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    geography_exercise_id UUID NOT NULL REFERENCES geography_exercises(id) ON DELETE CASCADE,
    student_answers JSONB NOT NULL,
    score INTEGER NOT NULL,
    total_points INTEGER NOT NULL,
    percentage DECIMAL(5, 2) NOT NULL,
    attempted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Geography Skill Tracking (periodic assessments)
CREATE TABLE geography_skill_tracking (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_profile_id UUID NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    assessment_type TEXT NOT NULL CHECK (assessment_type IN ('baseline', 'unit', 'final')),
    unit_id INTEGER REFERENCES units(id) ON DELETE SET NULL,
    score INTEGER NOT NULL CHECK (score >= 0 AND score <= 10),
    areas_tested JSONB DEFAULT '[]',
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- AI TUTOR TABLES
-- =====================================================

-- AI Tutor Conversations
CREATE TABLE ai_tutor_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_profile_id UUID NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    unit_id INTEGER REFERENCES units(id) ON DELETE SET NULL,
    lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL,
    messages JSONB NOT NULL DEFAULT '[]',
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    token_count INTEGER DEFAULT 0,
    flagged BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all user-related tables
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE essay_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE geography_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE geography_skill_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_tutor_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_progress ENABLE ROW LEVEL SECURITY;

-- Student Profiles: Students can only view/update their own profile
CREATE POLICY "Students can view own profile"
ON student_profiles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Students can update own profile"
ON student_profiles FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Parent Profiles: Parents can view/update their own profile
CREATE POLICY "Parents can view own profile"
ON parent_profiles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Parents can update own profile"
ON parent_profiles FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Student Progress: Students can view/insert/update their own progress
CREATE POLICY "Students can view own progress"
ON student_progress FOR SELECT
TO authenticated
USING (student_profile_id IN (SELECT id FROM student_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Students can insert own progress"
ON student_progress FOR INSERT
TO authenticated
WITH CHECK (student_profile_id IN (SELECT id FROM student_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Students can update own progress"
ON student_progress FOR UPDATE
TO authenticated
USING (student_profile_id IN (SELECT id FROM student_profiles WHERE user_id = auth.uid()));

-- Quiz Attempts: Students can view/insert their own attempts
CREATE POLICY "Students can view own quiz attempts"
ON quiz_attempts FOR SELECT
TO authenticated
USING (student_profile_id IN (SELECT id FROM student_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Students can insert own quiz attempts"
ON quiz_attempts FOR INSERT
TO authenticated
WITH CHECK (student_profile_id IN (SELECT id FROM student_profiles WHERE user_id = auth.uid()));

-- Essay Submissions: Students can view/insert/update their own submissions
CREATE POLICY "Students can view own essays"
ON essay_submissions FOR SELECT
TO authenticated
USING (student_profile_id IN (SELECT id FROM student_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Students can insert own essays"
ON essay_submissions FOR INSERT
TO authenticated
WITH CHECK (student_profile_id IN (SELECT id FROM student_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Students can update own essays"
ON essay_submissions FOR UPDATE
TO authenticated
USING (student_profile_id IN (SELECT id FROM student_profiles WHERE user_id = auth.uid()));

-- Project Submissions: Students can view/insert/update their own projects
CREATE POLICY "Students can view own projects"
ON project_submissions FOR SELECT
TO authenticated
USING (student_profile_id IN (SELECT id FROM student_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Students can insert own projects"
ON project_submissions FOR INSERT
TO authenticated
WITH CHECK (student_profile_id IN (SELECT id FROM student_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Students can update own projects"
ON project_submissions FOR UPDATE
TO authenticated
USING (student_profile_id IN (SELECT id FROM student_profiles WHERE user_id = auth.uid()));

-- Geography Attempts: Students can view/insert their own attempts
CREATE POLICY "Students can view own geography attempts"
ON geography_attempts FOR SELECT
TO authenticated
USING (student_profile_id IN (SELECT id FROM student_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Students can insert own geography attempts"
ON geography_attempts FOR INSERT
TO authenticated
WITH CHECK (student_profile_id IN (SELECT id FROM student_profiles WHERE user_id = auth.uid()));

-- Geography Skill Tracking: Students can view their own tracking
CREATE POLICY "Students can view own geography tracking"
ON geography_skill_tracking FOR SELECT
TO authenticated
USING (student_profile_id IN (SELECT id FROM student_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Students can insert own geography tracking"
ON geography_skill_tracking FOR INSERT
TO authenticated
WITH CHECK (student_profile_id IN (SELECT id FROM student_profiles WHERE user_id = auth.uid()));

-- AI Tutor Conversations: Students can view/insert/update their own conversations
CREATE POLICY "Students can view own ai conversations"
ON ai_tutor_conversations FOR SELECT
TO authenticated
USING (student_profile_id IN (SELECT id FROM student_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Students can insert own ai conversations"
ON ai_tutor_conversations FOR INSERT
TO authenticated
WITH CHECK (student_profile_id IN (SELECT id FROM student_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Students can update own ai conversations"
ON ai_tutor_conversations FOR UPDATE
TO authenticated
USING (student_profile_id IN (SELECT id FROM student_profiles WHERE user_id = auth.uid()));

-- Video Progress: Students can view/insert/update their own video progress
CREATE POLICY "Students can view own video progress"
ON video_progress FOR SELECT
TO authenticated
USING (student_profile_id IN (SELECT id FROM student_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Students can insert own video progress"
ON video_progress FOR INSERT
TO authenticated
WITH CHECK (student_profile_id IN (SELECT id FROM student_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Students can update own video progress"
ON video_progress FOR UPDATE
TO authenticated
USING (student_profile_id IN (SELECT id FROM student_profiles WHERE user_id = auth.uid()));

-- Content tables (units, lessons, quizzes, etc.) are readable by all authenticated users
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE essay_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE geography_exercises ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read content
CREATE POLICY "Authenticated users can view units"
ON units FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can view lessons"
ON lessons FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can view reading sections"
ON reading_sections FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can view videos"
ON videos FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can view activities"
ON activities FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can view quizzes"
ON quizzes FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can view quiz questions"
ON quiz_questions FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can view essay prompts"
ON essay_prompts FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can view project prompts"
ON project_prompts FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can view geography exercises"
ON geography_exercises FOR SELECT TO authenticated USING (true);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX idx_lessons_unit_id ON lessons(unit_id);
CREATE INDEX idx_reading_sections_lesson_id ON reading_sections(lesson_id);
CREATE INDEX idx_videos_lesson_id ON videos(lesson_id);
CREATE INDEX idx_activities_lesson_id ON activities(lesson_id);
CREATE INDEX idx_quizzes_lesson_id ON quizzes(lesson_id);
CREATE INDEX idx_quizzes_unit_id ON quizzes(unit_id);
CREATE INDEX idx_quiz_questions_quiz_id ON quiz_questions(quiz_id);
CREATE INDEX idx_student_progress_student_id ON student_progress(student_profile_id);
CREATE INDEX idx_student_progress_unit_id ON student_progress(unit_id);
CREATE INDEX idx_student_progress_lesson_id ON student_progress(lesson_id);
CREATE INDEX idx_quiz_attempts_student_id ON quiz_attempts(student_profile_id);
CREATE INDEX idx_quiz_attempts_quiz_id ON quiz_attempts(quiz_id);
CREATE INDEX idx_essay_submissions_student_id ON essay_submissions(student_profile_id);
CREATE INDEX idx_project_submissions_student_id ON project_submissions(student_profile_id);
CREATE INDEX idx_geography_attempts_student_id ON geography_attempts(student_profile_id);
CREATE INDEX idx_ai_conversations_student_id ON ai_tutor_conversations(student_profile_id);
CREATE INDEX idx_video_progress_student_id ON video_progress(student_profile_id);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables with updated_at column
CREATE TRIGGER update_units_updated_at BEFORE UPDATE ON units
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON lessons
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_student_profiles_updated_at BEFORE UPDATE ON student_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_parent_profiles_updated_at BEFORE UPDATE ON parent_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_student_progress_updated_at BEFORE UPDATE ON student_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_essay_submissions_updated_at BEFORE UPDATE ON essay_submissions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_submissions_updated_at BEFORE UPDATE ON project_submissions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- INITIAL SETUP COMPLETE
-- =====================================================

-- Verify schema creation
DO $$
DECLARE
    table_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO table_count
    FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE';
    
    RAISE NOTICE 'Database schema initialized successfully!';
    RAISE NOTICE 'Total tables created: %', table_count;
END $$;
