# Food History App - TODO & Next Steps

> **Last Updated:** February 10, 2026  
> **Current Status:** Unit 1 Complete & Deployed

## 🎯 Immediate Priorities

### 1. **Video Management - Database Integration**
**Status:** Search feature complete, database integration needed  
**Location:** `/admin/videos`

**What Works:**
- ✅ AI-powered video search (OpenAI/Anthropic)
- ✅ YouTube API integration
- ✅ Video preview interface
- ✅ Simple keyword search

**What Needs Building:**
- [ ] Lesson selector dropdown in admin interface
- [ ] API endpoint: `POST /api/videos/add` to save videos to Supabase
- [ ] Video ordering/sequencing within lessons
- [ ] Bulk video import
- [ ] Video replacement/deletion
- [ ] Validation: check if video already exists in lesson

**Implementation Notes:**
```typescript
// Endpoint needed: src/app/api/videos/add/route.ts
// Required fields:
{
  lesson_id: number,
  youtube_id: string,
  title: string,
  duration_seconds: number,
  sequence_order: number
}
```

**Files to Modify:**
- `src/components/admin/VideoSearchAdmin.tsx` - Add lesson selector
- Create: `src/app/api/videos/add/route.ts` - Save endpoint
- Create: `src/app/api/lessons/list/route.ts` - Get all lessons for dropdown

---

### 2. **AI Tutor Integration**
**Status:** API keys configured, feature not built  
**Priority:** HIGH

**Requirements:**
- [ ] Chat interface for students to ask questions
- [ ] Context-aware responses (knows current lesson/unit)
- [ ] Guided learning mode vs free exploration
- [ ] Citation of lesson content in responses
- [ ] Conversation history per student
- [ ] Token usage tracking/limits
- [ ] Choose between OpenAI and Anthropic
- [ ] System prompts optimized for food history education

**Suggested Features:**
- [ ] "Ask about this lesson" button on lesson pages
- [ ] Persistent chat sidebar
- [ ] Pre-written starter questions
- [ ] "Explain like I'm 5" mode
- [ ] Quiz question explanations via AI
- [ ] Activity hint system

**Technical Stack:**
```typescript
// Components needed:
src/components/tutor/
  ├── TutorChat.tsx          // Main chat interface
  ├── TutorMessage.tsx       // Individual messages
  ├── TutorStarters.tsx      // Suggested questions
  └── TutorSettings.tsx      // Settings panel

// API routes needed:
src/app/api/tutor/
  ├── chat/route.ts          // Handle chat messages
  ├── history/route.ts       // Get chat history
  └── clear/route.ts         // Clear history
```

**Database Schema Needed:**
```sql
-- Create table for tutor conversations
CREATE TABLE tutor_conversations (
  id BIGSERIAL PRIMARY KEY,
  student_id BIGINT REFERENCES student_profiles(id),
  lesson_id BIGINT REFERENCES lessons(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE tutor_messages (
  id BIGSERIAL PRIMARY KEY,
  conversation_id BIGINT REFERENCES tutor_conversations(id),
  role TEXT NOT NULL, -- 'user' or 'assistant'
  content TEXT NOT NULL,
  tokens_used INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 3. **Interactive Map Enhancements**
**Status:** Basic continent explorer working, needs major upgrades  
**Priority:** HIGH  
**Current File:** `src/components/lessons/MapActivity.tsx`

**Current Features:**
- ✅ 6 continent polygons with click handlers
- ✅ Basic popup information
- ✅ Progress tracking (X/6 explored)
- ✅ Reflection question unlock

**Planned Enhancements:**

#### A. **Visual Improvements**
- [ ] Custom markers for origin points (not just continent blocks)
- [ ] Beautiful custom icons for different food types
- [ ] Zoom animations when clicking regions
- [ ] Gradient/texture fills for continents
- [ ] Historical trade route overlays
- [ ] Timeline slider (map changes by era)
- [ ] Dark mode support
- [ ] Custom legend/key

#### B. **Content Depth**
- [ ] Multiple items per continent (not just one popup)
- [ ] Detailed food origin locations (cities, regions)
- [ ] Historical context cards
- [ ] Images of foods/artifacts
- [ ] Migration paths of crops
- [ ] Domestication sites with dates
- [ ] Explorer routes (Silk Road, Spice Route, Columbian Exchange)

#### C. **Interactivity**
- [ ] Search bar to find specific foods
- [ ] Filter by food category (grains, fruits, proteins, spices)
- [ ] Filter by time period
- [ ] "Trade simulator" - see what happens when routes connect
- [ ] Click on food to see its global spread
- [ ] Compare view: two time periods side-by-side
- [ ] Student annotations - add their own discoveries

#### D. **Gamification**
- [ ] Unlock achievements for exploration
- [ ] "Explorer Score" for discovering items
- [ ] Daily/weekly challenges
- [ ] Collectible "food cards" for each origin
- [ ] Share discoveries with classmates

**Data Structure Needed:**
```typescript
interface FoodOrigin {
  id: number
  name: string
  category: 'grain' | 'fruit' | 'vegetable' | 'protein' | 'spice'
  latitude: number
  longitude: number
  domestication_date: string // e.g., "8000 BCE"
  region: string
  historical_notes: string
  spread_routes: Array<{
    destination: string
    date: string
    method: string // trade, conquest, migration
  }>
  images: string[]
  related_foods: number[] // IDs of related foods
}
```

**Implementation Files:**
```
src/components/lessons/maps/
  ├── EnhancedMapActivity.tsx      // Main map component
  ├── MapControls.tsx              // Timeline, filters, search
  ├── FoodMarker.tsx               // Custom marker component
  ├── TradeRouteLayer.tsx          // Historical routes
  ├── FoodDetailPanel.tsx          // Sidebar with details
  └── MapLegend.tsx                // Legend/key

src/lib/map-data/
  ├── food-origins.ts              // All food origin data
  ├── trade-routes.ts              // Historical trade routes
  └── time-periods.ts              // Era definitions
```

---

## 📚 Content Creation

### Unit 1 Remaining Work
- [x] Lessons 1-4 reading content
- [x] 12 educational videos
- [x] 8 activities (reflection + map)
- [x] 18 quiz questions (Lessons 1-2)
- [ ] Quiz questions for Lessons 3-4
- [ ] Unit-level essay prompts
- [ ] Hands-on project specifications
- [ ] Geography pre-assessment

### Units 2-6
**Status:** Specification files exist, not seeded

**Ready to Seed:**
- Unit 2: Agricultural Revolutions
- Unit 3: Ancient Food Systems
- Unit 4: Medieval Food & Trade
- Unit 5: Columbian Exchange
- Unit 6: Industrial Food Revolution

**Process:**
1. Run seed script for each unit: `npm run seed:unit -- --unit=2`
2. Use video search to find appropriate videos
3. Test all interactive features
4. Review content quality

### Units 7-20
**Status:** Not created yet

**Need to Create:**
- [ ] Unit specifications (markdown files)
- [ ] Lesson content (4 lessons per unit)
- [ ] Video curation (3 per lesson)
- [ ] Activities (2 per lesson)
- [ ] Quiz questions (9-10 per lesson)

**Estimated Time:** 2-4 hours per unit with AI assistance

---

## 🎨 UI/UX Improvements

### Navigation & Layout
- [ ] Breadcrumb navigation
- [ ] Unit/lesson sidebar menu
- [ ] Progress indicators throughout
- [ ] Mobile-responsive improvements
- [ ] Loading states (skeletons)
- [ ] Error boundaries
- [ ] Toast notifications

### Student Dashboard
- [ ] Personal progress overview
- [ ] Achievements/badges display
- [ ] Recent activity timeline
- [ ] Upcoming assignments
- [ ] Grade summary
- [ ] Study streak tracker

### Lesson Pages
- [ ] Table of contents sidebar
- [ ] Estimated completion time
- [ ] Reading progress indicator
- [ ] Print-friendly view
- [ ] Note-taking panel
- [ ] Highlight/bookmark feature

### Quiz Interface
- [ ] Practice mode (no grade)
- [ ] Review mode (see all answers before submit)
- [ ] Explanation on demand (not just after submit)
- [ ] Hint system
- [ ] Timer (optional)
- [ ] Question bookmarking

### Activities
- [ ] Save draft functionality
- [ ] Auto-save (every 30 seconds)
- [ ] Word count goals more visible
- [ ] Character formatting (bold, italic, lists)
- [ ] Image upload for projects
- [ ] Peer review system

---

## 🔐 Authentication & User Management

### Current Status
- Basic Supabase auth setup
- No teacher/student role distinction

### Needed Features
- [ ] Teacher accounts vs student accounts
- [ ] Class/section management
- [ ] Student enrollment codes
- [ ] Teacher dashboard
- [ ] Parent view (read-only)
- [ ] Multiple classes per teacher
- [ ] Student impersonation (for support)

### Teacher Tools
- [ ] Grade book
- [ ] Bulk student import (CSV)
- [ ] Assignment creation/customization
- [ ] Due date management
- [ ] Announcement system
- [ ] Student progress reports
- [ ] Export grades to CSV

---

## 📊 Analytics & Reporting

### Student Analytics
- [ ] Time spent per lesson
- [ ] Quiz attempt patterns
- [ ] Video watch completion rates
- [ ] Activity submission times
- [ ] Struggle detection (many attempts)
- [ ] Engagement trends

### Teacher Reports
- [ ] Class performance overview
- [ ] Individual student reports
- [ ] Assignment completion rates
- [ ] Common wrong answers (quiz analysis)
- [ ] Video engagement metrics
- [ ] Activity word count averages

### System Monitoring
- [ ] Error tracking (Sentry?)
- [ ] Performance monitoring
- [ ] API usage tracking
- [ ] Database query optimization
- [ ] Vercel deployment logs

---

## 🛠️ Technical Debt

### TypeScript
- [ ] Strict mode compliance
- [ ] Remove all `any` types
- [ ] Proper error type definitions
- [ ] Consistent interface naming

### Testing
- [ ] Unit tests (Vitest)
- [ ] Component tests (React Testing Library)
- [ ] E2E tests (Playwright)
- [ ] API route tests
- [ ] Database query tests

### Performance
- [ ] Image optimization
- [ ] Lazy loading for heavy components
- [ ] React Server Components optimization
- [ ] Database indexing review
- [ ] Edge caching strategy

### Security
- [ ] RLS policy review
- [ ] Input validation everywhere
- [ ] SQL injection prevention audit
- [ ] XSS prevention
- [ ] Rate limiting on APIs
- [ ] CORS configuration

### Code Quality
- [ ] ESLint rules enforcement
- [ ] Prettier configuration
- [ ] Pre-commit hooks
- [ ] Consistent file naming
- [ ] Remove unused imports/variables

---

## 🚀 Future Features (Dream List)

### Advanced Learning
- [ ] Spaced repetition system
- [ ] Adaptive difficulty
- [ ] Personalized learning paths
- [ ] AI-generated practice questions
- [ ] Video transcripts with search
- [ ] Interactive timelines

### Social Features
- [ ] Discussion forums
- [ ] Study groups
- [ ] Peer Q&A
- [ ] Student blogs/journals
- [ ] Photo sharing (food projects)

### Gamification
- [ ] XP and leveling system
- [ ] Leaderboards
- [ ] Daily challenges
- [ ] Achievement badges
- [ ] Unlockable content
- [ ] Virtual rewards

### Multimedia
- [ ] Audio lessons (podcast style)
- [ ] 3D models (AR?)
- [ ] Virtual field trips
- [ ] Recipe demonstrations
- [ ] Chef interviews

### Accessibility
- [ ] Screen reader optimization
- [ ] High contrast mode
- [ ] Dyslexia-friendly fonts
- [ ] Text-to-speech
- [ ] Keyboard navigation
- [ ] Multiple language support

---

## 📝 Documentation Needs

### Developer Documentation
- [ ] API documentation (OpenAPI/Swagger)
- [ ] Database schema documentation
- [ ] Component architecture guide
- [ ] Deployment guide
- [ ] Contributing guidelines
- [ ] Troubleshooting guide

### User Documentation
- [ ] Teacher getting started guide
- [ ] Student tutorial
- [ ] Video tutorials
- [ ] FAQ section
- [ ] Keyboard shortcuts guide

### Content Creation Guide
- [ ] How to write lessons
- [ ] Video selection criteria
- [ ] Activity design guidelines
- [ ] Quiz writing best practices
- [ ] Rubric creation

---

## 🐛 Known Issues

### Critical
- None currently!

### Major
- [ ] Activities don't save to database (local state only)
- [ ] Video search "Add to Lesson" not connected
- [ ] No error handling on video embed failures

### Minor
- [ ] Map popups sometimes overlap
- [ ] Mobile menu needs improvement
- [ ] Loading states missing in some places

### Enhancement Requests
- [ ] Better mobile map controls
- [ ] Quiz timer option
- [ ] Export quiz results to PDF

---

## 🎯 Sprint Planning

### Sprint 1: AI Tutor (Next Priority)
**Duration:** 1-2 weeks  
**Goal:** Functional AI tutor with basic chat

Tasks:
1. Database schema for conversations
2. Chat UI component
3. API integration (Anthropic preferred)
4. Context awareness (current lesson)
5. Basic testing with students

### Sprint 2: Map Enhancements
**Duration:** 2-3 weeks  
**Goal:** Professional, feature-rich map

Tasks:
1. Data structure for food origins
2. Custom markers and icons
3. Timeline slider
4. Filter system
5. Detail panels
6. Trade routes overlay

### Sprint 3: Video Management
**Duration:** 1 week  
**Goal:** Complete video CRUD operations

Tasks:
1. Database integration
2. Lesson selector
3. Video ordering
4. Bulk operations

### Sprint 4: Units 2-6 Content
**Duration:** 2 weeks  
**Goal:** Seed and test 5 more units

Tasks:
1. Run seed scripts
2. Curate videos
3. Test all features
4. Content quality review

### Sprint 5: Teacher Tools
**Duration:** 2-3 weeks  
**Goal:** Teacher dashboard and management

Tasks:
1. Grade book
2. Class management
3. Student enrollment
4. Progress reports
5. Assignment settings

---

## 📞 Support & Resources

### API Keys & Credentials
- See: `DEPLOYMENT-CREDENTIALS.md`
- See: `SUPABASE-CREDENTIALS.txt`

### Useful Commands
```bash
# Development
npm run dev

# Database seeding
npm run seed:unit -- --unit=1

# Build
npm run build

# Deploy
git push origin main  # Auto-deploys to Vercel
```

### External Resources
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Leaflet Docs](https://leafletjs.com/reference.html)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Anthropic API](https://docs.anthropic.com/)
- [OpenAI API](https://platform.openai.com/docs)
- [YouTube Data API](https://developers.google.com/youtube/v3)

---

## ✅ Recently Completed

- ✅ Unit 1 complete (4 lessons, videos, activities, quizzes)
- ✅ Quiz interface with grading
- ✅ Reflection activity with word counts
- ✅ Interactive continent map
- ✅ TypeScript build errors resolved
- ✅ AI-powered video search feature
- ✅ YouTube API integration
- ✅ Real educational videos (12 total)
- ✅ Database schema fixes
- ✅ Seed script optimization
- ✅ Deployed to production

---

**Remember:** This is a living document. Update it as tasks are completed or priorities change!
