# 🚀 FOOD HISTORY APP - COMPLETE IMPLEMENTATION ROADMAP

**Project:** Food Throughout History - Personalized Learning Platform  
**Student:** Timothy (15, aspiring Michelin-star chef)  
**Repository:** https://github.com/TheAccidentalTeacher/FoodHistory  
**Deployment:** Vercel  
**Date Created:** February 9, 2026

---

## 📋 Table of Contents

1. [Overview & Timeline](#overview--timeline)
2. [Phase 0: Pre-Development Setup](#phase-0-pre-development-setup)
3. [Phase 1: Project Foundation](#phase-1-project-foundation)
4. [Phase 2: Database & Authentication](#phase-2-database--authentication)
5. [Phase 3: Core Content System](#phase-3-core-content-system)
6. [Phase 4: Student Learning Experience](#phase-4-student-learning-experience)
7. [Phase 5: Geography & Maps (Leaflet)](#phase-5-geography--maps-leaflet)
8. [Phase 6: AI Tutor Integration](#phase-6-ai-tutor-integration)
9. [Phase 7: Assessments & Progress Tracking](#phase-7-assessments--progress-tracking)
10. [Phase 8: Parent Dashboard & Grading](#phase-8-parent-dashboard--grading)
11. [Phase 9: Polish & Testing](#phase-9-polish--testing)
12. [Phase 10: Deployment & Launch](#phase-10-deployment--launch)
13. [Ongoing: Content Population](#ongoing-content-population)

---

## 🎯 Overview & Timeline

### Project Goals

**Primary:** Build a production-ready web application where Timothy can learn 10,000 years of food history across 20 comprehensive units.

**Secondary:** Demonstrate AI-powered personalized curriculum generation for investor presentation.

### Quality Standards

- ✅ Professional quality ("not AI slop")
- ✅ TypeScript strict mode (type-safe codebase)
- ✅ Mobile-responsive (works on phone, tablet, desktop)
- ✅ Accessible (WCAG 2.1 AA compliance)
- ✅ Fast performance (<3s initial load, <1s navigation)
- ✅ Secure (Row Level Security, input validation, XSS prevention)

### Timeline Estimates

| Phase | Description | Estimated Time | Cumulative |
|-------|-------------|----------------|------------|
| **Phase 0** | Pre-Development Setup | 1 hour | 1 hour |
| **Phase 1** | Project Foundation | 3-4 hours | 5 hours |
| **Phase 2** | Database & Authentication | 4-5 hours | 10 hours |
| **Phase 3** | Core Content System | 5-6 hours | 16 hours |
| **Phase 4** | Student Learning Experience | 8-10 hours | 26 hours |
| **Phase 5** | Geography & Maps | 6-8 hours | 34 hours |
| **Phase 6** | AI Tutor Integration | 4-5 hours | 39 hours |
| **Phase 7** | Assessments & Progress | 6-8 hours | 47 hours |
| **Phase 8** | Parent Dashboard | 5-6 hours | 53 hours |
| **Phase 9** | Polish & Testing | 6-8 hours | 61 hours |
| **Phase 10** | Deployment & Launch | 2-3 hours | 64 hours |
| **Ongoing** | Content Population | 40+ hours | — |

**Total Development Time:** ~60-65 hours (approximately 1.5-2 weeks full-time)

**Content Specification Time:** Units 7-20 (13 units remaining × ~8 hours each = ~104 hours additional content work, can happen in parallel)

---

## Phase 0: Pre-Development Setup

**Goal:** Prepare development environment, accounts, and repository structure.

**Estimated Time:** 1 hour

### Step 0.1: GitHub Repository Setup ✅ COMPLETE

**Status:** Repository already created at https://github.com/TheAccidentalTeacher/FoodHistory

**Next Actions:**
1. Clone repository locally
2. Set up branch protection rules (main branch)
3. Configure repository settings

```bash
# Clone the repository
cd c:\Users\scoso\WEBSITES
git clone https://github.com/TheAccidentalTeacher/FoodHistory.git
cd FoodHistory

# Verify remote
git remote -v
```

**Repository Settings to Configure:**
- ✅ Branch protection: Require pull request reviews before merging (optional for solo dev)
- ✅ Enable issue tracking
- ✅ Add repository description and topics
- ✅ Add README.md, .gitignore, LICENSE

### Step 0.2: Create Required Accounts

**Accounts Needed:**

1. **Supabase Account** (Database, Auth, Storage)
   - URL: https://supabase.com
   - Plan: Free tier (sufficient for development)
   - Action: Create account, create new project "food-history-app"

2. **Vercel Account** (Hosting & Deployment)
   - URL: https://vercel.com
   - Plan: Hobby (free for personal projects)
   - Action: Sign up with GitHub account for easy integration

3. **OpenAI Account** (AI Tutor - GPT-5.2)
   - URL: https://platform.openai.com
   - Plan: Pay-as-you-go
   - Action: Create account, add payment method, generate API key

4. **Anthropic Account** (AI Tutor Alternative - Claude Opus 4.6)
   - URL: https://console.anthropic.com
   - Plan: Pay-as-you-go (optional, alternative to OpenAI)
   - Action: Create account, generate API key

5. **YouTube Data API v3** (Video Integration)
   - URL: https://console.cloud.google.com
   - Action: Create Google Cloud project, enable YouTube Data API v3, generate API key

### Step 0.3: Local Development Environment

**Required Software:**

```bash
# Verify Node.js version (18.17+ or 20+ required)
node --version  # Should be v18.17+ or v20+

# If not installed, download from https://nodejs.org/

# Verify Git
git --version

# Install VS Code extensions (recommended)
# - ESLint
# - Prettier
# - Tailwind CSS IntelliSense
# - Prisma (if using Prisma ORM)
```

**VS Code Extensions to Install:**
- ESLint (code linting)
- Prettier (code formatting)
- Tailwind CSS IntelliSense (Tailwind autocomplete)
- GitLens (Git history visualization)
- Error Lens (inline error display)

### Step 0.4: Organize Project Documentation

**Action:** Move current specification files into repository

```bash
# Copy specification files to repository
cd c:\Users\scoso\WEBSITES\FoodHistory

# Copy documentation
cp "../Food HIstory/README.md" ./README.md
cp "../Food HIstory/BRAINSTORM-COMPLETE.md" ./docs/BRAINSTORM-COMPLETE.md
cp "../Food HIstory/TECHNICAL-IMPLEMENTATION-SPEC.md" ./docs/TECHNICAL-IMPLEMENTATION-SPEC.md
cp "../Food HIstory/UNIT-4-COMPLETE-SPECIFICATION.md" ./content/UNIT-4-COMPLETE-SPECIFICATION.md
cp "../Food HIstory/UNIT-5-COMPLETE-SPECIFICATION.md" ./content/UNIT-5-COMPLETE-SPECIFICATION.md
cp "../Food HIstory/UNIT-6-COMPLETE-SPECIFICATION.md" ./content/UNIT-6-COMPLETE-SPECIFICATION.md

# Create directory structure
mkdir -p docs content database scripts

# Commit initial documentation
git add .
git commit -m "docs: Add initial project specifications and unit content"
git push origin main
```

**Deliverables:**
- ✅ GitHub repository cloned locally
- ✅ All accounts created (Supabase, Vercel, OpenAI, YouTube API)
- ✅ Development environment ready (Node.js, Git, VS Code)
- ✅ Documentation organized in repository

---

## Phase 1: Project Foundation

**Goal:** Initialize Next.js project, configure TypeScript, Tailwind CSS, and install core dependencies.

**Estimated Time:** 3-4 hours

### Step 1.1: Create Next.js Application

```bash
# Navigate to repository root
cd c:\Users\scoso\WEBSITES\FoodHistory

# Create Next.js app (use App Router, TypeScript, Tailwind)
npx create-next-app@latest . --typescript --tailwind --app --use-npm

# Answer prompts:
# ✓ Would you like to use ESLint? Yes
# ✓ Would you like to use Turbopack for next dev? No
# ✓ Would you like to customize the import alias? No
```

**What This Creates:**
- `src/app/` - App Router directory
- `src/components/` - React components
- `tailwind.config.ts` - Tailwind configuration
- `tsconfig.json` - TypeScript configuration
- `next.config.js` - Next.js configuration
- `package.json` - Dependencies

### Step 1.2: Install Core Dependencies

```bash
# Supabase client libraries
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs @supabase/ssr

# Leaflet for maps
npm install leaflet react-leaflet
npm install -D @types/leaflet

# AI SDKs
npm install openai anthropic

# Form handling & validation
npm install react-hook-form zod @hookform/resolvers

# UI/UX libraries
npm install framer-motion recharts lucide-react clsx tailwind-merge

# Date handling
npm install date-fns

# Markdown rendering (for lesson content)
npm install react-markdown remark-gfm rehype-raw
```

### Step 1.3: Install shadcn/ui Components

```bash
# Initialize shadcn/ui
npx shadcn-ui@latest init

# Answer prompts:
# ✓ Which style would you like to use? Default
# ✓ Which color would you like to use as base color? Slate
# ✓ Would you like to use CSS variables for colors? Yes

# Install commonly used components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add select
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add progress
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add tooltip
npx shadcn-ui@latest add accordion
```

### Step 1.4: Configure Environment Variables

Create `.env.local` file in project root:

```bash
# Create environment file
touch .env.local
```

**Add to `.env.local`:** (values to be filled in Phase 2)

```env
# Supabase Configuration (from Supabase Dashboard > Settings > API)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# AI Services (choose one or both)
OPENAI_API_KEY=sk-your-openai-key-here
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key-here

# YouTube Data API
YOUTUBE_API_KEY=your-youtube-api-key-here

# Application Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

**Create `.env.example`** (template for other developers):

```env
# Copy this to .env.local and fill in your actual values

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

OPENAI_API_KEY=
ANTHROPIC_API_KEY=

YOUTUBE_API_KEY=

NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### Step 1.5: Configure TypeScript

**Update `tsconfig.json`** to include strict mode and path aliases:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Step 1.6: Configure Tailwind CSS

**Update `tailwind.config.ts`:**

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
```

**Add Leaflet CSS import to `src/app/layout.tsx`:**

```typescript
import 'leaflet/dist/leaflet.css'
import './globals.css'
```

### Step 1.7: Create Initial Directory Structure

```bash
# Create organized directory structure
mkdir -p src/app/(auth)
mkdir -p src/app/(student)
mkdir -p src/app/(parent)
mkdir -p src/components/ui
mkdir -p src/components/layouts
mkdir -p src/components/lessons
mkdir -p src/components/quizzes
mkdir -p src/components/maps
mkdir -p src/components/tutor
mkdir -p src/components/progress
mkdir -p src/lib/supabase
mkdir -p src/lib/ai
mkdir -p src/lib/youtube
mkdir -p src/lib/utils
mkdir -p src/hooks
mkdir -p src/types
mkdir -p public/images
mkdir -p public/maps
```

### Step 1.8: Configure Next.js

**Update `next.config.js`:**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com', // YouTube thumbnails
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co', // Supabase storage
      },
    ],
  },
  webpack: (config) => {
    // Fix for Leaflet in Next.js
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    })
    return config
  },
}

module.exports = nextConfig
```

### Step 1.9: Create `.gitignore`

```bash
# Create .gitignore file
touch .gitignore
```

**Add to `.gitignore`:**

```
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local
.env

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# IDE
.vscode/
.idea/
```

### Step 1.10: Test Initial Setup

```bash
# Start development server
npm run dev

# Open browser to http://localhost:3000
# Should see Next.js welcome page
```

### Step 1.11: Commit Foundation

```bash
git add .
git commit -m "feat: Initialize Next.js project with TypeScript, Tailwind, and dependencies"
git push origin main
```

**Deliverables:**
- ✅ Next.js 14 app with App Router initialized
- ✅ TypeScript configured with strict mode
- ✅ Tailwind CSS with shadcn/ui components installed
- ✅ All dependencies installed (Supabase, Leaflet, AI SDKs, form libraries)
- ✅ Environment variables template created
- ✅ Project directory structure organized
- ✅ Next.js configuration optimized
- ✅ `.gitignore` configured
- ✅ Initial commit pushed to GitHub

**Next:** Phase 2 - Database & Authentication Setup

---

## Phase 2: Database & Authentication

**Goal:** Set up Supabase project, create database schema, implement authentication system with student and parent roles.

**Estimated Time:** 4-5 hours

### Step 2.1: Create Supabase Project

1. **Go to Supabase Dashboard:** https://supabase.com/dashboard
2. **Create New Project:**
   - Organization: Your organization
   - Project name: `food-history-app`
   - Database password: Generate strong password (save securely!)
   - Region: Choose closest to user (e.g., US West)
   - Plan: Free tier

3. **Wait for project creation** (~2 minutes)

### Step 2.2: Get Supabase Credentials

**Navigate to:** Project Settings > API

**Copy these values to `.env.local`:**

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 2.3: Create Database Schema

**Navigate to:** SQL Editor in Supabase Dashboard

**Run this SQL** (adapted from BRAINSTORM-COMPLETE.md Section 4.2):

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS & PROFILES
-- ============================================

-- Create custom roles enum
CREATE TYPE user_role AS ENUM ('student', 'parent');

-- Student profiles (extended from auth.users)
CREATE TABLE student_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  age INTEGER NOT NULL CHECK (age >= 10 AND age <= 25),
  grade TEXT,
  geography_baseline INTEGER DEFAULT 2 CHECK (geography_baseline >= 1 AND geography_baseline <= 10),
  geography_current INTEGER DEFAULT 2 CHECK (geography_current >= 1 AND geography_current <= 10),
  culinary_skill_level INTEGER DEFAULT 5 CHECK (culinary_skill_level >= 1 AND culinary_skill_level <= 10),
  learning_preferences JSONB DEFAULT '{}',
  constraints JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Parent profiles
CREATE TABLE parent_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  student_ids UUID[] DEFAULT '{}',
  notification_preferences JSONB DEFAULT '{"email": true, "weekly_report": true}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CONTENT STRUCTURE
-- ============================================

-- Units (20 total)
CREATE TABLE units (
  id INTEGER PRIMARY KEY,
  number INTEGER UNIQUE NOT NULL CHECK (number >= 1 AND number <= 20),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  geographic_focus TEXT[],
  historical_era TEXT NOT NULL,
  duration_hours INTEGER DEFAULT 10,
  learning_objectives JSONB NOT NULL,
  unlock_requirements JSONB DEFAULT '{"previous_unit_score": 80}',
  order_index INTEGER UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lessons (4-5 per unit = ~80-100 total)
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  unit_id INTEGER REFERENCES units(id) ON DELETE CASCADE NOT NULL,
  lesson_number INTEGER NOT NULL CHECK (lesson_number >= 1 AND lesson_number <= 5),
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  summary TEXT NOT NULL,
  reading_time_minutes INTEGER DEFAULT 20,
  learning_objectives JSONB NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(unit_id, lesson_number),
  UNIQUE(unit_id, slug)
);

-- Reading sections (5 per lesson × 80 lessons = ~400 sections)
CREATE TABLE reading_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
  section_number INTEGER NOT NULL CHECK (section_number >= 1 AND section_number <= 5),
  title TEXT NOT NULL,
  content TEXT NOT NULL, -- Full prose content (800-1200 words)
  word_count INTEGER NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(lesson_id, section_number)
);

-- Videos (3 per lesson × 80 lessons = ~240 videos)
CREATE TABLE videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
  video_number INTEGER NOT NULL CHECK (video_number >= 1 AND video_number <= 3),
  title TEXT NOT NULL,
  youtube_id TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(lesson_id, video_number)
);

-- Activities (2 per lesson × 80 lessons = ~160 activities)
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
  activity_number INTEGER NOT NULL CHECK (activity_number >= 1 AND activity_number <= 2),
  title TEXT NOT NULL,
  activity_type TEXT NOT NULL CHECK (activity_type IN ('map_exercise', 'timeline', 'comparison', 'research', 'analysis')),
  instructions TEXT NOT NULL,
  correct_answers JSONB NOT NULL,
  hints JSONB DEFAULT '[]',
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(lesson_id, activity_number)
);

-- Quizzes (1 per lesson = ~80 lesson quizzes, plus 20 unit tests)
CREATE TABLE quizzes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  unit_id INTEGER REFERENCES units(id) ON DELETE CASCADE,
  quiz_type TEXT NOT NULL CHECK (quiz_type IN ('lesson', 'unit_test')),
  title TEXT NOT NULL,
  passing_score INTEGER DEFAULT 80 CHECK (passing_score >= 0 AND passing_score <= 100),
  time_limit_minutes INTEGER,
  instructions TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CHECK (
    (quiz_type = 'lesson' AND lesson_id IS NOT NULL AND unit_id IS NULL) OR
    (quiz_type = 'unit_test' AND lesson_id IS NULL AND unit_id IS NOT NULL)
  )
);

-- Quiz questions (15 per lesson quiz × 80 = 1200, plus 30 per unit test × 20 = 600, total ~1800 questions)
CREATE TABLE quiz_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE NOT NULL,
  question_number INTEGER NOT NULL,
  question_type TEXT NOT NULL CHECK (question_type IN ('multiple_choice', 'short_answer', 'geography_map', 'true_false')),
  question_text TEXT NOT NULL,
  options JSONB, -- For multiple choice: ["option1", "option2", ...]
  correct_answer TEXT NOT NULL,
  explanation TEXT NOT NULL, -- Shown after answering
  points INTEGER DEFAULT 1 CHECK (points > 0),
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(quiz_id, question_number)
);

-- Essays (1 per unit × 20 = 20 essays)
CREATE TABLE essay_prompts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  unit_id INTEGER REFERENCES units(id) ON DELETE CASCADE UNIQUE NOT NULL,
  prompt TEXT NOT NULL,
  min_words INTEGER DEFAULT 800,
  max_words INTEGER DEFAULT 1200,
  rubric JSONB NOT NULL, -- Categories with point values
  sample_essay TEXT, -- Example of excellent response
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects (1 per unit × 20 = 20 projects)
CREATE TABLE project_prompts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  unit_id INTEGER REFERENCES units(id) ON DELETE CASCADE UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  instructions TEXT NOT NULL,
  deliverables JSONB NOT NULL, -- What student must submit
  rubric JSONB NOT NULL,
  example TEXT, -- Optional example project
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- STUDENT PROGRESS & SUBMISSIONS
-- ============================================

-- Lesson progress
CREATE TABLE student_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES student_profiles(id) ON DELETE CASCADE NOT NULL,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  time_spent_minutes INTEGER DEFAULT 0,
  reading_sections_completed INTEGER[] DEFAULT '{}',
  videos_watched INTEGER[] DEFAULT '{}',
  activities_completed INTEGER[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, lesson_id)
);

-- Quiz attempts
CREATE TABLE quiz_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES student_profiles(id) ON DELETE CASCADE NOT NULL,
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE NOT NULL,
  attempt_number INTEGER NOT NULL DEFAULT 1,
  score INTEGER NOT NULL CHECK (score >= 0),
  total_points INTEGER NOT NULL CHECK (total_points > 0),
  percentage DECIMAL(5,2) NOT NULL CHECK (percentage >= 0 AND percentage <= 100),
  passed BOOLEAN NOT NULL,
  answers JSONB NOT NULL, -- Array of {question_id, student_answer, correct, points_earned, explanation}
  time_taken_minutes INTEGER,
  started_at TIMESTAMPTZ NOT NULL,
  submitted_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Essay submissions
CREATE TABLE essay_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES student_profiles(id) ON DELETE CASCADE NOT NULL,
  essay_prompt_id UUID REFERENCES essay_prompts(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  word_count INTEGER NOT NULL,
  submitted_at TIMESTAMPTZ NOT NULL,
  graded_by UUID REFERENCES parent_profiles(id) ON DELETE SET NULL,
  graded_at TIMESTAMPTZ,
  score INTEGER CHECK (score >= 0 AND score <= 100),
  rubric_scores JSONB, -- Breakdown by rubric category
  feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project submissions
CREATE TABLE project_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES student_profiles(id) ON DELETE CASCADE NOT NULL,
  project_prompt_id UUID REFERENCES project_prompts(id) ON DELETE CASCADE NOT NULL,
  description TEXT NOT NULL,
  file_urls TEXT[], -- Uploaded to Supabase Storage
  submitted_at TIMESTAMPTZ NOT NULL,
  graded_by UUID REFERENCES parent_profiles(id) ON DELETE SET NULL,
  graded_at TIMESTAMPTZ,
  score INTEGER CHECK (score >= 0 AND score <= 100),
  rubric_scores JSONB,
  feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Geography progress (track improvement from 2/10 to 8+/10)
CREATE TABLE geography_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES student_profiles(id) ON DELETE CASCADE NOT NULL,
  quiz_attempt_id UUID REFERENCES quiz_attempts(id) ON DELETE CASCADE,
  geography_questions_correct INTEGER NOT NULL DEFAULT 0,
  geography_questions_total INTEGER NOT NULL DEFAULT 0,
  skill_level_snapshot INTEGER CHECK (skill_level_snapshot >= 1 AND skill_level_snapshot <= 10),
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- AI TUTOR
-- ============================================

-- Tutor conversations
CREATE TABLE tutor_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES student_profiles(id) ON DELETE CASCADE NOT NULL,
  lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  message_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tutor messages
CREATE TABLE tutor_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES tutor_conversations(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ANALYTICS & REPORTING
-- ============================================

-- Learning analytics
CREATE TABLE learning_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES student_profiles(id) ON DELETE CASCADE NOT NULL,
  unit_id INTEGER REFERENCES units(id) ON DELETE CASCADE NOT NULL,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  metric_type TEXT NOT NULL CHECK (metric_type IN ('time_on_task', 'struggle_point', 'mastery_achieved', 'help_requested')),
  metric_value JSONB NOT NULL,
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX idx_student_progress_student ON student_progress(student_id);
CREATE INDEX idx_student_progress_lesson ON student_progress(lesson_id);
CREATE INDEX idx_quiz_attempts_student ON quiz_attempts(student_id);
CREATE INDEX idx_quiz_attempts_quiz ON quiz_attempts(quiz_id);
CREATE INDEX idx_lessons_unit ON lessons(unit_id);
CREATE INDEX idx_reading_sections_lesson ON reading_sections(lesson_id);
CREATE INDEX idx_videos_lesson ON videos(lesson_id);
CREATE INDEX idx_activities_lesson ON activities(lesson_id);
CREATE INDEX idx_quiz_questions_quiz ON quiz_questions(quiz_id);
CREATE INDEX idx_tutor_messages_conversation ON tutor_messages(conversation_id);
CREATE INDEX idx_geography_progress_student ON geography_progress(student_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE essay_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE geography_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutor_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutor_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_analytics ENABLE ROW LEVEL SECURITY;

-- Content tables are read-only for all authenticated users
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE essay_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_prompts ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Students can only see their own data
CREATE POLICY "Students can view own profile"
  ON student_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Students can update own profile"
  ON student_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Students can view own progress"
  ON student_progress FOR SELECT
  USING (student_id IN (SELECT id FROM student_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Students can insert own progress"
  ON student_progress FOR INSERT
  WITH CHECK (student_id IN (SELECT id FROM student_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Students can update own progress"
  ON student_progress FOR UPDATE
  USING (student_id IN (SELECT id FROM student_profiles WHERE user_id = auth.uid()));

-- Similar policies for quiz_attempts, essays, projects, tutor, analytics...
CREATE POLICY "Students can view own quiz attempts"
  ON quiz_attempts FOR SELECT
  USING (student_id IN (SELECT id FROM student_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Students can insert own quiz attempts"
  ON quiz_attempts FOR INSERT
  WITH CHECK (student_id IN (SELECT id FROM student_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Students can view own essay submissions"
  ON essay_submissions FOR SELECT
  USING (student_id IN (SELECT id FROM student_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Students can insert own essay submissions"
  ON essay_submissions FOR INSERT
  WITH CHECK (student_id IN (SELECT id FROM student_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Students can view own project submissions"
  ON project_submissions FOR SELECT
  USING (student_id IN (SELECT id FROM student_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Students can insert own project submissions"
  ON project_submissions FOR INSERT
  WITH CHECK (student_id IN (SELECT id FROM student_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Students can view own tutor conversations"
  ON tutor_conversations FOR ALL
  USING (student_id IN (SELECT id FROM student_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Students can view own tutor messages"
  ON tutor_messages FOR ALL
  USING (
    conversation_id IN (
      SELECT id FROM tutor_conversations 
      WHERE student_id IN (SELECT id FROM student_profiles WHERE user_id = auth.uid())
    )
  );

-- RLS Policies: Parents can view their students' data
CREATE POLICY "Parents can view own profile"
  ON parent_profiles FOR ALL
  USING (user_id = auth.uid());

CREATE POLICY "Parents can view their students' profiles"
  ON student_profiles FOR SELECT
  USING (
    id = ANY(
      SELECT unnest(student_ids) FROM parent_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Parents can view their students' progress"
  ON student_progress FOR SELECT
  USING (
    student_id = ANY(
      SELECT unnest(student_ids) FROM parent_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Parents can view their students' quiz attempts"
  ON quiz_attempts FOR SELECT
  USING (
    student_id = ANY(
      SELECT unnest(student_ids) FROM parent_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Parents can grade their students' essays"
  ON essay_submissions FOR ALL
  USING (
    student_id = ANY(
      SELECT unnest(student_ids) FROM parent_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Parents can grade their students' projects"
  ON project_submissions FOR ALL
  USING (
    student_id = ANY(
      SELECT unnest(student_ids) FROM parent_profiles WHERE user_id = auth.uid()
    )
  );

-- RLS Policies: Content is readable by all authenticated users
CREATE POLICY "All users can view units"
  ON units FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "All users can view lessons"
  ON lessons FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "All users can view reading sections"
  ON reading_sections FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "All users can view videos"
  ON videos FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "All users can view activities"
  ON activities FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "All users can view quizzes"
  ON quizzes FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "All users can view quiz questions"
  ON quiz_questions FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "All users can view essay prompts"
  ON essay_prompts FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "All users can view project prompts"
  ON project_prompts FOR SELECT
  USING (auth.role() = 'authenticated');
```

**Expected Result:** Database schema created successfully with all tables, indexes, and RLS policies.

### Step 2.4: Configure Supabase Storage

**Navigate to:** Storage in Supabase Dashboard

**Create Storage Buckets:**

1. **Essays Bucket:**
   - Name: `essays`
   - Public: No (private)
   - Allowed MIME types: `application/pdf`, `text/plain`
   - Max file size: 5 MB

2. **Projects Bucket:**
   - Name: `projects`
   - Public: No (private)
   - Allowed MIME types: `image/*`, `application/pdf`, `video/*`
   - Max file size: 50 MB

3. **Profile Pictures Bucket:**
   - Name: `avatars`
   - Public: Yes (public)
   - Allowed MIME types: `image/*`
   - Max file size: 2 MB

**Storage Policies:** (Apply to each bucket)

```sql
-- Allow authenticated users to upload to their own folders
CREATE POLICY "Users can upload own files"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'essays' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view own files"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'essays' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Repeat for 'projects' and 'avatars' buckets
```

### Step 2.5: Create Supabase Client Utilities

**Create `src/lib/supabase/client.ts`:**

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

**Create `src/lib/supabase/server.ts`:**

```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
```

**Create `src/lib/supabase/middleware.ts`:**

```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  await supabase.auth.getUser()

  return response
}
```

**Create `middleware.ts` in project root:**

```typescript
import { type NextRequest } from 'next/server'
import { updateSession } from './src/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

### Step 2.6: Create TypeScript Database Types

**Generate types from Supabase schema:**

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Log in to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Generate TypeScript types
supabase gen types typescript --linked > src/lib/supabase/database.types.ts
```

### Step 2.7: Implement Authentication Pages

**Create `src/app/(auth)/login/page.tsx`:**

```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          <CardDescription>
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
```

**Create `src/app/(auth)/signup/page.tsx`:**

```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [role, setRole] = useState<'student' | 'parent'>('student')
  const [age, setAge] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // 1. Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    if (!authData.user) {
      setError('Failed to create user')
      setLoading(false)
      return
    }

    // 2. Create profile (student or parent)
    if (role === 'student') {
      const { error: profileError } = await supabase
        .from('student_profiles')
        .insert({
          user_id: authData.user.id,
          first_name: firstName,
          last_name: lastName,
          age: parseInt(age),
        })

      if (profileError) {
        setError(profileError.message)
        setLoading(false)
        return
      }
    } else {
      const { error: profileError } = await supabase
        .from('parent_profiles')
        .insert({
          user_id: authData.user.id,
          first_name: firstName,
          last_name: lastName,
        })

      if (profileError) {
        setError(profileError.message)
        setLoading(false)
        return
      }
    }

    // 3. Redirect to dashboard
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>
            Enter your information to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium">
                  First Name
                </label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium">
                  Last Name
                </label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium">
                I am a...
              </label>
              <Select value={role} onValueChange={(value) => setRole(value as 'student' | 'parent')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {role === 'student' && (
              <div className="space-y-2">
                <label htmlFor="age" className="text-sm font-medium">
                  Age
                </label>
                <Input
                  id="age"
                  type="number"
                  min="10"
                  max="25"
                  placeholder="15"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>
            )}
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
```

### Step 2.8: Create Protected Route Layout

**Create `src/app/dashboard/layout.tsx`:**

```typescript
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return <>{children}</>
}
```

**Create `src/app/dashboard/page.tsx`:**

```typescript
import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  // Fetch user profile
  const { data: studentProfile } = await supabase
    .from('student_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  const { data: parentProfile } = await supabase
    .from('parent_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  const profile = studentProfile || parentProfile
  const role = studentProfile ? 'student' : 'parent'

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {profile?.first_name}!
      </h1>
      <p className="text-muted-foreground">
        You are logged in as a {role}.
      </p>
      {role === 'student' && (
        <div className="mt-4">
          <p>Geography Skill: {studentProfile.geography_current}/10</p>
          <p>Culinary Skill: {studentProfile.culinary_skill_level}/10</p>
        </div>
      )}
    </div>
  )
}
```

### Step 2.9: Test Authentication

```bash
# Start development server
npm run dev

# Navigate to http://localhost:3000/signup
# Create a test student account
# Create a test parent account
# Test login with both accounts
# Verify dashboard displays correct information
```

### Step 2.10: Commit Database & Auth Setup

```bash
git add .
git commit -m "feat: Set up Supabase database schema and authentication system"
git push origin main
```

**Deliverables:**
- ✅ Supabase project created
- ✅ Complete database schema implemented (20+ tables)
- ✅ Row Level Security policies configured
- ✅ Storage buckets created (essays, projects, avatars)
- ✅ Supabase client utilities created (client, server, middleware)
- ✅ TypeScript database types generated
- ✅ Authentication pages built (login, signup)
- ✅ Protected routes configured (dashboard)
- ✅ Test accounts created and verified
- ✅ Changes committed to GitHub

**Next:** Phase 3 - Core Content System

---

## Phase 3: Core Content System

**Goal:** Build lesson display system, reading content viewer, video embeds, and activity components.

**Estimated Time:** 5-6 hours

### Step 3.1: Create Database Seeding Scripts

**Seeding strategy:** Convert markdown specifications (Units 4-6) into database records.

**Create `scripts/seed-database.ts`:**

```typescript
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role for seeding
)

async function seedUnits() {
  const units = [
    {
      id: 4,
      number: 4,
      title: 'Ancient Mesopotamia & Egypt',
      slug: 'mesopotamia-egypt',
      description: 'Explore the birth of agriculture and complex food systems in the fertile crescent...',
      geographic_focus: ['Middle East', 'North Africa'],
      historical_era: '3500-500 BCE',
      duration_hours: 12,
      learning_objectives: {
        objectives: [
          'Understand how geography shaped early food production',
          'Analyze social hierarchies through food access',
          'Trace early trade networks and their impact'
        ]
      },
      unlock_requirements: { previous_unit_score: 80 },
      order_index: 4
    },
    // Add Unit 5, Unit 6...
  ]

  const { error } = await supabase.from('units').upsert(units)
  
  if (error) {
    console.error('Error seeding units:', error)
  } else {
    console.log('✅ Units seeded successfully')
  }
}

async function seedLessons() {
  // Parse lesson data from UNIT-4-COMPLETE-SPECIFICATION.md
  // For each lesson, insert into lessons table
  // This will require manual extraction or a markdown parser
  
  const lessons = [
    {
      unit_id: 4,
      lesson_number: 1,
      title: 'Beer Before Bread',
      slug: 'beer-before-bread',
      summary: 'How fermentation and brewing shaped Mesopotamian society...',
      reading_time_minutes: 25,
      learning_objectives: {
        objectives: [
          'Explain why beer production preceded bread',
          'Identify key crops of Mesopotamia',
          'Analyze irrigation impact on food production'
        ]
      },
      order_index: 1
    },
    // Add more lessons...
  ]

  const { error } = await supabase.from('lessons').upsert(lessons)
  
  if (error) {
    console.error('Error seeding lessons:', error)
  } else {
    console.log('✅ Lessons seeded successfully')
  }
}

async function seedReadingSections() {
  // Extract reading section content from unit specifications
  // Each reading section is 800-1200 words
  
  const readingSections = [
    {
      lesson_id: 'uuid-from-lesson',
      section_number: 1,
      title: 'The Fertile Crescent: Geography and Agriculture',
      content: `The Fertile Crescent, a crescent-shaped region stretching from the Persian Gulf through modern-day Iraq, Syria, Lebanon, Israel/Palestine, and into Egypt, represents humanity's first sustained experiment in agriculture...
      
      [Full 1000+ word content here from specification]`,
      word_count: 1150,
      order_index: 1
    },
    // Add more reading sections...
  ]

  for (const section of readingSections) {
    const { error } = await supabase
      .from('reading_sections')
      .upsert(section)
    
    if (error) {
      console.error(`Error seeding reading section ${section.title}:`, error)
    }
  }
  
  console.log('✅ Reading sections seeded successfully')
}

async function seedVideos() {
  // Videos require YouTube search or manual curation
  const videos = [
    {
      lesson_id: 'uuid-from-lesson',
      video_number: 1,
      title: 'Mesopotamian Agriculture and Irrigation',
      youtube_id: 'dQw4w9WgXcQ', // Replace with actual YouTube ID
      duration_minutes: 15,
      description: 'Documentary on ancient Mesopotamian farming techniques',
      order_index: 1
    },
    // Add more videos...
  ]

  const { error } = await supabase.from('videos').upsert(videos)
  
  if (error) {
    console.error('Error seeding videos:', error)
  } else {
    console.log('✅ Videos seeded successfully')
  }
}

async function seedActivities() {
  const activities = [
    {
      lesson_id: 'uuid-from-lesson',
      activity_number: 1,
      title: 'Map the Fertile Crescent',
      activity_type: 'map_exercise',
      instructions: 'Using the interactive map, identify and click on the following locations...',
      correct_answers: {
        mesopotamia: { lat: 33.3, lng: 44.4 },
        babylon: { lat: 32.5, lng: 44.4 },
        nile_delta: { lat: 30.8, lng: 31.2 }
      },
      hints: ['Look between the Tigris and Euphrates rivers'],
      order_index: 1
    },
    // Add more activities...
  ]

  const { error } = await supabase.from('activities').upsert(activities)
  
  if (error) {
    console.error('Error seeding activities:', error)
  } else {
    console.log('✅ Activities seeded successfully')
  }
}

async function seedQuizzes() {
  // First create quiz records
  const quizzes = [
    {
      lesson_id: 'uuid-from-lesson',
      quiz_type: 'lesson',
      title: 'Beer Before Bread Quiz',
      passing_score: 80,
      time_limit_minutes: 15,
      instructions: 'Answer all questions. You need 80% to pass.'
    },
    // Add more quizzes...
  ]

  const { data: quizData, error: quizError } = await supabase
    .from('quizzes')
    .upsert(quizzes)
    .select()

  if (quizError) {
    console.error('Error seeding quizzes:', quizError)
    return
  }

  // Then create quiz questions
  const questions = [
    {
      quiz_id: quizData[0].id,
      question_number: 1,
      question_type: 'multiple_choice',
      question_text: 'What does "Mesopotamia" mean in Greek?',
      options: JSON.stringify([
        'Between rivers',
        'Land of mountains',
        'Desert region',
        'Fertile land'
      ]),
      correct_answer: 'Between rivers',
      explanation: 'The name comes from Greek mesos (middle) + potamos (river), referring to the Tigris and Euphrates.',
      points: 1,
      order_index: 1
    },
    // Add more questions (15 per lesson quiz, 30 per unit test)...
  ]

  const { error: questionsError } = await supabase
    .from('quiz_questions')
    .upsert(questions)

  if (questionsError) {
    console.error('Error seeding quiz questions:', questionsError)
  } else {
    console.log('✅ Quizzes and questions seeded successfully')
  }
}

async function main() {
  console.log('🌱 Starting database seed...')
  
  await seedUnits()
  await seedLessons()
  await seedReadingSections()
  await seedVideos()
  await seedActivities()
  await seedQuizzes()
  
  console.log('✅ Database seeding complete!')
}

main()
```

**Add script to `package.json`:**

```json
{
  "scripts": {
    "seed": "tsx scripts/seed-database.ts"
  }
}
```

**Install tsx for running TypeScript scripts:**

```bash
npm install -D tsx
```

**Manual Seeding Process:**

For now, manually extract content from UNIT-4, UNIT-5, UNIT-6 specifications and format as JSON, then use seeding script. This is time-consuming but ensures accuracy.

*(This step is detailed but will take several hours to complete all content. For initial development, seed just Unit 4 Lesson 1 as proof-of-concept.)*

### Step 3.2: Create Lesson Display Components

**Create `src/components/lessons/LessonViewer.tsx`:**

```typescript
'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import VideoPlayer from './VideoPlayer'
import ActivityComponent from './ActivityComponent'
import type { Lesson, ReadingSection, Video, Activity } from '@/types/content'

interface LessonViewerProps {
  lesson: Lesson
  readingSections: ReadingSection[]
  videos: Video[]
  activities: Activity[]
  onComplete: () => void
}

export default function LessonViewer({
  lesson,
  readingSections,
  videos,
  activities,
  onComplete
}: LessonViewerProps) {
  const [currentSection, setCurrentSection] = useState(0)
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set())

  const totalSteps = readingSections.length + videos.length + activities.length
  const progress = (completedSections.size / totalSteps) * 100

  const markSectionComplete = (index: number) => {
    setCompletedSections(prev => new Set(prev).add(index))
  }

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
        <p className="text-muted-foreground mb-4">{lesson.summary}</p>
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-muted-foreground mt-2">
          {completedSections.size} of {totalSteps} completed
        </p>
      </div>

      <Tabs defaultValue="reading" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reading">Reading</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
        </TabsList>

        <TabsContent value="reading" className="space-y-6">
          {readingSections.map((section, index) => (
            <Card key={section.id}>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {section.word_count} words • ~{Math.ceil(section.word_count / 200)} min read
                </p>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {section.content}
                  </ReactMarkdown>
                </div>
                {!completedSections.has(index) && (
                  <Button 
                    className="mt-4"
                    onClick={() => markSectionComplete(index)}
                  >
                    Mark as Read
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="videos" className="space-y-6">
          {videos.map((video, index) => (
            <VideoPlayer
              key={video.id}
              video={video}
              onComplete={() => markSectionComplete(readingSections.length + index)}
            />
          ))}
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          {activities.map((activity, index) => (
            <ActivityComponent
              key={activity.id}
              activity={activity}
              onComplete={() => markSectionComplete(readingSections.length + videos.length + index)}
            />
          ))}
        </TabsContent>
      </Tabs>

      {completedSections.size === totalSteps && (
        <Card className="mt-6 bg-green-50 dark:bg-green-900/20">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-2">Lesson Complete!</h3>
            <p className="mb-4">You've finished all content. Ready to take the quiz?</p>
            <Button onClick={onComplete}>Take Quiz</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
```

**Create `src/components/lessons/VideoPlayer.tsx`:**

```typescript
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Video } from '@/types/content'

interface VideoPlayerProps {
  video: Video
  onComplete: () => void
}

export default function VideoPlayer({ video, onComplete }: VideoPlayerProps) {
  const [watched, setWatched] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{video.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          Duration: {video.duration_minutes} minutes
        </p>
      </CardHeader>
      <CardContent>
        <div className="aspect-video mb-4">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtube_id}`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg"
          />
        </div>
        {video.description && (
          <p className="text-sm text-muted-foreground mb-4">{video.description}</p>
        )}
        {!watched && (
          <Button onClick={() => {
            setWatched(true)
            onComplete()
          }}>
            Mark as Watched
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
```

**Create `src/components/lessons/ActivityComponent.tsx`:**

```typescript
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Activity } from '@/types/content'

interface ActivityComponentProps {
  activity: Activity
  onComplete: () => void
}

export default function ActivityComponent({ activity, onComplete }: ActivityComponentProps) {
  const [completed, setCompleted] = useState(false)
  const [showHints, setShowHints] = useState(false)

  const activityComponents = {
    map_exercise: () => <div>Map exercise component here</div>,
    timeline: () => <div>Timeline activity component here</div>,
    comparison: () => <div>Comparison activity component here</div>,
    research: () => <div>Research activity component here</div>,
    analysis: () => <div>Analysis activity component here</div>
  }

  const ActivityContent = activityComponents[activity.activity_type]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{activity.title}</CardTitle>
        <p className="text-sm text-muted-foreground capitalize">
          {activity.activity_type.replace('_', ' ')}
        </p>
      </CardHeader>
      <CardContent>
        <div className="prose dark:prose-invert max-w-none mb-4">
          <p>{activity.instructions}</p>
        </div>

        <ActivityContent />

        <div className="mt-4 space-x-2">
          {!completed && (
            <>
              <Button onClick={() => setShowHints(!showHints)} variant="outline">
                {showHints ? 'Hide Hints' : 'Show Hints'}
              </Button>
              <Button onClick={() => {
                setCompleted(true)
                onComplete()
              }}>
                Submit Activity
              </Button>
            </>
          )}
        </div>

        {showHints && activity.hints && activity.hints.length > 0 && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="font-semibold mb-2">Hints:</p>
            <ul className="list-disc list-inside space-y-1">
              {activity.hints.map((hint, index) => (
                <li key={index} className="text-sm">{hint}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
```

### Step 3.3: Create TypeScript Type Definitions

**Create `src/types/content.ts`:**

```typescript
export interface Unit {
  id: number
  number: number
  title: string
  slug: string
  description: string
  geographic_focus: string[]
  historical_era: string
  duration_hours: number
  learning_objectives: {
    objectives: string[]
  }
  unlock_requirements: {
    previous_unit_score: number
  }
  order_index: number
  created_at: string
}

export interface Lesson {
  id: string
  unit_id: number
  lesson_number: number
  title: string
  slug: string
  summary: string
  reading_time_minutes: number
  learning_objectives: {
    objectives: string[]
  }
  order_index: number
  created_at: string
}

export interface ReadingSection {
  id: string
  lesson_id: string
  section_number: number
  title: string
  content: string
  word_count: number
  order_index: number
  created_at: string
}

export interface Video {
  id: string
  lesson_id: string
  video_number: number
  title: string
  youtube_id: string
  duration_minutes: number
  description?: string
  order_index: number
  created_at: string
}

export interface Activity {
  id: string
  lesson_id: string
  activity_number: number
  title: string
  activity_type: 'map_exercise' | 'timeline' | 'comparison' | 'research' | 'analysis'
  instructions: string
  correct_answers: Record<string, any>
  hints?: string[]
  order_index: number
  created_at: string
}

export interface Quiz {
  id: string
  lesson_id?: string
  unit_id?: number
  quiz_type: 'lesson' | 'unit_test'
  title: string
  passing_score: number
  time_limit_minutes?: number
  instructions?: string
  created_at: string
}

export interface QuizQuestion {
  id: string
  quiz_id: string
  question_number: number
  question_type: 'multiple_choice' | 'short_answer' | 'geography_map' | 'true_false'
  question_text: string
  options?: string[]
  correct_answer: string
  explanation: string
  points: number
  order_index: number
  created_at: string
}
```

### Step 3.4: Create Units Browser Page

**Create `src/app/units/page.tsx`:**

```typescript
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default async function UnitsPage() {
  const supabase = await createClient()

  const { data: units } = await supabase
    .from('units')
    .select('*')
    .order('order_index')

  if (!units) {
    return <div>No units found</div>
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Food Throughout History</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {units.map((unit) => (
          <Link key={unit.id} href={`/units/${unit.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle>Unit {unit.number}: {unit.title}</CardTitle>
                <CardDescription>{unit.historical_era}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {unit.description}
                </p>
                <p className="text-sm font-medium mt-4">
                  ~{unit.duration_hours} hours
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
```

**Create `src/app/units/[unitId]/page.tsx`:**

```typescript
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function UnitPage({ params }: { params: { unitId: string } }) {
  const supabase = await createClient()

  const { data: unit } = await supabase
    .from('units')
    .select('*')
    .eq('id', params.unitId)
    .single()

  if (!unit) {
    notFound()
  }

  const { data: lessons } = await supabase
    .from('lessons')
    .select('*')
    .eq('unit_id', unit.id)
    .order('order_index')

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <h1 className="text-4xl font-bold mb-2">Unit {unit.number}: {unit.title}</h1>
      <p className="text-xl text-muted-foreground mb-6">{unit.historical_era}</p>
      <p className="text-lg mb-8">{unit.description}</p>

      <h2 className="text-2xl font-semibold mb-4">Lessons</h2>
      <div className="space-y-4">
        {lessons?.map((lesson) => (
          <Link key={lesson.id} href={`/units/${unit.id}/lessons/${lesson.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle>
                  Lesson {lesson.lesson_number}: {lesson.title}
                </CardTitle>
                <CardDescription>
                  ~{lesson.reading_time_minutes} minutes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{lesson.summary}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
```

**Create `src/app/units/[unitId]/lessons/[lessonId]/page.tsx`:**

```typescript
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import LessonViewer from '@/components/lessons/LessonViewer'

export default async function LessonPage({
  params
}: {
  params: { unitId: string; lessonId: string }
}) {
  const supabase = await createClient()

  // Fetch lesson
  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', params.lessonId)
    .single()

  if (!lesson) {
    notFound()
  }

  // Fetch reading sections
  const { data: readingSections } = await supabase
    .from('reading_sections')
    .select('*')
    .eq('lesson_id', lesson.id)
    .order('order_index')

  // Fetch videos
  const { data: videos } = await supabase
    .from('videos')
    .select('*')
    .eq('lesson_id', lesson.id)
    .order('order_index')

  // Fetch activities
  const { data: activities } = await supabase
    .from('activities')
    .select('*')
    .eq('lesson_id', lesson.id)
    .order('order_index')

  return (
    <LessonViewer
      lesson={lesson}
      readingSections={readingSections || []}
      videos={videos || []}
      activities={activities || []}
      onComplete={() => {
        // Redirect to quiz page
        window.location.href = `/units/${params.unitId}/lessons/${params.lessonId}/quiz`
      }}
    />
  )
}
```

### Step 3.5: Commit Core Content System

```bash
git add .
git commit -m "feat: Implement core content system (lesson viewer, reading sections, videos, activities)"
git push origin main
```

**Deliverables:**
- ✅ Database seeding scripts created
- ✅ Lesson viewer component built
- ✅ Reading section display with Markdown rendering
- ✅ Video player with YouTube embeds
- ✅ Activity component framework
- ✅ TypeScript types defined for all content
- ✅ Units browser page (/units)
- ✅ Unit detail page (/units/[unitId])
- ✅ Lesson page (/units/[unitId]/lessons/[lessonId])
- ✅ Progress tracking UI (sections completed)
- ✅ Changes committed to GitHub

**Next:** Phase 4 - Student Learning Experience (quizzes, progress tracking)

---

## Phase 4: Student Learning Experience

**Goal:** Implement quiz system, progress tracking, and student dashboard with analytics.

**Estimated Time:** 8-10 hours

*(Continuing pattern... document would be ~10,000+ lines for all phases. I'll provide a summary of remaining phases.)*

### Remaining Phases Summary:

**Phase 5: Geography & Maps (Leaflet)** - 6-8 hours
- Install and configure Leaflet
- Create base map component with OpenStreetMap tiles
- Build interactive geography exercises
- Implement click-to-answer map quizzes
- Add trade route visualizations
- Create climate zone overlays
- Build continent explorer

**Phase 6: AI Tutor Integration** - 4-5 hours
- Set up OpenAI/Anthropic API clients
- Build chat interface
- Implement context injection (current lesson content)
- Add Socratic method prompts (no direct answers)
- Store conversation history in database
- Create parent monitoring view

**Phase 7: Assessments & Progress Tracking** - 6-8 hours
- Build quiz taking interface
- Implement auto-grading system
- Create essay submission form
- Build project upload system
- Track progress metrics (time on task, scores, completion)
- Calculate geography skill improvement (2/10 → 8+/10)
- Build student progress dashboard

**Phase 8: Parent Dashboard & Grading** - 5-6 hours
- Create parent dashboard layout
- Build essay grading interface with rubric
- Build project grading interface
- Display analytics (time spent, quiz scores, geography progress)
- Generate weekly reports
- Add email notifications

**Phase 9: Polish & Testing** - 6-8 hours
- Mobile responsiveness testing
- Accessibility audit (WCAG 2.1 AA)
- Performance optimization (lazy loading, code splitting)
- Error handling and loading states
- UI/UX polish (animations, transitions)
- Cross-browser testing
- Content verification

**Phase 10: Deployment & Launch** - 2-3 hours
- Connect GitHub repository to Vercel
- Configure environment variables in Vercel
- Set up production database
- Test production deployment
- Configure custom domain (optional)
- Monitor performance and errors

---

## GitHub Workflow

### Branch Strategy

**Main Branch (`main`):**
- Always deployable
- Protected (requires reviews for teams)
- Automatically deploys to Vercel production

**Development Branch (`dev`):**
- Staging environment
- Merge feature branches here first
- Test before merging to main

**Feature Branches:**
- `feature/auth-system`
- `feature/lesson-viewer`
- `feature/map-integration`
- `feature/ai-tutor`

### Typical Workflow

```bash
# Create feature branch
git checkout -b feature/quiz-system

# Make changes, commit frequently
git add .
git commit -m "feat: Add quiz taking interface"

# Push to GitHub
git push origin feature/quiz-system

# Create pull request on GitHub
# After review/testing, merge to dev
# Then merge dev to main for production deployment
```

### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: Add new feature
fix: Bug fix
docs: Documentation changes
style: Code style changes (formatting)
refactor: Code refactoring
test: Adding tests
chore: Build process or tooling changes
```

---

## Vercel Deployment

### Step 10.1: Connect GitHub to Vercel

1. **Go to Vercel Dashboard:** https://vercel.com/dashboard
2. **Click "Add New" → "Project"**
3. **Import Git Repository:**
   - Select "GitHub"
   - Find `TheAccidentalTeacher/FoodHistory`
   - Click "Import"

4. **Configure Project:**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./` (root)
   - Build Command: `next build` (default)
   - Output Directory: `.next` (default)

5. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add all variables from `.env.local`:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `OPENAI_API_KEY`
     - `ANTHROPIC_API_KEY`
     - `YOUTUBE_API_KEY`
     - `NEXT_PUBLIC_APP_URL` (use Vercel URL)

6. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes for build
   - Visit deployed URL (e.g., `foodhistory.vercel.app`)

### Step 10.2: Configure Production Database

**Update Supabase Production Settings:**

1. **Add Vercel URL to Supabase allowed origins:**
   - Supabase Dashboard → Authentication → URL Configuration
   - Site URL: `https://your-app.vercel.app`
   - Redirect URLs: `https://your-app.vercel.app/**`

2. **Seed production database:**
   - Run seeding scripts against production Supabase instance
   - Or copy data from development database

### Step 10.3: Set Up Custom Domain (Optional)

1. **In Vercel Dashboard:**
   - Project Settings → Domains
   - Add domain: `foodhistory.com` (or your domain)

2. **Update DNS:**
   - Add CNAME record pointing to `cname.vercel-dns.com`

3. **Update Supabase URLs:**
   - Add custom domain to Supabase redirect URLs

### Step 10.4: Continuous Deployment

**Automatic Deployments:**
- Every push to `main` → Deploys to production
- Every push to other branches → Creates preview deployment
- Pull requests → Get unique preview URLs

---

## Summary Checklist

### ✅ Setup Complete
- [x] GitHub repository created
- [x] All accounts created (Supabase, Vercel, OpenAI, YouTube API)
- [x] Local environment configured
- [x] Next.js project initialized
- [x] Dependencies installed

### 🚧 In Progress
- [ ] Database fully seeded (Units 4-6)
- [ ] Core features implemented
- [ ] Testing complete
- [ ] Production deployment

### ⏳ Remaining Work
- [ ] Units 7-20 content specification
- [ ] Advanced features (gamification, badges, analytics)
- [ ] Mobile app (future consideration)

---

## Next Steps

1. **Immediate:** Complete Phase 3 (Core Content System)
   - Finish seeding
Unit 4 content into database
   - Test lesson viewer with real content
   - Verify video embeds work

2. **This Week:** Complete Phases 4-6
   - Build quiz system
   - Integrate Leaflet maps
   - Add AI tutor

3. **Next Week:** Complete Phases 7-10
   - Progress tracking
   - Parent dashboard
   - Polish and deploy

4. **Ongoing:** Content creation
   - Specify Units 7-20 in parallel
   - Curate YouTube videos
   - Create geography exercises

---

**Total Implementation Time: ~60-65 hours development + ~100+ hours content specification**

**Timeline:** 2-3 weeks full-time development, 4-6 weeks part-time

**Current Status:** Ready to begin Phase 1 (Project Foundation)

