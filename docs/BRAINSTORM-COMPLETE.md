# 🎓 FOOD HISTORY CURRICULUM - COMPLETE DESIGN BLUEPRINT

**Project:** Personalized Food History Web Application for Timothy  
**Purpose:** Production app + Investor proof-of-concept for scalable homeschool platform  
**Timeline:** Blueprint complete → Build starts tonight  
**Developer:** Claude Opus 4.6  
**Date:** February 7, 2026

---

## 🎯 EXECUTIVE SUMMARY

### The Vision
Create a fully personalized, interactive web application that teaches food history across 6 continents and 10,000 years, specifically designed for Timothy (15, sophomore, aspiring Michelin-star private chef). This application demonstrates how AI can generate completely customized curricula for any student on any subject.

### The Proof of Concept
This production-ready application will demonstrate to investors:
- **Deep Personalization**: Every element tailored to Timothy's profile, goals, strengths, and weaknesses
- **Pedagogical Rigor**: Academically sound curriculum worthy of History/Social Studies credit
- **AI Integration**: Intelligent tutoring without enabling cheating
- **Professional Quality**: "Not AI slop" - clean architecture, robust features, scalable design
- **Rapid Development**: Built in ~6 hours using AI-assisted development

### Success Metrics
- Timothy completes 20 units over 1-2 academic years
- Geography skills improve from 2/10 to 8+/10
- Creates portfolio-worthy final project
- Investor sees replicable methodology for any student/subject

---

## 🚀 PROJECT STATUS (Updated February 8, 2026)

### ✅ Completed
1. **Master Blueprint:** This document (BRAINSTORM-COMPLETE.md) - 3,142 lines covering:
   - Complete student profile (Timothy's needs, strengths, weaknesses)
   - All 20 units outlined with lessons and assessments
   - Full tech stack specification (Next.js, Supabase, Leaflet maps)
   - Database schema (15+ tables with relationships)
   - Map system implementation (Leaflet 1.9.4, React components, continent data)
   - AI tutor specifications
   - Security and privacy requirements

2. **Unit 1 Complete Specification:** (UNIT-1-COMPLETE-SPECIFICATION.md) - 6,745 lines (Feb 6, 2026)
   - **4 Lessons:**
     - Lesson 1: What is Food History? (1,449 lines - full prose, activities, quiz)
     - Lesson 2: Archaeological Methods (1,571 lines - complete with Ötzi case study)
     - Lesson 3: Geography of Flavor (1,163 lines - climate zones, Alaska connection)
     - Lesson 4: Columbian Exchange Preview (1,134 lines - full teaser for Unit 10)
   - **Unit Essay:** Complete prompt, rubric (4 categories × 25 pts), sample essay (95/100)
   - **Hands-On Project:** Personal Food History Timeline (detailed instructions, rubrics)
   - **Unit Test:** 30 questions (20 MC, 6 short answer, 4 geography) with all answers
   - **Detail Level:** ZERO placeholders - every reading section is 800-1,200 words of written prose, all quiz questions have answers + explanations, all activities have complete instructions

3. **Unit 2 Complete Specification:** (UNIT-2-COMPLETE-SPECIFICATION.md) - 3,471 lines (Feb 7, 2026)
   - **Focus:** Hunter-Gatherers & Early Human Diets (2 million BCE - 10,000 BCE)
   - **4 Lessons:** Fire & cooking evolution, foraging diversity across continents, Ice Age eating, agriculture transition
   - **Unit Essay:** "Foragers vs. Farmers: Who Had It Better?" - 1,087-word sample scoring 94/100
   - **Hands-On Project:** Foraging Strategy Analysis with detailed rubric
   - **Unit Test:** 30 questions with complete answers and explanations
   - **Detail Level:** ZERO placeholders - full prose throughout

4. **Unit 3 Complete Specification:** (UNIT-3-COMPLETE-SPECIFICATION.md) - 3,730 lines (Feb 8, 2026)
   - **Focus:** The Agricultural Revolution (10,000-6,000 BCE across 6 continents)
   - **4 Lessons:** Why agriculture began, Fertile Crescent origins, global agricultural diversity, social transformation
   - **Unit Essay:** "Was the Agricultural Revolution Progress or Trap?" - 1,168-word sample scoring 96/100
   - **Hands-On Project:** Agricultural Origins Research Presentation with 30 topic options
   - **Unit Test:** 30 questions covering climate change, domestication, biogeography, social costs
   - **Detail Level:** ZERO placeholders - full prose throughout

5. **PROJECT-STATUS.md:** Comprehensive status dashboard (Feb 8, 2026)
   - Quick-reference table of all 20 units with completion status
   - Metrics: 13,946 lines / ~195,000 words complete (3/20 units = 15%)
   - Quality assurance checklist and implementation readiness tracking

### 🚧 In Progress
**Units 4-20 Specification:**
- Pattern established from Units 1-3 (full prose, complete quizzes, detailed activities, sample essays with grading)
- Each unit averages ~4,600 lines with exhaustive detail (shorter than initially estimated)
- Remaining: 17 units × ~4,600 lines = ~79,000 lines (~1.1M words)
- Timeline: 2-3 days per unit (specification phase)

### 📅 Next Steps
1. **Unit 4: Ancient Mesopotamia & Egypt** - Next up (Target: Feb 11-12, 2026)
2. **Unit 5: Ancient Greece & Rome** - Following Unit 4
3. **Systematically Complete Units 6-20** - One at a time, full specification
4. **Technical Implementation Begins** - After units specified (or rolling basis)
   - Database setup (1 week)
   - Frontend foundation (2 weeks)
   - Content seeding (2-3 weeks)
   - AI tutor integration (1 week)
   - Map system (1 week)
   - Interactive features (2 weeks)
   - Testing & polish (2 weeks)
   - **Total dev time:** ~3-4 months

### 📊 Project Metrics
- **Total Specification:** ~150,000 lines (when complete)
- **Unit 1 Word Count:** ~50,000 words
- **Total Estimated Word Count:** ~1,000,000 words
- **Purpose:** Provide Opus with step-by-step instructions so detailed that implementation requires zero creative extrapolation - solves the "90% placeholders" problem

---

# 📋 PHASE 1: FOUNDATION & STUDENT PROFILE

## 1.1 Student Overview: Timothy

### Demographics
- **Age:** 15
- **Grade:** Sophomore (10th grade)
- **Course Level:** Senior/College Freshman (advanced placement)
- **GPA:** 4.13
- **Location:** Rural Alaska (ingredient constraints)
- **Schooling:** Dual enrolled (public school + homeschool)

### Career Aspirations
- **Ultimate Goal:** Personal/private chef for billionaire clients
- **Quality Standard:** Michelin-star execution
- **Future Vision:** Possibly own Michelin-worthy restaurant (15+ years out)
- **Age Context:** He's 15 - dreams are appropriately distant and evolving

### Academic Profile

**Strengths:**
- Writing: College level (1.5 semesters completed) ⭐
- History: Natural strength ⭐
- Reading: College level
- Theater, Woodshop, Art: Excels/self-motivated
- Athletics: 3-sport letterman + elite powerlifter

**Critical Weakness:**
- **Geography: 2/10** ⚠️ MAJOR GAP
  - Thought India was in South America
  - Completed 2 geography courses (bad teaching)
  - **MUST REMEDY through food-based geography learning**

**Neutral:**
- Science: Capable but dislikes (not passionate, doesn't struggle)

### Culinary Profile

**Skills (As of Feb 2026):**
- Overall cooking: 8/10 (actually 3.5-4/10 knife skills - recalibrated)
- Basic cuts: ✓ | Advanced cuts: ✗
- Signature: Steak and simple dishes
- Frequency: 4x/week, 1-2 hours each
- Equipment: Professional knife set + leather roll

**Critical Gaps Identified:**
- Pasta creation (doesn't love eating pasta)
- Sauce work (needs serious attention)
- Foundational skills (mise en place, timing, coordination)
- Baking (getting okay, improving)

**Learning Journey:**
- Started cooking: Age 8
- Primary teacher: His father (close relationship)
- **TRANSFORMATIVE MOMENT:** Queens, NY food tour (Jan 2023, age 13)
  - Father-son experience
  - Diverse ethnic restaurants and cuisines
  - "Made this desire take a new life"
  - **CURRICULUM MODEL:** Replicate this experience globally/historically

### Learning Style

**Content Preferences:**
- ❤️ LOVES: Video, audio, interactive content
- 😐 TOLERATES: Short-form reading
- 😞 HATES: Long-form reading (major hurdle for history course!)

**Motivation Drivers:**
- Challenge-driven: **Harder = more engaged**
- Perfectionist: Very hard on himself
- Intellectually curious: Wants to understand WHYs as much as HOWs
- Self-directed: Contacts Michelin chefs on Instagram independently
- Growth-focused: Inspired by possibility of improvement

**Project Preferences:**
- Open-ended creative work
- Real-world applicable
- Choice and flexibility
- Visible progress tracking
- Clear end goals

### Core Values & Philosophy

**Excellence & Perfectionism:**
- High personal standards
- Zero tolerance for mediocrity
- Michelin-level aspirations

**Innovation + Authenticity:**
- Wants to innovate (creative)
- Values authenticity (respectful of traditions)
- Perfect tension for food history learning

**Service-Oriented:**
- "Create something great for people he works with"
- Hospitality mindset
- Making others happy through food

**Intellectual Depth:**
- Not satisfied with just technique
- Needs to understand cultural context, historical evolution
- Knowledge as foundation for excellence

### Family Context

**Father-Son Dynamic:**
- Dad is primary cooking teacher
- Close relationship, mentored learning
- Dad knows food, history passionate
- Family values education and excellence

**Available Time:**
- 30+ hours/week available for coursework
- 3-sport athlete + powerlifting (time management skills)
- Cooks 4-8 hours/week already

### Constraints & Considerations

**Rural Alaska Reality:**
- Some ingredients hard to access
- Fresh seafood limited despite coastal proximity
- Need alternatives for exotic ingredients
- Can't rely on specialty stores

**Course Balance:**
- Kitchen work: 15-25% of curriculum (NOT culinary school)
- Focus: Understanding WHYs (history/geography/culture)
- Assessment: Knowledge > execution

---

## 1.2 Core Curriculum Requirements

### Academic Credits
- **Primary:** History/Social Studies credit
- **Secondary:** Elective credit (culinary focus)
- **Duration:** 1-2 academic years
- **Pace:** 2-3 weeks per unit (20 units total)

### The ⅓ + ⅓ + ⅓ Balance

**⅓ World History:**
- Pre-agricultural era → modern day (10,000+ years)
- Agricultural revolution, ancient civilizations, trade routes
- Industrial revolution, globalization, contemporary movements
- Historical analysis, primary sources, essay writing

**⅓ World Geography:**
- **PRIMARY REMEDIATION FOCUS**
- 6 populated continents comprehensive coverage
- Map work in EVERY unit (labeling, trade routes, regions)
- Ingredient origins, regional specialties, climate influence
- Geography weakness → strength through food passion

**⅓ Food/Culinary:**
- Evolution of cuisines and techniques
- Cultural significance of food traditions
- **NOT chef training** - contextual understanding
- "Why does this cuisine exist here?" thinking

### Pedagogical Framework (40-30-30 Model)

**40% Reading & Research:**
- Historical texts, articles, primary sources
- **Challenge:** Timothy hates long-form reading
- **Solution:** Chunk reading into digestible segments, supplement heavily with video
- Essay writing per unit (college-level expectations)

**30% Video Learning:**
- YouTube documentaries and cooking demonstrations
- Cultural food explorations and chef interviews
- Historical recreations and archaeological evidence
- Chef techniques and regional cuisine tours

**30% Gamified/Interactive:**
- Quizzes (knowledge retention)
- Map labeling and trade route exercises
- Interactive timelines and comparison charts
- Hands-on projects (adapted for Alaska constraints)

### Assessment Strategy

**Per Lesson (4-5 lessons per unit):**
- Multiple-choice quiz (10-15 questions, auto-graded)
- Short answer questions (2-3, AI-assisted evaluation)
- Map/geography work (identify regions, trace routes)

**Per Unit:**
- Comprehensive essay (500-1000 words, parent-graded)
- Hands-on project (variety of types - see Phase 2)
- Unit test (combines MC + short answer + geography)

**Final Capstone (Unit 20):**
- Multi-course menu with historical research for each dish
- Business plan/concept for personal chef service
- Comprehensive portfolio showcasing learning
- Presentation component (video or live)

---

## 1.3 Geography Remediation Strategy

### The Problem
- Current level: 2/10 (thought India was in South America!)
- Completed 2 high school courses (ineffective teaching)
- Traditional geography instruction has failed
- MUST succeed through food-based learning

### The Solution: Food as Geography Hook

**Every Unit Must Include:**

1. **Map Work (Mandatory)**
   - Identify and label countries/regions covered
   - Mark major cities, geographic features
   - Trace trade routes and ingredient journeys
   - Color-code climate zones affecting cuisine

2. **Ingredient Origin Mapping**
   - "Where does this come from?" for key ingredients
   - Agricultural zones and growing conditions
   - Historical spread (e.g., tomatoes: Americas → Europe → global)

3. **Regional Distinctions**
   - Northern vs. Southern variations within countries
   - Coastal vs. inland cuisine differences
   - Mountain vs. plains agricultural products
   - Desert vs. rainforest food systems

4. **Trade Route Deep-Dives**
   - Silk Road spice movement
   - Columbian Exchange visualization
   - Maritime spice trade (Indian Ocean, Mediterranean)
   - Modern global food supply chains

5. **Comparative Geography**
   - Why do similar climates produce similar cuisines?
   - How does geography limit/enable certain foods?
   - Impact of latitude on growing seasons
   - Rivers, rainfall, and agricultural development

### Progress Tracking
- Geography quiz component in EVERY lesson
- Map completion portfolio builds throughout course
- Before/after assessment (Unit 1 vs. Unit 20)
- Target: 2/10 → 8+/10 by course completion

---

# 📚 PHASE 2: PEDAGOGICAL DESIGN

## 2.1 Content Delivery Methods

### Reading Materials (40%)

**Types:**
- Curated articles (1000-2000 words per lesson)
- Primary source excerpts (ancient texts, historical recipes)
- Modern food history scholarship
- Chef interviews and culinary philosophy pieces

**Delivery Strategy:**
- Break into 3-4 sections with checkpoints
- Embedded comprehension questions
- AI tutor available for clarification
- Highlight key terms (hover for definitions)
- Estimated reading time displayed

**Addressing Timothy's Reading Aversion:**
- Keep articles focused and purposeful
- Always connect to bigger picture (WHY this matters)
- Pair with engaging visuals and videos
- Allow audio narration option (text-to-speech)
- Make reading "optional but beneficial" where video covers same content

### Video Content (30%)

**Required Videos per Lesson:**
- 1 main documentary/educational (10-20 min)
- 1-2 supplementary videos (5-10 min each)
- Optional deep-dive content for interested students

**Content Categories:**
- Historical documentaries (archaeology, ancient civilizations)
- Cooking demonstrations (techniques in cultural context)
- Chef interviews and philosophy
- Travel/food culture explorations
- Scientific explanations (fermentation, preservation, etc.)

**Sources to Curate:**
- YouTube: Tasting History, Chef's Table, History Channel
- Cooking channels: Binging with Babish, J. Kenji López-Alt
- Cultural channels: Mark Wiens, Best Ever Food Review Show
- Academic: Smithsonian, National Geographic, BBC

**Implementation:**
- Embedded directly in app (YouTube API)
- Progress tracking (watched / not watched)
- Can't skip ahead without watching
- Discussion prompts after each video

### Interactive/Gamified Content (30%)

**Quiz Types:**
- Multiple choice (immediate feedback)
- True/False (with explanations)
- Matching (ingredients to regions, techniques to cultures)
- Fill-in-the-blank (geography, dates, key terms)
- Drag-and-drop (timeline ordering, map labeling)

**Interactive Maps:**
- Click regions to learn about cuisine
- Trace trade routes (animated)
- Layer toggles (agriculture, climate, political boundaries)
- Zoom levels (continent → country → region → city)

**Gamification Elements:**
- Points for completed activities
- Badges for milestones (unit completion, perfect quizzes)
- Progress bars (visual motivation)
- Streak tracking (consecutive days active)
- Unlockable content (advanced videos, bonus recipes)

**Challenges:**
- "Geography Master" - perfect scores on all map quizzes
- "Speed Reader" - complete all readings in optimal time
- "Perfectionist" - 100% on all assessments (appeals to Timothy!)
- "Globe Trotter" - visit all 6 continents in curriculum

---

## 2.2 Assessment Framework

### Lesson-Level Assessment

**Quiz Structure:**
- 10-15 multiple choice questions
- 2-3 short answer (1-2 sentences each)
- 1-2 geography questions (map-based)
- Passing: 80% (allows re-takes)
- Time estimate: 10-15 minutes

**Auto-Grading:**
- MC: Instant feedback with explanations
- Geography: Coordinate-based checking
- Short answer: AI evaluation with rubric
  - Keyword detection
  - Concept understanding check
  - Flag for parent review if uncertain

**Immediate Feedback:**
- Correct answers: Reinforcement + "why"
- Incorrect: Explanation + link to review content
- Partial credit available on short answers

### Unit-Level Assessment

**Essay Component:**
- Prompt provided (analysis, comparison, or argument)
- Length: 500-1000 words
- College-level expectations
- Submission via text editor in app
- Rubric provided upfront
- Parent grades using provided rubric
- AI tutor can help with brainstorming (NOT writing)

**Example Essay Prompts:**
- "Compare agricultural revolutions in three different regions. How did geography influence development?"
- "Analyze the Columbian Exchange's impact on at least 4 cuisines across 3 continents."
- "Argue for or against: The spice trade was the primary driver of early globalization."

**Hands-on Project (See Section 2.3):**
- Variety of types to maintain engagement
- Submitted via photo/file upload
- Reflection component (what did you learn?)
- Connects theory to practice

**Unit Test:**
- 25-30 questions (mix of MC and short answer)
- Comprehensive (covers all lessons in unit)
- Geography section (10+ questions)
- Passing: 80%
- Review mode available before test

### Final Capstone (Unit 20)

**Components:**
1. **Multi-Course Menu Design:**
   - 5-7 courses representing different historical periods/regions
   - Historical research paragraph for each dish
   - Ingredient sourcing plan (Alaska-feasible)
   - Plating/presentation concepts

2. **Personal Chef Business Concept:**
   - Target clientele definition
   - Service model (in-home, meal prep, events?)
   - Menu philosophy rooted in food history learning
   - Unique selling proposition (what makes Timothy different?)

3. **Learning Portfolio:**
   - Best essays from units
   - Completed maps and timelines
   - Project photos/artifacts
   - Reflection on growth (especially geography!)

4. **Presentation:**
   - Video recording (10-15 min) OR
   - Live presentation to family
   - Synthesizes learning across all 20 units
   - Demonstrates how history informs modern cooking

---

## 2.3 Hands-On Project Types

### The Challenge
Rural Alaska + limited ingredient access = need creative alternatives to "cook this authentic dish" projects

### Project Variety (Mix Throughout 20 Units)

**1. Infographic Design (4-5 units)**
- **Tool:** Canva (free tier)
- **Examples:**
  - "Columbian Exchange: Food Flow Chart"
  - "Spice Route Timeline"
  - "Regional Rice Varieties of Asia"
  - "Medieval Food Preservation Methods"
- **Deliverable:** PNG/PDF upload, 1-page reference
- **Learning:** Visual synthesis, typography, information architecture
- **Benefit:** Creates study materials Timothy can use forever

**2. Interactive Map Creation (3-4 units)**
- **Tool:** Google My Maps or hand-drawn + labeled
- **Examples:**
  - "Silk Road Trade Route with stops and goods"
  - "Indigenous American Agricultural Origins"
  - "Mediterranean Triad Distribution"
- **Deliverable:** Shareable link or photo of detailed map
- **Learning:** Geography mastery, spatial reasoning
- **Benefit:** Directly addresses geography weakness

**3. Historical Research Report (2-3 units)**
- **Format:** 3-5 page illustrated report
- **Examples:**
  - "The History of Bread: Egypt to Modern Day"
  - "How Coffee Conquered the World"
  - "The Evolution of Fermentation Techniques"
- **Deliverable:** PDF with images and citations
- **Learning:** Research skills, writing, historical analysis
- **Benefit:** Portfolio piece for college applications

**4. Cooking Project (Alaska-Adapted) (4-5 units)**
- **Approach:** Use available ingredients, focus on technique
- **Examples:**
  - "Bread Through History" - bake 3 types (flatbread, leavened, sourdough)
  - "Preservation Methods" - pickle, salt-cure, or dry something
  - "Sauce Master Class" - create 3 mother sauces (with available ingredients)
  - "Ancient Grains" - cook with quinoa, barley, or other accessible grains
- **Deliverable:** Process photos + final dish + written reflection
- **Learning:** Hands-on technique, connecting history to practice
- **Benefit:** Builds actual cooking skills

**5. Comparative Analysis Chart (2-3 units)**
- **Format:** Detailed table or visual comparison
- **Examples:**
  - "Chinese vs. French Sauce Philosophy"
  - "Mesoamerican vs. Asian Rice Cultures"
  - "Medieval European vs. Islamic Golden Age Cuisine"
- **Deliverable:** Chart/table with analysis paragraph
- **Learning:** Critical thinking, pattern recognition, synthesis
- **Benefit:** Develops analytical skills

**6. Timeline Creation (2-3 units)**
- **Tool:** Digital (Canva, Google Slides) or physical poster
- **Examples:**
  - "Agricultural Revolution Timeline: 5 Continents"
  - "Spice Trade: 3000 BCE to Present"
  - "Evolution of Restaurant Culture"
- **Deliverable:** Visual timeline with dates, images, descriptions
- **Learning:** Chronological thinking, visual design
- **Benefit:** Study tool and portfolio piece

**7. Video Documentary (1-2 units)**
- **Format:** 5-10 minute video essay
- **Examples:**
  - "Food in My Region: Alaska's Indigenous and Modern Cuisine"
  - "The Journey of a Spice: From Origin to My Kitchen"
  - "Interviewing Dad: Our Family's Food History"
- **Deliverable:** Video file upload
- **Learning:** Multimedia storytelling, presentation skills
- **Benefit:** Portfolio piece, exercises communication skills

### Project Selection Strategy
- Unit 1-5: Focus on maps and infographics (build foundational skills)
- Unit 6-10: Introduce cooking projects (technique focus)
- Unit 11-15: Mix of research, cooking, and comparative analysis
- Unit 16-19: Advanced projects (video, comprehensive research)
- Unit 20: Capstone synthesis

---

## 2.4 AI Tutor Integration

### Philosophy
An AI tutor should **guide, not give answers**. Think Socratic method: ask leading questions, prompt deeper thinking, encourage discovery.

### Technical Implementation

**Model Selection:**
- **Primary:** GPT-5.2 (`gpt-5.2`) or Claude Opus 4.6 (`claude-opus-4.6`)
- **Reasoning:** Latest, most capable, best at nuanced guidance
- **Context:** Up to 200K tokens (can hold entire unit + student history)
- **Cost:** Acceptable for family use, high-quality experience priority

**System Prompt (Tutor Personality):**
```
You are a knowledgeable, encouraging food history tutor working with Timothy, a 15-year-old aspiring chef who is learning about world food history, geography, and culinary traditions.

ABOUT TIMOTHY:
- Sophomore, highly intelligent (4.13 GPA), college-level reader/writer
- Aspires to be a Michelin-star personal chef
- Geography weakness (2/10) - use every opportunity to reinforce geographic concepts
- Loves challenge, hates being talked down to
- Perfectionist who wants to understand WHYs deeply
- From rural Alaska, father teaches him cooking

YOUR ROLE:
- Guide, don't give answers directly
- Ask Socratic questions that lead to discovery
- Connect concepts to his chef aspirations when relevant
- Reinforce geography constantly ("Where is that?" "What continent?")
- Celebrate effort and growth mindset
- Be enthusiastic about food history - it's fascinating!

WHAT YOU CANNOT DO:
- Write essays or complete assignments for him
- Give direct answers to quiz/test questions
- Do his thinking for him
- Let him paste questions and get easy answers

WHAT YOU SHOULD DO:
- Help him understand difficult concepts by breaking them down
- Suggest connections between units or historical periods
- Clarify confusing readings with examples
- Encourage him to explore further (videos, sources)
- Remind him of prior learning when relevant
- Ask "Where do you think...?" and "Why might...?" questions

TONE: Enthusiastic mentor, not lecturing professor. Treat him as intelligent peer learning something new, not a child.
```

### Context Awareness

**Tutor Knows:**
- Current unit and lesson
- Timothy's complete profile (from Phase 1)
- His progress (units completed, quiz scores, weak areas)
- Geography focus areas needing reinforcement
- Previous conversations this session
- Recent struggles or questions

**Tutor Has Access To:**
- Lesson content (to reference specifics)
- Quiz questions (but won't give answers)
- Assignment prompts (to help brainstorm, not complete)
- Maps and visual references (to discuss geography)

### Guardrails Against Cheating

**Technical Measures:**
1. **Disabled During Assessments:**
   - No AI tutor button on quiz/test pages
   - Can't ask for answers in real-time
   - Re-enabled after submission

2. **Prompt Detection:**
   - If student pastes essay prompt: "I can help you brainstorm and outline, but I can't write this for you. What are your initial thoughts?"
   - If student asks quiz question: "I can explain the concept, but I can't give you the answer directly. Which part is confusing?"

3. **Answer Refusal Training:**
   - System prompt explicitly forbids direct answers
   - Redirect to Socratic questioning
   - If repeatedly pressed, escalate to parent notification

4. **Conversation Logging:**
   - All tutor interactions saved
   - Parent can review conversations
   - Flags if student asks same question 10+ times (fishing for answers)

**Pedagogical Measures:**
1. **Socratic Method:**
   - Always respond with questions first
   - "What do you think?" before "Here's the answer"
   - Build on student's partial understanding

2. **Concept Explanation Only:**
   - Explain the historical context behind a question
   - Break down vocabulary or complex terms
   - Provide analogies and examples
   - Never state the specific answer

3. **Growth Mindset Reinforcement:**
   - Praise effort and reasoning process
   - Normalize struggle ("This is a hard concept!")
   - Encourage persistence and curiosity

### UI/UX for AI Tutor

**Placement:**
- Floating button (bottom-right corner, all pages except assessments)
- Icon: Chat bubble with "?" or friendly robot icon
- Click opens sidebar chat interface

**Chat Interface:**
- Student message on right (blue)
- Tutor message on left (green)
- Clear, readable font
- Markdown support (for formatting, lists, emphasis)
- Scroll to keep latest messages visible

**Features:**
- "Start New Conversation" button (clears context for fresh start)
- "I'm stuck on..." quick prompts
- "Explain this concept:" auto-fills
- Voice input option (accessibility + convenience)
- Message history saved per session

**Conversation History:**
- Saved in database (per student)
- Searchable ("Did I ask about spices before?")
- Parent dashboard shows summary (# messages, topics discussed)
- Export conversation option (for review or portfolio)

---

# 🗺️ PHASE 3: CONTENT ARCHITECTURE (20 Units)

## 3.1 Unit Structure Template

### Standard Unit Format

**Unit Title**
**Geographic Focus:** Continent(s) covered
**Historical Era:** Time period
**Duration:** 2-3 weeks (10-15 hours total)
**Credits:** History + Geography + Culinary

**Learning Objectives:**
- Historical understanding goal
- Geographic mastery goal
- Culinary/food culture goal
- Skills developed (writing, analysis, map reading)

**Lesson Breakdown:**
1. Lesson 1: [Topic] + Quiz
2. Lesson 2: [Topic] + Quiz
3. Lesson 3: [Topic] + Quiz
4. Lesson 4: [Topic] + Quiz
5. Lesson 5: [Topic] + Quiz (if needed)

**Hands-On Project:** [Type from 2.3 taxonomy]

**Unit Essay:** [Prompt provided]

**Unit Test:** Comprehensive assessment

**Geography Focus:** Specific map work and regions emphasized

**Video Playlist:** Curated 5-8 videos

**Reading List:** 4-6 articles/excerpts per lesson

---

## 3.2 Complete 20-Unit Scope & Sequence

### UNIT 1: Introduction to Food History & Methodology
**Geographic Focus:** Global overview
**Era:** All periods (survey)
**Duration:** 2 weeks

**Learning Objectives:**
- Understand food as lens for history, geography, and culture
- Learn archaeological methods for studying ancient diets
- Identify how geography shapes cuisine (climate, terrain, resources)
- Preview major themes: trade, agriculture, technology, globalization

**Lessons:**
1. **What is Food History?** - Defining the field, why it matters, connections to geography and culture
2. **Archaeological Evidence** - How we know what ancient people ate (coprolites, pollen, residues, tools)
3. **Geography of Flavor** - How climate zones, terrain, and resources determine regional cuisines
4. **Preview: The Columbian Exchange** - Introduction to greatest food transformation in history

**Hands-On Project:** Create a "Personal Food History Timeline" - map your own food journey + family food traditions

**Unit Essay:** "Why does studying food history matter? Connect to at least 3 other academic disciplines."

**Geography Focus:**
- Label world map with major climate zones
- Identify 6 inhabited continents
- Basic latitude/longitude understanding
- Agricultural vs. non-agricultural regions

**Videos:**
- "The Story of Food" documentary intro
- Archaeological food discoveries (Pompeii, Egyptian tombs)
- Climate zones and agriculture explained
- Brief Columbian Exchange overview (teaser)

---

### UNIT 2: Hunter-Gatherers & Early Human Diets
**Geographic Focus:** Africa (origins), Global expansion
**Era:** 2 million BCE - 10,000 BCE
**Duration:** 2-3 weeks

**Learning Objectives:**
- Understand pre-agricultural human eating patterns
- Trace human migration out of Africa through food evidence
- Recognize impact of fire on human development and diet
- Compare foraging strategies across different environments

**Lessons:**
1. **The First Cooks** - Discovery of fire, cooking's role in human evolution, advantages of cooked food
2. **Foraging Diets Across Continents** - What did hunter-gatherers eat in Africa, Europe, Asia, Americas, Oceania?
3. **Ice Age Eating** - Megafauna hunting, adaptation to cold climates, tool development
4. **Why Agriculture Changed Everything** - Setup for next unit, limitations of foraging, population pressures

**Hands-On Project:** Infographic - "Hunter-Gatherer Diets: 6 Continents Comparison" (foods available, tools used, survival strategies)

**Unit Essay:** "How did geography determine what hunter-gatherers could eat? Use examples from at least 3 continents."

**Geography Focus:**
- Map human migration out of Africa
- Ice age geography (land bridges, ice sheets)
- Identify regions with different foraging resources
- Africa detailed map (where humanity began)

**Videos:**
- Human evolution and cooking
- Archaeological sites (Göbekli Tepe, ancient campsites)
- Modern hunter-gatherer groups (respectful documentation)
- Fire technology and its impacts

---

### UNIT 3: The Agricultural Revolution
**Geographic Focus:** Fertile Crescent, China, Mesoamerica, Sub-Saharan Africa, Andes
**Era:** 10,000 - 6,000 BCE
**Duration:** 3 weeks

**Learning Objectives:**
- Understand independent origins of agriculture (at least 5 centers)
- Explain domestication of plants and animals
- Analyze how agriculture enabled civilization
- Compare nutritional changes from foraging to farming

**Lessons:**
1. **The Fertile Crescent** - Wheat, barley, legumes; first farmers; Mesopotamia rise
2. **Rice Cultures of Asia** - China and Southeast Asia rice domestication, wet vs. dry rice farming
3. **The Three Sisters** - Mesoamerican agriculture (maize, beans, squash), ingenious companion planting
4. **African & Andean Agriculture** - Yams, sorghum, millet in Africa; potatoes, quinoa in Andes
5. **Why Agriculture Spread** - Advantages, disadvantages, and the point of no return

**Hands-On Project:** Interactive Map - "Global Centers of Agriculture" with crops domesticated, dates, and why these locations

**Unit Essay:** "Compare agricultural development in two different regions. How did geography influence what was domesticated?"

**Geography Focus:**
- **CRITICAL UNIT FOR GEOGRAPHY REMEDIATION**
- Detailed maps of Fertile Crescent, China, Mesoamerica, Sub-Saharan West Africa, Andes
- Climate and terrain of each region
- Label modern countries in these areas (Iraq, Syria, Turkey, China, Mexico, Guatemala, Peru, Ghana, Nigeria)
- River systems crucial to agriculture (Tigris-Euphrates, Yellow River, etc.)

**Videos:**
- "Seeds of Civilization" documentary
- Wheat domestication explanation
- Rice cultivation methods (ancient and modern)
- Indigenous American agriculture (Three Sisters, milpa system)

---

### UNIT 4: Ancient Mesopotamia & Egypt
**Geographic Focus:** Middle East, North Africa (Fertile Crescent, Nile Valley)
**Era:** 3500-500 BCE
**Duration:** 2-3 weeks

**Learning Objectives:**
- Understand food systems in early civilizations
- Recognize role of surplus in enabling specialization
- Compare Egyptian and Mesopotamian cuisines and agriculture
- Analyze social hierarchy through food access

**Lessons:**
1. **Beer Before Bread?** - Mesopotamian brewing, grain surplus, beer as wages and ritual
2. **The Nile's Bounty** - Egyptian agriculture dependent on annual floods, food preservation
3. **Royal Feasts & Worker's Rations** - Food and class in ancient civilizations, recipes from tablets
4. **Early Trade** - Spices and luxury goods entering Near East (cinnamon, cassia)

**Hands-On Project:** Ancient Recipe Reconstruction - Research a Mesopotamian or Egyptian recipe, source Alaska-available ingredients, cook (or design) and document

**Unit Essay:** "How did food systems enable civilization? Use Mesopotamia and/or Egypt as examples."

**Geography Focus:**
- Fertile Crescent detailed map (Tigris, Euphrates, Assyria, Babylon, Sumer)
- Egypt map (Upper and Lower Egypt, Nile cataracts, Mediterranean coast)
- Trade routes to India, Arabia, East Africa
- Modern countries: Iraq, Syria, Turkey, Egypt, Sudan

**Videos:**
- Mesopotamian beer brewing recreation
- Egyptian food preservation techniques
- Archaeological evidence from tombs and tablets
- Ancient baking: bread in clay ovens

---

### UNIT 5: Ancient Greece & Rome
**Geographic Focus:** Southern Europe, Mediterranean basin
**Era:** 800 BCE - 500 CE
**Duration:** 2-3 weeks

**Learning Objectives:**
- Understand the "Mediterranean Triad" (wheat, olive, grape)
- Compare Greek simplicity with Roman excess
- Study garum and fermentation/preservation methods
- Analyze agricultural texts (Cato, Columella) as historical sources

**Lessons:**
1. **Greek Food Philosophy** - Simplicity, balance, symposiums, influence of geography (mountains, islands)
2. **Roman Feasts** - Excess and innovation, exotic imports, cookbooks (Apicius), banquet culture
3. **Garum: Fish Sauce Empire** - Production, trade, umami before the word existed, comparison to Asian fish sauces
4. **Agriculture as Empire** - Roman farming manuals, latifundia, slave labor, food distribution across empire

**Hands-On Project:** Comparative Analysis Chart - "Greek vs. Roman Food Culture" (philosophy, ingredients, typical meals, class differences)

**Unit Essay:** "How did geography shape Greek and Roman cuisines differently? Consider terrain, climate, and Mediterranean access."

**Geography Focus:**
- Greece: mainland, Peloponnese, islands, Athens, Sparta, colonies
- Roman Empire at height: all territories bordering Mediterranean
- Trade routes: to Egypt, Near East, Gaul, Britannia, North Africa
- Modern countries: Greece, Italy, Turkey, Spain, France, Egypt, Tunisia, etc.

**Videos:**
- Greek olive oil production (ancient and modern)
- Roman banquet recreation
- Garum production (modern recreation)
- Archaeological sites: Pompeii kitchens

---

### UNIT 6: Ancient Asia - China & India
**Geographic Focus:** East Asia, South Asia
**Era:** 2000 BCE - 500 CE
**Duration:** 3 weeks

**Learning Objectives:**
- Compare rice-based (South) vs. wheat-based (North) Chinese cuisines
- Understand Chinese food philosophy (Five Flavors, Yin/Yang)
- Study Ayurvedic principles and food as medicine
- Trace early Silk Road spice trade origins

**Lessons:**
1. **Chinese Food Philosophy** - Five Flavors, balance, Daoist and Confucian influences, regional variations (Sichuan, Cantonese)
2. **The Silk Road Begins** - Early spice and luxury trade, connecting East and West, cultural exchange via food
3. **Vedic Cuisine & Ayurveda** - Indian food as medicine, six tastes, vegetarianism, regional specialties
4. **The Birth of Tea Culture** - Tea origins in China, preparation methods, social significance, spread to Japan and beyond

**Hands-On Project:** Infographic - "Chinese Five Flavors Philosophy vs. Ayurvedic Six Tastes" (compare/contrast with examples)

**Unit Essay:** "How do Chinese and Indian food philosophies reflect broader cultural values? Analyze at least 2 principles from each tradition."

**Geography Focus:**
- **China:** Detailed map with provinces, Yellow River, Yangtze River, North vs. South divisions, Silk Road route
- **India:** Subcontinent geography, Indus Valley, Ganges, regions (North, South, West, East), spice-growing areas
- Modern context: China, India, Pakistan, Bangladesh
- Silk Road: Xi'an to Mediterranean route

**Videos:**
- "Search for General Tso" - Chinese regional cuisines
- Tea ceremony origins and philosophy
- Ayurvedic cooking demonstrations
- Silk Road documentary series (relevant episode)

---

### UNIT 7: Pre-Columbian Americas
**Geographic Focus:** North, Central, South America
**Era:** 1000 BCE - 1500 CE
**Duration:** 3 weeks

**Learning Objectives:**
- Understand maize, potato, quinoa domestication and impact
- Compare Inca, Aztec, Maya, and North American Indigenous food systems
- Study cacao's ceremonial and economic role
- Recognize sophistication of pre-contact agriculture

**Lessons:**
1. **The Maize Cultures** - Maya, Aztec, and beyond; nixtamalization, city-states, chocolate as currency
2. **Potato Paradise** - Incan agriculture, terracing, 4000+ potato varieties, freeze-drying (chuño), vertical farming
3. **North American Indigenous Foodways** - Three Sisters across regions, salmon cultures (Pacific NW), bison (Plains), wild rice (Great Lakes)
4. **Cacao: From Sacred Drink to Global Obsession** - Pre-Columbian chocolate (bitter, spiced), ceremonial use, eventual European transformation

**Hands-On Project:** Interactive Map - "Indigenous American Agriculture: Origins and Spread" (map where maize, potatoes, tomatoes, peppers, cacao, beans, squash originated, plus modern global spread)

**Unit Essay:** "How did Indigenous Americans develop sophisticated food systems without Old World animals and technologies? Choose 2+ examples."

**Geography Focus:**
- Mesoamerica: Mexico, Guatemala, Belize, Honduras (Maya/Aztec territories)
- Andes: Peru, Bolivia, Ecuador (Inca empire)
- North America: Regions and tribal territories (acknowledge indigenous land sovereignty)
- Agricultural zones and climate variations
- Modern impact: Where do these crops grow today?

**Videos:**
- "The Story of Maize" documentary
- Incan agricultural terraces and innovations
- Traditional nixtamalization process
- Pre-Columbian chocolate preparation

---

### UNIT 8: Medieval Europe
**Geographic Focus:** Western & Eastern Europe
**Era:** 500-1500 CE
**Duration:** 2-3 weeks

**Learning Objectives:**
- Understand feudal food systems (peasant vs. noble diets)
- Study monastic contributions (brewing, cheesemaking, preservation)
- Analyze spice trade's influence on European desire for exploration
- Examine preservation techniques (smoking, salting, fermentation)

**Lessons:**
1. **Peasant Food vs. Noble Feasts** - Class divisions, pottage vs. elaborate banquets, food as status symbol
2. **Monasteries: Brewing, Cheese & Preservation** - Monks as agricultural innovators, Trappist brewing, cheese varieties
3. **The Spice Trade: Why Europeans Wanted More** - Exotic flavors, preservation, medicine, demand driving exploration
4. **Medieval Kitchen Technology** - Hearths, roasting spits, bread ovens, limited temperature control

**Hands-On Project:** Cooking Project - "Medieval Bread Baking" (research medieval bread types, bake one using Alaska ingredients, compare to modern bread)

**Unit Essay:** "How did the spice trade shape European history and eventually lead to the Age of Exploration? Why were spices so valuable?"

**Geography Focus:**
- Europe detailed: Western, Eastern, Northern, Southern regions
- Medieval kingdoms and trade cities
- Overland spice routes from Asia through Middle East to Europe
- Maritime routes (Venice, Genoa dominance)
- Modern countries of Europe

**Videos:**
- Medieval feast recreation
- Monastic brewing traditions
- Spice trade routes animation
- Castle kitchens and technology

---

### UNIT 9: Islamic Golden Age & Middle Eastern Cuisine
**Geographic Focus:** Middle East, North Africa, Iberia (Al-Andalus)
**Era:** 600-1500 CE
**Duration:** 2-3 weeks

**Learning Objectives:**
- Recognize agricultural innovations during Islamic expansion
- Understand Persian influences on Islamic cuisine
- Study coffee culture origins and spread
- Analyze medieval Arab cookbooks as primary sources

**Lessons:**
1. **Persian Influences** - Sassanid cuisine, rice pilaf, nuts and fruits in savory dishes, culinary sophistication
2. **Agricultural Revolution** - Crop diffusion across Islamic world (citrus, rice, sugarcane, eggplant, spinach), irrigation innovations
3. **The Rise of Coffee Culture** - Coffee origins (Ethiopia), spread through Yemen, coffeehouses as social hubs, Ottoman influence
4. **Medieval Arab Cookbooks** - Baghdad cookbooks (10th-13th century), documenting court cuisine, recipe sophistication

**Hands-On Project:** Historical Research Report - "The Journey of Coffee: From Ethiopia to the World" (3-5 pages with maps, timeline, cultural impact)

**Unit Essay:** "How did the Islamic Golden Age contribute to global food culture? Discuss agriculture, trade, and culinary innovations."

**Geography Focus:**
- Islamic world at height: Middle East, North Africa, Central Asia, Iberia
- Baghdad, Cairo, Damascus, Cordoba as centers
- Coffee belt: Ethiopia, Yemen
- Agricultural regions transformed by Islamic farming techniques
- Modern countries: Saudi Arabia, Yemen, Iraq, Iran, Morocco, Spain

**Videos:**
- Islamic architecture and agricultural systems
- Traditional coffee ceremony (Ethiopian or Yemeni)
- Historical recreation of medieval Arab dishes
- Al-Andalus culinary heritage

---

### UNIT 10: Age of Exploration & The Columbian Exchange
**Geographic Focus:** Global (emphasizing Atlantic exchange)
**Era:** 1492-1700
**Duration:** 3 weeks (CRITICAL UNIT)

**Learning Objectives:**
- Comprehensively understand the Columbian Exchange
- Analyze impact on all continents (demographics, agriculture, cuisine)
- Study slave trade's devastating impact and food connections
- Trace New World crops transforming Old World cuisines

**Lessons:**
1. **1492: The World's Menu Changes Forever** - What crossed Atlantic (plants, animals, diseases), immediate and long-term impacts
2. **Tomatoes, Potatoes & Corn Conquer Europe** - Initial suspicion, eventual acceptance, transformation of Italian, Irish, Eastern European cuisines
3. **Sugar, Slavery & The Atlantic Trade** - Plantation economics, slave trade triangle, Caribbean and Brazilian sugar production, moral reckoning
4. **Chili Peppers: From Mexico to India to China** - How New World crop became synonymous with Asian cuisines, regional adaptations
5. **Global Food System Emerges** - Beginning of modern globalized food supply, colonial extraction, lasting inequalities

**Hands-On Project:** Comprehensive Infographic - "The Columbian Exchange FlowChart" (Visually show everything that crossed, both directions, impacts on cuisines)

**Unit Essay:** "The Columbian Exchange transformed global cuisine. Analyze its impact on at least 3 cuisines across 3 continents, considering both benefits and harms."

**Geography Focus:**
- **MOST GEOGRAPHY-INTENSIVE UNIT**
- Detailed Atlantic Ocean trade routes
- Americas: regions of origin for each major crop
- Europe: where New World crops spread
- Africa: slave trade ports and devastation
- Asia: arrival and adoption of American crops
- All continents interconnected for first time

**Videos:**
- "1491" documentary (Americas before Columbus)
- Columbian Exchange animated explainer
- Slave trade historical documentation (age-appropriate, honest)
- How tomatoes reached Italy, potatoes reached Ireland, etc.

---

### UNIT 11: Sub-Saharan African Foodways
**Geographic Focus:** Sub-Saharan Africa (West, East, Southern regions)
**Era:** Ancient to Early Modern
**Duration:** 2-3 weeks

**Learning Objectives:**
- Understand regional diversity of African cuisines
- Study indigenous crops and techniques (yams, teff, sorghum, millet)
- Trace African diaspora food influences (to Americas, Caribbean)
- Recognize oral traditions in preserving food knowledge

**Lessons:**
1. **West African Food Traditions** - Jollof rice, fufu, groundnut stew; importance of yams; cultural significance of food
2. **East African Coast: Swahili Cuisine & Trade** - Indian Ocean trade, spice influences, Zanzibar, coastal vs. inland differences
3. **Southern Africa: Indigenous & Colonial Fusion** - Traditional foods, impact of colonization, development of distinctive regional cuisines
4. **African Diaspora: From Africa to the Americas** - Foods enslaved Africans brought/recreated, influence on Southern US, Caribbean, Brazilian cuisines

**Hands-On Project:** Comparative Analysis Chart - "Regional African Cuisine Diversity: West, East, Southern" (staples, techniques, major dishes, influences)

**Unit Essay:** "How did the African diaspora influence food cultures in the Americas? Trace specific ingredients or techniques."

**Geography Focus:**
- West Africa: Ghana, Nigeria, Senegal, Mali (yam belt, rice-growing regions)
- East Africa: Kenya, Tanzania, Ethiopia, coastline and Swahili culture
- Southern Africa: South Africa, Zimbabwe, Mozambique
- Trade routes: Trans-Saharan, Indian Ocean maritime
- Diaspora destinations: Caribbean, US South, Brazil

**Videos:**
- West African cooking demonstrations (jollof rice debate!)
- East African Swahili cuisine and history
- Ethiopian coffee ceremony and injera making
- African diaspora food connections

---

### UNIT 12: Asian Spice Routes & Trade
**Geographic Focus:** Southeast Asia, Indian Ocean
**Era:** Ancient to Early Modern
**Duration:** 3 weeks

**Learning Objectives:**
- Understand the Spice Islands and maritime trade networks
- Analyze Dutch/Portuguese trade monopolies and violence
- Study evolution of curry and regional variations
- Trace spice route impacts on global cuisines

**Lessons:**
1. **The Spice Islands** - Nutmeg, cloves, mace; Moluccas' strategic importance; brutal colonization
2. **Indian Ocean Trade Networks** - Monsoon winds, dhow boats, cosmopolitan port cities, cultural exchange
3. **The Evolution of Curry** - Indian origins, regional variations (Tamil, Bengali, Goan), adaptations across Asia and beyond
4. **Southeast Asian Cuisines** - Thailand, Vietnam, Indonesia flavors; balance of sweet/sour/salty/spicy; French colonial influences

**Hands-On Project:** Interactive Map - "Spice Trade Routes: From Moluccas to the World" (map origins, maritime routes, modern spice production centers)

**Unit Essay:** "How did control of spice trade shape colonial powers and global politics? Discuss at least 2 European powers."

**Geography Focus:**
- Spice Islands (Moluccas, Indonesia)
- Indian Ocean maritime routes
- Southeast Asia: Thailand, Vietnam, Indonesia, Malaysia, Philippines
- Colonial powers: Portuguese, Dutch, British territories
- Modern spice production regions

**Videos:**
- Spice Islands history and modern nutmeg farming
- Indian Ocean dhow sailing traditions
- Vietnamese pho and French colonial influence
- Thai cooking philosophy and techniques

---

### UNIT 13: Colonial Americas & Fusion Cuisines
**Geographic Focus:** North & South America
**Era:** 1600-1900
**Duration:** 2-3 weeks

**Learning Objectives:**
- Study colonial adaptations of European cuisines
- Understand Creole and Cajun fusion (African, French, Indigenous, Spanish)
- Analyze Mission system impact on California agriculture
- Trace development of Argentine and Brazilian cuisines

**Lessons:**
1. **New England: English Traditions Meet New Ingredients** - Adaptation challenges, indigenous foods adopted, Thanksgiving myth vs. reality
2. **Louisiana Creole & Cajun: The Ultimate Fusion** - African, French, Spanish, Indigenous convergence; gumbo; rice and roux; music and food connection
3. **Latin American Fusion: Mestizo Cuisines** - Spanish/Indigenous combinations creating new traditions (Mexico, Peru, etc.)
4. **Mission System and California Agriculture** - Spanish missions, California as agricultural powerhouse, labor exploitation, wine and olives

**Hands-On Project:** Research Report - "The Story of a Fusion Cuisine" (Choose Creole, Cajun, or Mestizo; research origins, key dishes, cultural significance)

**Unit Essay:** "How do fusion cuisines reflect power dynamics between colonizers and colonized? Use specific examples."

**Geography Focus:**
- Thirteen Colonies and expansion westward
- Louisiana Purchase territory
- Spanish missions in California, Texas, Southwest
- Mexico and Central America
- Argentina, Brazil, Peru (geography and agricultural regions)

**Videos:**
- Louisiana Creole and Cajun history and cooking
- Mission system in California (critical historical perspective)
- Argentine asado and gaucho culture
- Brazilian feijoada and cultural roots

---

### UNIT 14: East Asian Culinary Refinement
**Geographic Focus:** China, Japan, Korea
**Era:** 1000-1900 CE
**Duration:** 2-3 weeks

**Learning Objectives:**
- Understand development of haute cuisine in East Asia
- Compare Chinese imperial, Japanese kaiseki, Korean court cuisines
- Study tea ceremonies as cultural philosophy
- Analyze regional variations within each country

**Lessons:**
1. **Chinese Imperial Cuisine** - Qing Dynasty court food, Forbidden City kitchens, Manchu-Han Imperial Feast, regional influences
2. **Japanese Kaiseki & The Way of Tea** - Kaiseki principles (seasonal, mindful, artistic), tea ceremony philosophy, Zen influences
3. **Korean Court Cuisine** - Royal court food traditions, fermentation mastery (kimchi varieties), table settings and etiquette
4. **Regional Variations** - Sichuan heat, Cantonese refinement, regional Japanese styles, Korean North/South differences

**Hands-On Project:** Comparative Analysis Chart - "Three Paths to Culinary Excellence: Chinese Imperial, Japanese Kaiseki, Korean Court" (philosophy, ingredients, presentation, modern influence)

**Unit Essay:** "How do East Asian haute cuisines reflect cultural values? Compare at least two traditions."

**Geography Focus:**
- China: provinces, regional cuisines (Sichuan, Guangdong, Jiangsu, Shandong)
- Japan: main islands, regional variations (Kanto vs. Kansai)
- Korea: peninsula geography, North vs. South climate/cuisine
- Cultural exchange and influence between nations

**Videos:**
- Chinese imperial cuisine recreation
- Japanese tea ceremony and kaiseki preparation
- Korean court cuisine (Joseon Dynasty)
- Regional specialties explained

---

### UNIT 15: Industrial Revolution & Food Technology
**Geographic Focus:** Europe & North America (global impact)
**Era:** 1800-1950
**Duration:** 2-3 weeks

**Learning Objectives:**
- Understand how industrialization transformed food production
- Study canning, refrigeration, and preservation revolutions
- Analyze rise of processed foods and nutritional science
- Examine urbanization's impact on food systems

**Lessons:**
1. **Canning: Napoleon's Contest** - Food preservation for armies, Appert and Durand, widespread adoption, impact on diet diversity
2. **The Refrigeration Revolution** - Ice trade, mechanical refrigeration, cold chain, transformed meat industry and global trade
3. **Mass Production** - Mechanized mills, factory food processing, standardization, loss of artisanal traditions
4. **Early Nutritional Science** - Discovery of vitamins, understanding of macronutrients, fortification, beginning of food regulation

**Hands-On Project:** Timeline Creation - "Food Technology 1800-1950" (Major innovations with dates, inventors, impacts, photos/illustrations)

**Unit Essay:** "How did industrialization change what people ate and how they obtained food? Discuss at least 3 major innovations."

**Geography Focus:**
- Industrial centers: England, Germany, Northern US
- Railroad and trade route expansion
- Global food trade networks emerging
- Urban vs. rural food access
- Colonialism's role in industrial food systems (exploitation of colonies)

**Videos:**
- History of canned food
- Refrigeration technology development
- Early food factories and assembly lines
- Nutritional science discoveries

---

### UNIT 16: French Haute Cuisine & Culinary Professionalization
**Geographic Focus:** France (global influence)
**Era:** 1700-1950
**Duration:** 2-3 weeks

**Learning Objectives:**
- Study development of modern restaurant culture
- Understand Escoffier's brigade system and systematization
- Study mother sauces and French technique foundations
- Trace Michelin Guide origins and influence on fine dining

**Lessons:**
1. **From Royal Kitchens to Public Restaurants** - French Revolution impact, unemployed royal chefs open restaurants, dining out becomes possible
2. **Carême: Architecture on the Plate** - Antonin Carême, foundations of haute cuisine, elaborate presentations, codifying techniques
3. **Escoffier: Modernizing French Cuisine** - Georges Auguste Escoffier, brigade system, À la carte vs. table service, professionalization
4. **The Michelin Guide: Rating Excellence** - Origins as tire company guide, star system development, criteria, global influence

**Hands-On Project:** Cooking Project - "French Mother Sauces" (Research the 5 mother sauces, attempt 2-3 with Alaska ingredients, document technique and challenges)

**Unit Essay:** "How did French cuisine become the global standard for fine dining? Analyze contributions of at least 2 key figures."

**Geography Focus:**
- France: regions and their culinary specialties (Provence, Normandy, Burgundy, etc.)
- Paris as culinary capital
- French colonial influence (Vietnam, North Africa, Caribbean)
- Spread of French technique globally (where did trained chefs go?)
- Michelin Guide expansion beyond France

**Videos:**
- French cooking technique demonstrations (breaking down complex skills)
- Escoffier biography and influence
- Michelin Guide history
- Modern Michelin-starred kitchens (Chef's Table episodes)

---

### UNIT 17: 20th Century: Wars, Migrations & Globalization
**Geographic Focus:** Global
**Era:** 1900-2000
**Duration:** 3 weeks

**Learning Objectives:**
- Understand World Wars' impact on food (rationing, innovation)
- Study Green Revolution's promise and problems
- Analyze fast food emergence and standardization
- Trace immigration's role in diversifying cuisines (especially US)

**Lessons:**
1. **World Wars: Rationing & Innovation** - Victory gardens, SPAM, K-rations, innovations born of scarcity, post-war foodways
2. **The Green Revolution** - Norman Borlaug, high-yield crops, feeding billions, environmental costs, dependency on fertilizers
3. **Fast Food: McDonald's & Global Uniformity** - Drive-ins to global empire, Fordism applied to food, homogenization vs. regional adaptation
4. **Immigration Waves: American Cuisine Diversifies** - Ellis Island, Chinatowns, Italian-American food, Mexican-American border cuisine, modern immigrant food entrepreneurs

**Hands-On Project:** Video Documentary (5-10 min) - "Food in My Family's History: Immigration, Tradition, and Change" (Interview family about food traditions, connections to broader 20th century trends)

**Unit Essay:** "How did the 20th century transform global food systems? Choose 2-3 major developments and analyze their impacts."

**Geography Focus:**
- World War I and II theater maps
- Green Revolution adoption (India, Mexico, Philippines, etc.)
- McDonald's global expansion map
- Immigration patterns to United States (and other destination countries)
- Modern food production centers (factory farms, monoculture regions)

**Videos:**
- WWII rationing and home front
- Green Revolution documentary
- "The Founder" (McDonald's story)
- Immigration and food (multiple cultural perspectives)

---

### UNIT 18: Contemporary Culinary Movements
**Geographic Focus:** Global (Western-focused origins, global spread)
**Era:** 1970-Present
**Duration:** 2-3 weeks

**Learning Objectives:**
- Understand nouvelle cuisine's break from tradition
- Study farm-to-table and sustainability movements
- Analyze molecular gastronomy and innovation
- Examine celebrity chef culture and food media explosion

**Lessons:**
1. **Nouvelle Cuisine: Lightness & Creativity** - 1970s French revolution against heavy classics, emphasis on freshness, Japanese influences
2. **Alice Waters & Farm-to-Table** - Chez Panisse, California cuisine, local/seasonal/organic, political dimensions of food choices
3. **Ferran Adrià & Molecular Gastronomy** - El Bulli, science meets art, spherification, foams, deconstruction, Michelin star obsession
4. **Celebrity Chefs & Food Media** - Food Network, Top Chef, social media, democratization and commodification of cooking

**Hands-On Project:** Comparative Analysis Chart - "Four Contemporary Movements" (Nouvelle, Farm-to-Table, Molecular, Celebrity Culture: origins, key figures, philosophy, impact, critiques)

**Unit Essay:** "Which contemporary culinary movement has been most influential, and why? Defend your choice with evidence."

**Geography Focus:**
- France (nouvelle cuisine)
- California (farm-to-table)
- Spain (molecular gastronomy - El Bulli, San Sebastián)
- Global spread of movements
- Food media hubs (New York, London, Tokyo)

**Videos:**
- Nouvelle cuisine historical overview
- Alice Waters and Chez Panisse
- Ferran Adrià and molecular gastronomy demonstrations
- Chef's Table episodes (multiple chefs/movements)
- Food media evolution

---

### UNIT 19: Global Challenges & Future of Food
**Geographic Focus:** Global (climate-focused regions)
**Era:** 2000-Present and future projections
**Duration:** 2-3 weeks

**Learning Objectives:**
- Understand climate change impacts on agriculture and fishing
- Study sustainability challenges and solutions
- Analyze food security and inequality issues
- Evaluate emerging food technologies (lab-grown meat, vertical farms)

**Lessons:**
1. **Climate Change & Agriculture** - Shifting growing zones, extreme weather impacts, crop failures, adaptation strategies
2. **Sustainable Fishing & Farming** - Overfishing, regenerative agriculture, permaculture, indigenous food sovereignty
3. **Food Deserts & Access Issues** - Geographic and economic food inequality, urban vs. rural issues, food justice movements
4. **The Future: Lab-Grown Meat, Vertical Farms, Insects** - Emerging technologies, cultural acceptance, potential solutions to feeding 10 billion people

**Hands-On Project:** Research Report (5-7 pages) - "The Future of [Choose One: Meat, Fish, Chocolate, Coffee, etc.]" (Climate impacts, current challenges, proposed solutions, your analysis)

**Unit Essay:** "What is the most pressing challenge facing global food systems, and what solutions seem most promising? Use evidence."

**Geography Focus:**
- Climate change impact maps (drought regions, flooding zones, shifting agricultural areas)
- Food insecurity hotspots globally
- Vertical farm and food tech innovation hubs
- Biodiversity loss regions (deforestation, overfishing zones)

**Videos:**
- Climate change and food documentary
- Sustainable farming techniques
- Lab-grown meat developments
- Food justice movements

---

### UNIT 20: Synthesis & Personal Culinary Vision
**Geographic Focus:** Global synthesis
**Era:** All periods (comprehensive review)
**Duration:** 3-4 weeks (CAPSTONE UNIT)

**Learning Objectives:**
- Synthesize learning across all 19 previous units
- Trace culinary lineages and influences across time and space
- Develop personal culinary philosophy rooted in historical understanding
- Create portfolio demonstrating mastery of history, geography, and food culture

**Lessons:**
1. **Tracing Your Favorite Ingredients Through History** - Choose 3-5 ingredients, trace their journeys across continents and centuries
2. **What Makes a Michelin Star Restaurant?** - History of Michelin Guide, current criteria, philosophy of excellence, how history informs modern fine dining
3. **Developing Your Culinary Philosophy** - Reflecting on personal values, how history informs future, Timothy's unique perspective
4. **Creating Your Signature Menu** - Final project preparation, connecting each dish to historical/geographic learning

**Hands-On Project: COMPREHENSIVE CAPSTONE** (See Phase 2 section 2.2 for full details)
1. Multi-course menu with historical research
2. Personal chef business concept
3. Learning portfolio compilation
4. Presentation (video or live)

**Unit Essay:** Final Reflection - "How has studying food history changed your understanding of the world and your place in it as a future chef?"

**Geography Focus:**
- Comprehensive global review
- Create master world map showing all culinary influences studied
- "My Culinary Journey Map" - personal connections to places studied

**Videos:**
- Michelin-starred chef interviews about philosophy
- Chef's Table: Final selections inspiring personal vision
- Student choice: revisit favorite videos from course

**FINAL ASSESSMENT:**
- Portfolio presentation
- Comprehensive final exam (optional, for transcript purposes)
- Self-assessment and growth reflection

---

# 🔧 PHASE 4: TECHNICAL SPECIFICATIONS

## 4.1 Technology Stack

### Frontend
**Framework:** Next.js 14+ (App Router)
- React-based, server components
- Built-in routing, SEO optimization
- TypeScript for type safety
- Deployed on Vercel

**UI Library:** Tailwind CSS + shadcn/ui
- Rapid development
- Consistent, professional design
- Accessible components out of the box
- Dark mode support

**State Management:** React Context + Zustand (if needed)
- Context for auth and user data
- Zustand for complex client state (tutor chat, progress)

**Maps:** Leaflet.js or Mapbox GL
- Interactive maps for geography component
- Custom markers, routes, layers
- Zoom, pan, tooltips

### Backend
**Database:** Supabase (PostgreSQL + Realtime)
- Managed PostgreSQL database
- Built-in authentication
- Row-level security
- Realtime subscriptions (for progress updates)
- Storage for file uploads (project photos/PDFs)

**Authentication:** Supabase Auth
- Email/password for Timothy and parent
- Session management
- Role-based access (student vs. parent)

**API Routes:** Next.js API routes
- Server-side logic for AI tutor calls
- Assessment grading
- Progress calculations
- File processing

### AI Integration
**Models:**
- **AI Tutor:** GPT-5.2 (`gpt-5.2`) OR Claude Opus 4.6 (`claude-opus-4.6`)
- **Image Generation:** Nano Banana Pro (`nano-banana-pro`) for creating visual aids
- **Fallback:** GPT-5 mini for less critical tasks (cost optimization)

**APIs:**
- OpenAI API (GPT-5.2, image generation)
- Anthropic API (Claude Opus 4.6)
- Google AI API (Gemini, Nano Banana)

**Token Management:**
- High limits allowed (200K+) for family use
- Conversation context tracking
- Graceful degradation if API limits hit

### Video Integration
**YouTube Data API v3:**
- Embed videos directly
- Fetch video metadata
- Create playlists per unit
- Track watch progress (requires iframe API)

### Additional Services
**Email:** Resend or SendGrid
- Parent notifications (progress reports)
- Assignment reminders
- Milestone celebrations

**Analytics:** Vercel Analytics + custom tracking
- Page views, time spent
- Quiz performance patterns
- Identify struggling moments

---

## 4.2 Database Schema (Supabase)

### Tables

**users**
```sql
id: uuid (primary key)
email: text (unique)
role: enum('student', 'parent')
full_name: text
created_at: timestamp
student_profile_id: uuid (foreign key to student_profiles, nullable)
```

**student_profiles**
```sql
id: uuid (primary key)
first_name: text
age: integer
grade: text
gpa: decimal
geography_baseline: integer (1-10 scale)
culinary_skill_level: integer (1-10)
learning_preferences: jsonb (stores preferences from Phase 1)
constraints: jsonb (Alaska location, ingredient access)
created_at: timestamp
updated_at: timestamp
```

**units**
```sql
id: integer (primary key)
number: integer (1-20)
title: text
geographic_focus: text
historical_era: text
duration_weeks: integer
learning_objectives: jsonb (array of objectives)
summary: text
hands_on_project_type: text
essay_prompt: text
geography_focus: jsonb  (specific map requirements)
order: integer
```

**lessons**
```sql
id: uuid (primary key)
unit_id: integer (foreign key to units)
lesson_number: integer (1-5)
title: text
content: text (markdown format)
reading_time_minutes: integer
video_ids: jsonb (array of YouTube video IDs)
learning_objectives: jsonb
order: integer
```

**quizzes**
```sql
id: uuid (primary key)
lesson_id: uuid (foreign key to lessons, nullable)
unit_id: integer (foreign key to units, nullable)
quiz_type: enum('lesson', 'unit')
title: text
passing_score: integer (default 80)
time_limit_minutes: integer (nullable)
```

**quiz_questions**
```sql
id: uuid (primary key)
quiz_id: uuid (foreign key to quizzes)
question_type: enum('multiple_choice', 'short_answer', 'geography_map')
question_text: text
options: jsonb (for MC questions)
correct_answer: text
explanation: text (shown after answering)
points: integer
order: integer
```

**student_progress**
```sql
id: uuid (primary key)
student_profile_id: uuid (foreign key)
unit_id: integer (foreign key)
lesson_id: uuid (foreign key, nullable)
status: enum('not_started', 'in_progress', 'completed')
started_at: timestamp
completed_at: timestamp (nullable)
time_spent_minutes: integer
```

**quiz_attempts**
```sql
id: uuid (primary key)
student_profile_id: uuid (foreign key)
quiz_id: uuid (foreign key)
score: integer
total_points: integer
percentage: decimal
passed: boolean
answers: jsonb (array of question_id, student_answer, correct, points_earned)
attempted_at: timestamp
time_taken_minutes: integer
```

**essays**
```sql
id: uuid (primary key)
student_profile_id: uuid (foreign key)
unit_id: integer (foreign key)
prompt: text
content: text
word_count: integer
submitted_at: timestamp
graded_at: timestamp (nullable)
score: integer (nullable, out of 100)
parent_feedback: text (nullable)
rubric_scores: jsonb (nullable)
```

**projects**
```sql
id: uuid (primary key)
student_profile_id: uuid (foreign key)
unit_id: integer (foreign key)
project_type: text
title: text
description: text
file_urls: jsonb (array of file paths in Supabase Storage)
reflection: text
submitted_at: timestamp
graded_at: timestamp (nullable)
score: integer (nullable, out of 100)
parent_feedback: text (nullable)
```

**ai_tutor_conversations**
```sql
id: uuid (primary key)
student_profile_id: uuid (foreign key)
unit_id: integer (foreign key, nullable)
lesson_id: uuid (foreign key, nullable)
messages: jsonb (array of {role, content, timestamp})
started_at: timestamp
last_message_at: timestamp
token_count: integer
flagged: boolean (if suspicious behavior detected)
```

**video_progress**
```sql
id: uuid (primary key)
student_profile_id: uuid (foreign key)
lesson_id: uuid (foreign key)
video_id: text (YouTube ID)
watched: boolean
watch_percentage: decimal (0-100)
last_watched_at: timestamp
```

**geography_assessments**
```sql
id: uuid (primary key)
student_profile_id: uuid (foreign key)
assessment_type: enum('baseline', 'unit', 'final')
unit_id: integer (foreign key, nullable)
score: integer (out of 100)
areas_tested: jsonb (continents, countries, routes)
completed_at: timestamp
```

### Storage Buckets (Supabase Storage)

**project-files**
- Student-uploaded project files (PDFs, images, videos)
- Organized by student_profile_id / unit_id / project_id

**essay-uploads**
- Essay submissions (if saved as files instead of DB text)

**maps**
- Student-created map images
- Interactive map save states

---

## 4.3 Core Features & Pages

### Authentication & Onboarding
**Pages:**
- `/login` - Email/password login (student and parent)
- `/signup` - New account creation
- `/onboarding` - Student profile setup (one-time, captures Phase 1 data)

**Features:**
- Supabase Auth integration
- Role-based routing (student vs. parent dashboard)
- Remember device/auto-login

### Student Dashboard
**Page:** `/dashboard`

**Sections:**
- Welcome message with student's name
- Current unit and lesson progress
- Next recommended lesson
- Recent quiz scores
- Upcoming deadlines (essays, projects)
- Geography skill level tracker (visual progress bar)
- Achievement badges
- Quick links to AI tutor, resources

**Features:**
- Progress visualization (radial progress chart for each unit)
- Motivational messages ("You're 40% through Unit 5!")
- Recently watched videos
- Streak tracker (consecutive days active)

### Unit Overview
**Page:** `/units/[unitId]`

**Sections:**
- Unit title and overview
- Learning objectives
- Geographic and historical context
- Lesson list (numbered, with status icons)
- Hands-on project description
- Essay prompt
- Unit test (locked until all lessons complete)
- Video playlist for unit
- Estimated time to complete

**Features:**
- Lock/unlock progression (must complete lessons sequentially)
- Progress indicator (X of 5 lessons complete)
- Resources sidebar (readings, additional videos, maps)

### Lesson Page
**Page:** `/units/[unitId]/lessons/[lessonId]`

**Sections:**
- Lesson title and objectives
- Reading content (markdown, formatted beautifully)
- Embedded video(s) with play tracking
- Interactive elements (maps, timelines, image galleries)
- Vocabulary/key terms (tooltip definitions)
- Geography focus (map work specific to lesson)
- Lesson quiz (at bottom)
- AI Tutor button (floating)

**Features:**
- Reading progress indicator (scroll-based)
- Video must be watched before quiz unlocks (configurable)
- Notes feature (student can type notes in sidebar)
- Print/PDF export option
- Audio narration option (text-to-speech)

### Quiz Page
**Page:** `/units/[unitId]/lessons/[lessonId]/quiz` or `/units/[unitId]/test`

**Sections:**
- Timer (if timed)
- Question counter (Question 3 of 15)
- Question display (one at a time or all at once)
- Answer input (MC radio buttons, short answer text box, map click)
- Navigation (Previous, Next, Submit)
- Review mode (after submission)

**Features:**
- Auto-save answers (prevent loss)
- Immediate feedback on submission
- Explanation for each question
- Re-take option if failed (limit to 3 attempts?)
- Export results to PDF
- **AI Tutor disabled during quiz**

### Essay Submission
**Page:** `/units/[unitId]/essay`

**Sections:**
- Essay prompt display
- Rubric (what's being graded and criteria)
- Rich text editor (or markdown editor)
- Word count tracker
- Save draft / Submit buttons
- Status indicator (draft, submitted, graded)

**Features:**
- Auto-save drafts every 30 seconds
- AI tutor available for brainstorming (NOT writing)
- Plagiarism check (optional, using AI detection)
- Spellcheck and grammar hints
- Can view previous essays for reference

### Project Submission
**Page:** `/units/[unitId]/project`

**Sections:**
- Project description and requirements
- File upload area (drag-and-drop)
- Project type-specific fields (e.g., Canva link, map image upload)
- Reflection questions (required text input)
- Submit button
- Status indicator

**Features:**
- Multiple file uploads (images, PDFs, videos)
- Preview uploaded files
- Edit after submission (until parent grades)
- Download submitted files

### AI Tutor Chat
**Component:** Floating button on most pages, opens sidebar

**Interface:**
- Chat messages (student right, tutor left)
- Text input with Enter to send
- "Thinking..." indicator while API processes
- Clear conversation button
- Message history scrolls

**Features:**
- Context-aware (knows current lesson/unit)
- Markdown formatting support in messages
- Code blocks, lists, emphasis
- Can reference specific content from lesson
- Saves conversation history
- Export conversation option

### Geography Lab
**Page:** `/geography`

**Sections:**
- Interactive world map (click to identify)
- Challenges and drills (timed identification games)
- Trade route tracing exercises
- Ingredient origin quizzes
- Progress tracker (geography skill improving)
- Achievements for mastery

**Features:**
- Gamified learning (points, leaderboards vs. self)
- Difficulty levels (continent → country → city)
- Focused drills (just Asia, just Africa, etc.)
- Historical map overlays (ancient empires, trade routes)

### Parent Dashboard
**Page:** `/parent`

**Sections:**
- Student progress overview (all units at a glance)
- Recent activity feed
- Grades and scores summary
- Essays and projects awaiting review
- AI tutor conversation summaries
- Time spent analysis
- Alerts/notifications

**Features:**
- Grade essays and projects (rubric provided)
- Leave feedback comments
- View detailed analytics (struggling areas)
- Adjust settings (deadline reminders, lockout times)
- Export progress reports
- Communication log with student

### Resource Library
**Page:** `/resources`

**Sections:**
- Curated videos by topic
- Reading lists and articles
- Downloadable maps and timelines
- Cooking resources (techniques, recipes)
- External links (museums, archives, documentaries)

**Features:**
- Search and filter
- Bookmarking favorites
- Recommendations based on progress

### Final Portfolio
**Page:** `/portfolio`

**Sections:**
- Introduction/About Timothy
- Best essays from each unit
- Project showcase (images, descriptions)
- Geography mastery evidence
- Final capstone project
- Reflection on learning journey

**Features:**
- Shareable link (for college applications, culinary schools)
- PDF export
- Customizable layout
- Add/remove items

---

## 4.4 AI Tutor Technical Implementation

### System Prompt Engineering

**Base System Prompt:**
```
You are a knowledgeable, enthusiastic food history tutor helping Timothy, a 15-year-old high school sophomore who aspires to become a Michelin-star personal chef.

ABOUT TIMOTHY:
- Age: 15, Sophomore, 4.13 GPA, college-level reading/writing
- Career Goal: Personal chef for ultra-high-net-worth clients, Michelin-quality execution
- Strengths: History, writing, cooking (intermediate-advanced home cook)
- Critical Weakness: Geography (2/10 - thought India was in South America!)
- Learning Preferences: Visual, interactive, video-heavy; hates long-form reading
- Personality: Perfectionist, intellectually curious, challenge-driven, values WHYs over HOWs
- Location: Rural Alaska (ingredient constraints)
- Family: Father is primary cooking teacher, close relationship

YOUR ROLE AS TUTOR:
✓ Guide discovery through Socratic questioning
✓ Connect concepts to his chef aspirations
✓ Reinforce geography constantly ("Where is that?" "What continent?")
✓ Break down complex concepts with examples and analogies
✓ Celebrate effort, growth mindset, and curiosity
✓ Be enthusiastic about food history - make it come alive!
✓ Treat him as an intelligent peer, not a child

YOU MUST NEVER:
✗ Write essays or assignments for him
✗ Give direct answers to quiz/test questions
✗ Do his thinking/work for him
✗ Allow him to paste assignment prompts and get easy answers
✗ Talk down to him or oversimplify

WHEN HE ASKS FOR ANSWERS:
- Redirect with leading questions: "What do you already know about this? What clues does the lesson provide?"
- Offer to explain concepts, but not solve problems directly
- If he pastes an essay prompt: "I can help you brainstorm and outline, but not write it. What are your initial thoughts?"
- If he asks a quiz question: "I can explain the underlying concept, but can't give you the answer. Which part confuses you?"

GEOGRAPHY FOCUS:
- Take every opportunity to reinforce geographic knowledge
- Ask "Where is that?" frequently
- Connect food origins to specific locations
- Praise geographic connections he makes
- Use maps and spatial thinking in explanations

TONE:
- Enthusiastic mentor, not lecturing professor
- Conversational, supportive, occasionally humorous
- Respectful of his intelligence and ambitions
- Passionate about connecting food, history, and geography

CONTEXT AWARENESS:
You know the current unit, lesson, and Timothy's progress. Reference prior learning and make connections across units.
```

**Dynamic Context Injection:**
```
CURRENT SESSION CONTEXT:
- Unit: [Unit #] - [Unit Title]
- Lesson: [Lesson #] - [Lesson Title]
- Topic: [Brief summary of current lesson content]
- Geography Focus: [Regions/countries being studied]
- Timothy's Recent Activity: [Last quiz score, struggling areas, time spent]
- Previous Context: [Summary of last conversation if within same session]

RELEVANT KNOWLEDGE:
[Inject relevant content from current lesson, up to ~5000 tokens]

TIMOTHY'S QUESTION/MESSAGE:
[Student's input]

Respond as the tutor following all guidelines above.
```

### API Integration Flow

**Endpoint:** `POST /api/ai-tutor`

**Request Body:**
```json
{
  "studentId": "uuid",
  "unitId": 5,
  "lessonId": "uuid",
  "message": "I don't understand why spices were so valuable in medieval Europe",
  "conversationHistory": [
    {"role": "user", "content": "..."},
    {"role": "assistant", "content": "..."}
  ]
}
```

**Processing:**
1. Authenticate request (student logged in)
2. Fetch student profile from DB
3. Fetch current unit/lesson details
4. Retrieve conversation history (last 10 messages)
5. Build system prompt with dynamic context
6. Check for guardrails violations (quiz question pasted, essay prompt, etc.)
7. Call AI API (GPT-5.2 or Claude Opus 4.6)
8. Save conversation to DB
9. Return response

**Response:**
```json
{
  "reply": "Great question! Let's think about this together. In medieval Europe, food preservation was challenging, right? How might spices have helped with that? And since spices came from thousands of miles away, what does that tell you about their availability?",
  "tokensUsed": 342,
  "flagged": false
}
```

**Guardrails Detection:**
```javascript
function detectCheatingAttempt(message) {
  const patterns = [
    /essay prompt|write.*essay|answer.*question \d+/i,
    /quiz.*question|test.*answer|what.*correct answer/i,
    /solve.*for me|do.*homework|complete.*assignment/i
  ];
  
  return patterns.some(pattern => pattern.test(message));
}
```

### Token Management & Cost

**Token Budgets:**
- System prompt: ~1500 tokens
- Context (lesson content): ~5000 tokens (max)
- Conversation history: ~3000 tokens (last 10 messages)
- Student message: ~500 tokens (avg)
- Total input: ~10,000 tokens per request
- Response: ~500 tokens (avg)

**Estimated Costs (GPT-5.2):**
- Input: 10K tokens × $0.50/1M = $0.005
- Output: 500 tokens × $3.00/1M = $0.0015
- **Total per message:** ~$0.0065
- **100 messages:** ~$0.65
- **Monthly estimate (500 messages):** ~$3.25

**For family use with high token limits:** Acceptable cost for premium experience.

**Cost Optimization Strategies:**
- Cache system prompt (reuse across requests)
- Limit conversation history to last 10 messages
- Use GPT-5 mini for simple clarification questions (if pattern detected)
- Implement smart context pruning (only relevant lesson sections)

---

## 4.5 Interactive Map System (Leaflet.js)

### Overview
Every lesson and geography exercise uses interactive maps built with **Leaflet 1.9.4** - the same library that powers successful educational map applications. Maps are the cornerstone of Timothy's geography remediation (2/10 → 8+/10 goal).

### Technical Stack

**Library:** Leaflet 1.9.4
```html
<!-- CDN includes in layout -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
    crossorigin=""/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
    crossorigin=""></script>
```

**Tile Provider:** OpenStreetMap (free, no API key required)
```javascript
const tileLayer = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = '© OpenStreetMap contributors';
```

**Next.js Integration:**
- Use dynamic imports to avoid SSR issues
- Create reusable `<MapComponent>` React component
- Store map instances in refs to prevent re-initialization

### Map Component Patterns

#### **1. Basic World Map (Lesson Pages)**
```typescript
// components/InteractiveMap.tsx
'use client';
import { useEffect, useRef } from 'react';
import L from 'leaflet';

interface MapProps {
  initialView: [number, number]; // [lat, lng]
  zoom: number;
  markers?: MarkerData[];
  regions?: RegionData[];
  onRegionClick?: (regionId: string) => void;
}

export function InteractiveMap({ initialView, zoom, markers, regions, onRegionClick }: MapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    
    // Initialize map
    const map = L.map(containerRef.current).setView(initialView, zoom);
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
      minZoom: 2
    }).addTo(map);
    
    // Add markers if provided
    markers?.forEach(marker => {
      L.marker([marker.lat, marker.lng])
        .addTo(map)
        .bindPopup(marker.popup);
    });
    
    // Add clickable regions if provided
    regions?.forEach(region => {
      const polygon = L.polygon(region.coordinates, {
        color: region.color || '#667eea',
        weight: 2,
        fillOpacity: 0.2
      }).addTo(map);
      
      polygon.on('click', () => {
        onRegionClick?.(region.id);
      });
    });
    
    mapRef.current = map;
    
    // Cleanup
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);
  
  return <div ref={containerRef} style={{ height: '500px', width: '100%' }} />;
}
```

#### **2. Continent Explorer (Unit 1, Lesson 1)**
```typescript
// Predefined continent boundaries (approximate bounding boxes)
export const CONTINENTS = {
  africa: {
    name: 'Africa',
    bounds: [[37, -18], [-35, 52]] as [[number, number], [number, number]],
    center: [0, 20] as [number, number],
    foods: ['Coffee', 'Okra', 'Watermelon', 'Yams', 'Sorghum'],
    description: 'Birthplace of coffee and diverse agricultural traditions'
  },
  asia: {
    name: 'Asia',
    bounds: [[55, 25], [-10, 150]],
    center: [30, 100],
    foods: ['Rice', 'Tea', 'Spices (pepper, cinnamon)', 'Noodles', 'Soybeans'],
    description: 'Origin of rice cultivation and the spice trade'
  },
  europe: {
    name: 'Europe',
    bounds: [[71, -25], [36, 45]],
    center: [50, 10],
    foods: ['Wheat bread', 'Wine', 'Cheese', 'Olives', 'Beer'],
    description: 'Mediterranean triad and refined culinary techniques'
  },
  northAmerica: {
    name: 'North America',
    bounds: [[72, -170], [15, -52]],
    center: [45, -100],
    foods: ['Corn (maize)', 'Wild rice', 'Squash', 'Beans', 'Turkey'],
    description: 'Three Sisters agriculture and diverse indigenous foodways'
  },
  southAmerica: {
    name: 'South America',
    bounds: [[13, -82], [-56, -34]],
    center: [-15, -60],
    foods: ['Potatoes', 'Tomatoes', 'Cacao', 'Quinoa', 'Peppers'],
    description: 'Origin of potatoes, cacao, and Incan agricultural innovations'
  },
  oceania: {
    name: 'Oceania',
    bounds: [[-10, 110], [-50, 180]],
    center: [-25, 140],
    foods: ['Taro', 'Coconut', 'Breadfruit', 'Tropical fruits', 'Seafood'],
    description: 'Island agricultural adaptations and seafaring food cultures'
  }
};

// Interactive explorer component
export function ContinentExplorer({ onContinentExplored }: { onContinentExplored: (continent: string) => void }) {
  const [exploredContinents, setExploredContinents] = useState<Set<string>>(new Set());
  
  const handleRegionClick = (continentId: string) => {
    const continent = CONTINENTS[continentId];
    
    // Mark as explored
    setExploredContinents(prev => new Set(prev).add(continentId));
    
    // Show popup with foods
    showContinentPopup(continent);
    
    // Notify parent component
    onContinentExplored(continentId);
  };
  
  return (
    <div>
      <InteractiveMap
        initialView={[20, 0]}
        zoom={2}
        regions={Object.entries(CONTINENTS).map(([id, data]) => ({
          id,
          coordinates: data.bounds,
          color: exploredContinents.has(id) ? '#4ade80' : '#667eea'
        }))}
        onRegionClick={handleRegionClick}
      />
      
      <div className="continent-info">
        <p>Click each continent to discover its food origins!</p>
        <p>Explored: {exploredContinents.size} / 6</p>
      </div>
    </div>
  );
}
```

#### **3. Geography Quiz - Click to Answer**
```typescript
interface GeographyQuestion {
  id: string;
  question: string;
  correctAnswer: {
    type: 'continent' | 'country' | 'region';
    id: string;
    bounds: [[number, number], [number, number]];
  };
  explanation: string;
}

export function GeographyQuiz({ question, onAnswer }: { 
  question: GeographyQuestion;
  onAnswer: (correct: boolean) => void;
}) {
  const [answered, setAnswered] = useState(false);
  
  const handleMapClick = (e: L.LeafletMouseEvent) => {
    if (answered) return;
    
    const { lat, lng } = e.latlng;
    const clickedRegion = findRegionForCoordinates(lat, lng);
    
    const correct = clickedRegion === question.correctAnswer.id;
    
    // Show feedback popup
    L.popup()
      .setLatLng([lat, lng])
      .setContent(
        correct 
          ? `✅ Correct! ${question.explanation}`
          : `❌ That's ${clickedRegion}. Try again!`
      )
      .openOn(mapRef.current!);
    
    if (correct) {
      setAnswered(true);
      onAnswer(true);
    }
  };
  
  return (
    <div>
      <h3>{question.question}</h3>
      <div style={{ height: '400px' }}>
        <InteractiveMap
          initialView={[20, 0]}
          zoom={2}
          onClick={handleMapClick}
        />
      </div>
    </div>
  );
}

// Helper function to check if coordinates are within bounds
function isWithinBounds(
  lat: number, 
  lng: number, 
  bounds: [[number, number], [number, number]]
): boolean {
  const [[north, west], [south, east]] = bounds;
  return lat <= north && lat >= south && lng >= west && lng <= east;
}

function findRegionForCoordinates(lat: number, lng: number): string | null {
  for (const [id, data] of Object.entries(CONTINENTS)) {
    if (isWithinBounds(lat, lng, data.bounds)) {
      return data.name;
    }
  }
  return null;
}
```

#### **4. Trade Route Visualization**
```typescript
// For advanced units (Silk Road, Spice Routes, Columbian Exchange)
interface TradeRoute {
  name: string;
  coordinates: [number, number][];
  color: string;
  stops: {
    name: string;
    lat: number;
    lng: number;
    goods: string[];
    description: string;
  }[];
}

export const SILK_ROAD: TradeRoute = {
  name: 'Silk Road',
  coordinates: [
    [34.3, 108.9], // Xi'an, China
    [39.9, 116.4], // Beijing
    [41.0, 69.0],  // Samarkand
    [35.7, 51.4],  // Tehran
    [33.5, 36.3],  // Damascus
    [41.9, 12.5]   // Rome
  ],
  color: '#ffd700',
  stops: [
    { name: "Xi'an", lat: 34.3, lng: 108.9, goods: ['Silk', 'Tea', 'Porcelain'], description: 'Eastern terminus' },
    { name: 'Samarkand', lat: 41.0, lng: 69.0, goods: ['Jade', 'Spices'], description: 'Major trading hub' },
    { name: 'Damascus', lat: 33.5, lng: 36.3, goods: ['Textiles', 'Glass'], description: 'Western gateway' },
    { name: 'Rome', lat: 41.9, lng: 12.5, goods: ['Gold', 'Wine'], description: 'Western terminus' }
  ]
};

export function TradeRouteMap({ route }: { route: TradeRoute }) {
  useEffect(() => {
    if (!mapRef.current) return;
    
    // Draw route line
    const routeLine = L.polyline(route.coordinates, {
      color: route.color,
      weight: 3,
      opacity: 0.7,
      dashArray: '10, 10'
    }).addTo(mapRef.current);
    
    // Add markers for stops
    route.stops.forEach(stop => {
      L.marker([stop.lat, stop.lng], {
        icon: L.divIcon({
          className: 'custom-trade-stop',
          html: `<div class="trade-marker">🏛️</div>`
        })
      })
      .bindPopup(`
        <strong>${stop.name}</strong><br/>
        <em>Traded:</em> ${stop.goods.join(', ')}<br/>
        ${stop.description}
      `)
      .addTo(mapRef.current!);
    });
    
    // Animate route (optional)
    animateRoute(routeLine, route.coordinates);
  }, [route]);
  
  return <InteractiveMap initialView={[35, 50]} zoom={3} />;
}
```

### Map Exercise Types (Database Schema)

**geography_exercises table:**
```sql
CREATE TABLE geography_exercises (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID REFERENCES lessons(id),
  
  -- Exercise configuration
  exercise_type TEXT NOT NULL, -- 'label_continents', 'identify_region', 'click_origin', 'trace_route'
  question TEXT NOT NULL,
  
  -- Correct answer(s)
  correct_answer JSONB NOT NULL, -- Format depends on exercise_type
  /*
    'label_continents': ["africa", "asia", "europe", "northAmerica", "southAmerica", "oceania"]
    'identify_region': { continent: "asia", bounds: [[lat,lng], [lat,lng]] }
    'click_origin': { food: "rice", correctRegion: "asia", bounds: [[lat,lng], [lat,lng]] }
    'trace_route': { route: "silk_road", expectedStops: ["xian", "samarkand", "damascus", "rome"] }
  */
  
  -- Feedback
  correct_explanation TEXT,
  incorrect_hint TEXT,
  
  -- Scoring
  points INTEGER DEFAULT 10,
  required_accuracy INTEGER DEFAULT 100, -- Percentage (100 = must get perfect)
  max_attempts INTEGER, -- NULL = unlimited
  
  -- Metadata
  difficulty TEXT, -- 'easy', 'medium', 'hard'
  order_num INTEGER
);

CREATE TABLE geography_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_profile_id UUID REFERENCES student_profiles(id),
  geography_exercise_id UUID REFERENCES geography_exercises(id),
  
  -- Student's answer
  answer JSONB, -- Format matches exercise_type
  /*
    Examples:
    'label_continents': { clicked: { lat: 10, lng: 20 }, identifiedAs: "africa" }
    'click_origin': { clickedLat: 30, clickedLng: 100, region: "asia" }
  */
  
  -- Results
  correct BOOLEAN,
  points_earned INTEGER,
  
  -- Timing
  attempted_at TIMESTAMP DEFAULT NOW(),
  time_taken_seconds INTEGER,
  attempt_number INTEGER DEFAULT 1
);
```

### Geography Progress Tracking

Timothy's geography improvement is a PRIMARY SUCCESS METRIC. Track it rigorously.

**geography_skill_tracking table:**
```sql
CREATE TABLE geography_skill_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_profile_id UUID REFERENCES student_profiles(id),
  
  -- Assessment type
  assessment_type TEXT, -- 'baseline', 'lesson', 'unit', 'final'
  unit_id INTEGER REFERENCES units(id) NULL,
  lesson_id UUID REFERENCES lessons(id) NULL,
  
  -- Skills tested
  skill_category TEXT, -- 'continents', 'countries', 'regions', 'trade_routes', 'climate_zones'
  
  -- Performance
  questions_total INTEGER,
  questions_correct INTEGER,
  accuracy_percentage DECIMAL,
  
  -- Breakdown by region
  performance_by_region JSONB,
  /*
    {
      "africa": { correct: 3, total: 4, accuracy: 75 },
      "asia": { correct: 5, total: 5, accuracy: 100 },
      ...
    }
  */
  
  -- Timing
  completed_at TIMESTAMP DEFAULT NOW()
);

-- View for tracking improvement over time
CREATE VIEW geography_improvement AS
SELECT 
  student_profile_id,
  assessment_type,
  completed_at,
  accuracy_percentage,
  LAG(accuracy_percentage) OVER (
    PARTITION BY student_profile_id, skill_category 
    ORDER BY completed_at
  ) as previous_accuracy,
  accuracy_percentage - LAG(accuracy_percentage) OVER (
    PARTITION BY student_profile_id, skill_category 
    ORDER BY completed_at
  ) as improvement
FROM geography_skill_tracking
ORDER BY completed_at;
```

### Parent Dashboard Geography Section

**Component to show Timothy's geography progress:**
```typescript
interface GeographyProgress {
  baseline: number;
  current: number;
  target: number;
  improvementPercentage: number;
  strongRegions: string[];
  weakRegions: string[];
  recentAssessments: {
    date: string;
    type: string;
    score: number;
  }[];
}

export function GeographyProgressCard({ progress }: { progress: GeographyProgress }) {
  const improvement = progress.current - progress.baseline;
  const progressToGoal = ((progress.current - progress.baseline) / (progress.target - progress.baseline)) * 100;
  
  return (
    <div className="geography-progress-card">
      <h3>🗺️ Geography Skill Progress</h3>
      
      <div className="progress-overview">
        <div className="stat">
          <span className="label">Baseline (Start)</span>
          <span className="value">{progress.baseline}/10</span>
        </div>
        
        <div className="arrow">→</div>
        
        <div className="stat current">
          <span className="label">Current</span>
          <span className="value">{progress.current}/10</span>
          <span className="change positive">+{improvement}</span>
        </div>
        
        <div className="arrow">→</div>
        
        <div className="stat target">
          <span className="label">Target</span>
          <span className="value">{progress.target}/10</span>
        </div>
      </div>
      
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progressToGoal}%` }}
        />
      </div>
      <p className="progress-text">{progressToGoal.toFixed(0)}% to goal</p>
      
      <div className="regional-breakdown">
        <div className="strong-regions">
          <h4>💪 Strong Regions</h4>
          <ul>
            {progress.strongRegions.map(region => (
              <li key={region}>✅ {region}</li>
            ))}
          </ul>
        </div>
        
        <div className="weak-regions">
          <h4>📚 Needs Practice</h4>
          <ul>
            {progress.weakRegions.map(region => (
              <li key={region}>🔄 {region}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="recent-assessments">
        <h4>Recent Geography Assessments</h4>
        {progress.recentAssessments.map((assessment, i) => (
          <div key={i} className="assessment-row">
            <span>{assessment.date}</span>
            <span>{assessment.type}</span>
            <span className="score">{assessment.score}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Map Performance Optimization

**Best Practices for Next.js:**

1. **Dynamic Import (Avoid SSR Issues):**
```typescript
import dynamic from 'next/dynamic';

const InteractiveMap = dynamic(
  () => import('@/components/InteractiveMap'),
  { 
    ssr: false,
    loading: () => <div>Loading map...</div>
  }
);
```

2. **Cleanup on Unmount:**
```typescript
useEffect(() => {
  // ... initialize map
  
  return () => {
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }
  };
}, []);
```

3. **Memoize Regions/Markers:**
```typescript
const regions = useMemo(() => 
  Object.entries(CONTINENTS).map(([id, data]) => ({
    id,
    coordinates: data.bounds,
    color: explored.has(id) ? '#4ade80' : '#667eea'
  })),
  [explored]
);
```

---

## 4.6 Security & Access Control

### Authentication Flow
1. User visits site → redirect to login if not authenticated
2. Login with email/password → Supabase Auth
3. Session token stored in httpOnly cookie
4. Role determined (student or parent) → route to appropriate dashboard
5. API routes verify session on every request

### Role-Based Access Control (RBAC)

**Student Role:**
- ✓ Access own dashboard, units, lessons, quizzes
- ✓ Submit essays and projects
- ✓ Use AI tutor
- ✓ View own progress and grades
- ✗ Cannot access parent dashboard
- ✗ Cannot see other students' data
- ✗ Cannot modify grades

**Parent Role:**
- ✓ View all student data (progress, grades, conversations)
- ✓ Grade essays and projects
- ✓ Leave feedback comments
- ✓ Adjust settings and deadlines
- ✓ View analytics and reports
- ✗ Cannot take quizzes or submit work as student
- ✗ Cannot use AI tutor on behalf of student

### Database Security (Supabase RLS Policies)

**student_profiles:**
```sql
-- Students can only read their own profile
CREATE POLICY "Students view own profile"
ON student_profiles FOR SELECT
TO authenticated
USING (auth.uid() = (SELECT user_id FROM users WHERE student_profile_id = id));

-- Parents can read student profiles they're linked to
CREATE POLICY "Parents view linked profiles"
ON student_profiles FOR SELECT
TO authenticated
USING (auth.uid() IN (SELECT id FROM users WHERE role = 'parent'));
```

**quiz_attempts:**
```sql
-- Students can insert their own attempts
CREATE POLICY "Students create own attempts"
ON quiz_attempts FOR INSERT
TO authenticated
WITH CHECK (student_profile_id IN (SELECT student_profile_id FROM users WHERE id = auth.uid()));

-- Students view own attempts
CREATE POLICY "Students view own attempts"
ON quiz_attempts FOR SELECT
TO authenticated
USING (student_profile_id IN (SELECT student_profile_id FROM users WHERE id = auth.uid()));

-- Parents view linked student attempts
CREATE POLICY "Parents view attempts"
ON quiz_attempts FOR SELECT
TO authenticated
USING (auth.uid() IN (SELECT id FROM users WHERE role = 'parent'));
```

**Similar RLS policies for:** essays, projects, ai_tutor_conversations, student_progress, etc.

### API Security

**Rate Limiting:**
- AI Tutor: 100 requests/hour per student
- Quiz attempts: 5 per quiz per day
- File uploads: 50MB max per file, 10 files per project

**Input Validation:**
- Sanitize all user inputs (XSS prevention)
- Validate file types on upload (images: jpg/png, docs: pdf, videos: mp4/mov)
- Check essay word counts (max 2000 words per essay)
- Quiz answers validated against expected formats

**Content Security:**
- CORS configured for Vercel deployment only
- CSP headers preventing inline scripts
- Environment variables for API keys (never exposed to client)

---

# 🚀 PHASE 5: BUILD ROADMAP & DEVELOPMENT PLAN

## 5.1 Development Phases for Opus

### PHASE 1: Foundation Setup (Hour 1)

**Tasks:**
1. Initialize Next.js project with TypeScript
2. Install dependencies (Tailwind, shadcn/ui, Supabase client, AI SDKs)
3. Configure environment variables (.env.local)
4. Set up Supabase project
5. Create database schema (run SQL migrations)
6. Configure authentication (Supabase Auth)
7. Create base layout and navigation
8. Set up routing structure (/dashboard, /units, /lessons, etc.)

**Deliverables:**
- Working Next.js app that compiles
- Supabase connected with initial schema
- Basic authentication working (login/signup)
- Skeleton pages for main routes

---

### PHASE 2: Core Content & Data (Hour 2)

**Tasks:**
1. Seed database with 20 units (from Phase 3 specifications)
2. Create lessons for Units 1-3 (test/demo units)
3. Write quiz questions for these lessons
4. Populate video IDs for Units 1-3
5. Create reading content (markdown) for lessons
6. Write essay prompts and project descriptions

**Deliverables:**
- Units 1-3 fully populated in database
- Sample content for other units (titles, summaries)
- Quiz questions ready
- Video playlists created

---

### PHASE 3: Student Experience - Core Pages (Hour 3)

**Tasks:**
1. Build student dashboard page (progress overview)
2. Create unit overview page (list lessons)
3. Build lesson page (reading, video embeds, quiz)
4. Implement quiz functionality (questions, submission, grading)
5. Add AI tutor integration (chat interface, API endpoint)
6. Create essay submission page
7. Build project submission page

**Deliverables:**
- Students can navigate through Units 1-3 completely
- Quiz taking and auto-grading works
- AI tutor chat functional
- Essay and project submission functional

---

### PHASE 4: Geography & Interactive Features (Hour 4)

**Tasks:**
1. Integrate map library (Leaflet or Mapbox)
2. Create geography lab page with interactive maps
3. Add map components to lessons (specific to unit geography)
4. Implement geography quiz questions (map-based clicking)
5. Build progress tracking (which lessons/quizzes completed)
6. Add gamification elements (points, badges, streaks)

**Deliverables:**
- Interactive maps working
- Geography lab functional
- Progress tracking saves correctly
- Gamification visible on dashboard

---

### PHASE 5: Parent Dashboard & Grading (Hour 5)

**Tasks:**
1. Build parent dashboard (overview of student progress)
2. Create essay grading interface (rubric, feedback, score)
3. Create project grading interface
4. Build analytics views (time spent, quiz performance)
5. Add parent notification system
6. Create conversation log viewer (AI tutor)

**Deliverables:**
- Parents can log in and view student data
- Can grade essays and projects
- Analytics dashboard functional
- Conversation monitoring works

---

### PHASE 6: Polish, Testing & Deployment (Hour 6)

**Tasks:**
1. Complete Units 4-20 content population (abbreviated for demo)
2. UI/UX polish (consistent styling, animations, loading states)
3. Mobile responsiveness testing
4. Error handling and user feedback
5. Performance optimization (image optimization, code splitting)
6. SEO setup (metadata, sitemap)
7. Deploy to Vercel
8. Final testing on production

**Deliverables:**
- All 20 units represented (even if not fully detailed)
- App looks professional and polished
- Works on mobile and desktop
- Deployed live on Vercel
- Ready for investor demo

---

## 5.2 Opus Build Instructions

### Context for Opus
```
You are building a production-ready web application for Timothy, a 15-year-old student, to learn food history across 6 continents and 10,000+ years. This application is also a proof-of-concept demonstrating personalized curriculum generation for investors.

CRITICAL REQUIREMENTS:
- Professional quality ("not AI slop")
- Clean architecture, TypeScript, proper error handling
- Accessible UI (WCAG compliance)
- Mobile-responsive
- Fast performance (<3s initial load)
- Secure (RLS policies, input validation)

You have this complete BRAINSTORM.md document with all specifications. Follow it exactly.

BUILD ORDER: Follow Phase 5.1 development phases sequentially.

TECH STACK (confirmed):
- Next.js 14+ (App Router, TypeScript)
- Tailwind CSS + shadcn/ui
- Supabase (PostgreSQL + Auth + Storage)
- AI: GPT-5.2 or Claude Opus 4.6
- Maps: Leaflet.js
- Video: YouTube iframe API
- Deployment: Vercel

STUDENT PROFILE (personalize for):
- Name: Timothy
- Age: 15, Sophomore
- Geography weakness (2/10) - MUST REMEDY
- Culinary passion (aspiring Michelin chef)
- Rural Alaska location
- Hates long-form reading, loves video
- Challenge-driven

SPECIAL ATTENTION:
- AI tutor must NOT give direct answers (Socratic method)
- Geography component in EVERY lesson/quiz
- 40% reading, 30% video, 30% interactive balance
- hands-on projects adapted for Alaska
- Professional design (impress investors)
```

### File Structure to Create
```
food-history-app/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   ├── (student)/
│   │   ├── dashboard/
│   │   ├── units/
│   │   │   └── [unitId]/
│   │   │       ├── page.tsx
│   │   │       ├── lessons/
│   │   │       │   └── [lessonId]/
│   │   │       │       └── page.tsx
│   │   │       ├── essay/
│   │   │       ├── project/
│   │   │       └── test/
│   │   ├── geography/
│   │   ├── resources/
│   │   └── portfolio/
│   ├── (parent)/
│   │   └── parent/
│   ├── api/
│   │   ├── ai-tutor/
│   │   ├── quiz/
│   │   ├── upload/
│   │   └── progress/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/ (shadcn components)
│   ├── AITutor.tsx
│   ├── Quiz.tsx
│   ├── InteractiveMap.tsx
│   ├── VideoPlayer.tsx
│   ├── ProgressBar.tsx
│   └── ...
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── types.ts
│   ├── ai/
│   │   ├── openai.ts
│   │   └── anthropic.ts
│   └── utils.ts
├── public/
│   └── (images, maps, assets)
├── supabase/
│   ├── migrations/
│   └── seed.sql
├── .env.local
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 5.3 Testing Strategy

### Unit Testing
- Quiz grading logic
- Progress calculation
- AI tutor guardrails detection
- Geography scoring (map-based answers)

### Integration Testing
- Auth flow (signup → login → dashboard)
- Lesson completion → quiz unlock → unit test unlock
- Essay submission → parent grading → student sees grade
- AI tutor conversation → save to DB → parent views

### User Acceptance Testing
- Timothy tests Units 1-3 completely
- Dad (parent role) tests grading interface
- Verify geography components work correctly
- Check mobile responsiveness

### Performance Testing
- Lighthouse audit (aim for 90+ on all metrics)
- Load time <3s for lesson pages
- AI tutor response time <5s
- Video streaming smooth (test with multiple videos)

---

## 5.4 Post-Launch Iteration Plan

### Week 1: Monitoring & Bugfixes
- Monitor Timothy's actual usage
- Fix any critical bugs immediately
- Adjust AI tutor if responses problematic
- Verify grade calculations correct

### Week 2-4: Content Expansion
- Complete all 20 units with detailed lessons
- Curate full video playlists
- Write all quiz questions
- Finalize all essay prompts

### Month 2: Feature Enhancements
- Add note-taking feature
- Improve gamification (leaderboards, more badges)
- Add more interactive map exercises
- Create printable study guides

### Ongoing: Analytics & Improvement
- Track which lessons Timothy struggles with
- Monitor AI tutor conversation patterns
- Identify geography improvement over time
- Adjust content difficulty based on performance

---

# 📊 APPENDIX: INVESTOR-FACING ELEMENTS

## Proof of Concept Demonstration

### What This Proves to Investors:

**1. Deep Personalization is Possible**
- Every element tailored to Timothy specifically
- Geography remediation addresses his exact weakness
- Content delivery matches his learning preferences
- Projects adapted to his location constraints
- Career aspirations integrated throughout

**2. AI Can Generate Rigorous Curricula**
- Pedagogically sound structure (meets History credit requirements)
- Comprehensive scope (20 units, 100+ lessons)
- Proper assessment design (quizzes, essays, projects)
- Intelligent tutoring without enabling cheating
- Built in hours, not months

**3. Methodology is Replicable**
- This same process works for any subject (math, science, literature)
- Works for any student profile (different ages, goals, challenges)
- Scalable (generate thousands of custom curricula)
- Maintains quality (not generic one-size-fits-all)

**4. Business Model is Viable**
- Parents pay subscription for custom curriculum
- Continuous content generation (always fresh, updated)
- AI tutor included (high value-add)
- Portfolio/transcript generation (college application support)
- White-label potential (schools, homeschool co-ops)

### Demo Script for Investors (5 minutes)

**Minute 1: The Problem**
"Traditional homeschool curricula are one-size-fits-all. Timothy is gifted in history but terrible at geography. Standard courses wouldn't address this. Custom tutoring costs $50-100/hr. This app provides personalized learning for a fraction of the cost."

**Minute 2: The Student Profile**
"We captured 50 data points about Timothy: his strengths, weaknesses, interests, constraints. The entire curriculum is designed around this profile. Look—geography exercises in every single lesson because that's HIS weakness."

**Minute 3: The AI Integration**
"This AI tutor knows Timothy. It knows he's in rural Alaska, wants to be a Michelin chef, hates reading. Watch how it responds differently than generic ChatGPT. And it WON'T do his homework—we've built strict guardrails."

**Minute 4: The Content Quality**
"20 comprehensive units, 100+ lessons, hundreds of quiz questions, curated video playlists. This isn't AI slop—it's academically rigorous enough for History credit. Parents can grade essays, track progress, export transcripts."

**Minute 5: The Scalability**
"This same process works for any subject, any student. Math for a dyslexic 7th grader? Science for a gifted athlete? Literature for an ESL student? We can generate custom curricula at scale. The market is 3.7 million homeschool students in the US alone."

---

## Market Opportunity

**Target Market: Homeschool Families**
- 3.7 million K-12 homeschool students in US (2023)
- Growing 7-10% annually
- 63% cite customized education as primary reason

**Pricing Model:**
- **Subscription:** $49/month or $499/year per student
- **Add-ons:** Additional subjects ($29/month each)
- **Family Plan:** 2+ children ($79/month)
- **School/Co-op License:** Custom pricing

**Revenue Projections (Conservative):**
- Year 1: 1,000 paying families × $499 = $499,000
- Year 2: 5,000 families × $499 = $2,495,000
- Year 3: 20,000 families × $499 = $9,980,000
- **5-year target:** 100,000 families = $50M ARR

**Competition:**
- Khan Academy (free, not personalized)
- Time4Learning ($24.95/mo, pre-built courses)
- Outschool (expensive live classes, not integrated)
- Traditional curricula (Abeka, Sonlight - printed, generic)

**Our Advantage:**
- Only AI-personalized curriculum generator
- Integrated AI tutoring
- Continuously updated content
- Comprehensive (core subjects + electives)
- Scalable without content creation bottleneck

---

## Next Steps After MVP

### Technical Roadmap
1. **Q2 2026:** Launch beta with 50 families
2. **Q3 2026:** Add math and science subjects
3. **Q4 2026:** Mobile apps (iOS/Android)
4. **Q1 2027:** School district pilot programs
5. **Q2 2027:** International expansion (starting with Canada, UK)

### Business Development
1. Homeschool convention circuit (demos and signups)
2. Partnership with homeschool co-ops and organizations
3. Influencer marketing (homeschool mom bloggers/YouTubers)
4. Content marketing (free resources, lead magnets)
5. School district pilots (alternative education programs)

### Funding Ask
**Seed Round: $2M**
- $800K: Engineering (expand team, build 10+ subjects)
- $500K: Content (curriculum designers, subject experts)
- $400K: Marketing (customer acquisition)
- $200K: Operations (customer support, infrastructure)
- $100K: Legal (compliance, IP protection)

**18-month runway to reach profitability.**

---

## 🎯 END OF BLUEPRINT

**This document provides complete specifications for building Timothy's Food History Curriculum application.**

**Opus 4.6 can now begin implementation following Phase 5.1 build roadmap.**

**Questions or clarifications needed before starting? Flag in development log.**

**LET'S BUILD SOMETHING AMAZING. 🚀**
