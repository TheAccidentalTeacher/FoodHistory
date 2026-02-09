# 🔧 FOOD HISTORY APP - TECHNICAL IMPLEMENTATION SPEC

**Based on:** Existing Mrs. Somers Maps infrastructure  
**Date:** February 7, 2026  
**Integration Approach:** Reuse proven architecture, adapt for food history context

---

## ✅ ANSWERS TO YOUR QUESTIONS

### 1. **YouTube API - How Videos Work**

**YES, we use your YouTube Data API v3.**

**How it works:**
```javascript
// Similar to how you search for locations, we'll search for videos
async function findLessonVideos(searchQuery, maxResults = 3) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?` +
        `part=snippet&` +
        `q=${encodeURIComponent(searchQuery)}&` +
        `type=video&` +
        `maxResults=${maxResults}&` +
        `key=${YOUTUBE_API_KEY}`
    );
    
    const data = await response.json();
    
    // Returns video IDs, titles, thumbnails
    return data.items.map(item => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        channelTitle: item.snippet.channelName
    }));
}
```

**For Opus during build:**
- Each lesson specifies search terms (e.g., "Columbian Exchange history documentary")
- Opus runs YouTube API search during build
- Saves top 3 video IDs to database
- Videos embed in lesson pages using YouTube iframe API
- Track watch progress using iframe API events

---

### 2. **Map Exploration - Using Your Leaflet Infrastructure**

**YES, we'll reuse your existing Leaflet 1.9.4 setup!**

**What we'll adapt from your Geography Detective Academy:**

#### **Your Current Map Setup (index.html):**
```html
<!-- Leaflet CSS -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
    crossorigin=""/>

<!-- Your map container -->
<div id="map"></div>

<!-- Leaflet JS -->
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
```

#### **Food History Adaptation:**
```javascript
// Initialize map (same as your Geography app)
const map = L.map('map').setView([20, 0], 2); // World view

// Use same tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18,
    minZoom: 2
}).addTo(map);

// Add clickable regions for food history
// Example: Click on Italy to see Mediterranean Triad origins
const italyMarker = L.marker([41.9, 12.5])
    .addTo(map)
    .bindPopup(`
        <h3>🍝 Ancient Rome</h3>
        <p><strong>Mediterranean Triad:</strong> Wheat, Olives, Grapes</p>
        <button onclick="learnMore('rome')">Learn More</button>
    `);

// For geography exercises: Click-to-identify
function startGeographyQuiz() {
    map.on('click', function(e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        
        // Check if clicked location is correct answer
        checkGeographyAnswer(lat, lng);
    });
}
```

#### **Specific Features We'll Build:**

**1. Interactive Continent Explorer (Activity 2 in Lesson 1):**
```javascript
// Define continent polygons (similar to your location boundaries)
const continents = {
    africa: { bounds: [[37, -18], [-35, 52]], foods: ["Coffee", "Okra", "Watermelon"] },
    asia: { bounds: [[55, 25], [-10, 150]], foods: ["Rice", "Tea", "Spices"] },
    // ... etc
};

// Click on continent to reveal food origins
continents.forEach(continent => {
    const polygon = L.rectangle(continent.bounds, {
        color: '#667eea',
        weight: 2,
        fillOpacity: 0.2
    }).addTo(map);
    
    polygon.on('click', () => {
        showContinentFoods(continent.name, continent.foods);
    });
});
```

**2. Geography Quiz - Click-to-Answer:**
```javascript
// Question: "Click on the continent where rice was first domesticated"
function geographyQuestion(correctContinent) {
    let answered = false;
    
    map.on('click', function(e) {
        if (answered) return;
        
        const clickedContinent = getContinent(e.latlng.lat, e.latlng.lng);
        
        if (clickedContinent === correctContinent) {
            L.popup()
                .setLatLng(e.latlng)
                .setContent('✅ Correct! Rice was domesticated in Asia.')
                .openOn(map);
            
            saveQuizAnswer(questionId, 'correct');
            answered = true;
        } else {
            L.popup()
                .setLatLng(e.latlng)
                .setContent(`❌ Not quite. That's ${clickedContinent}. Try again!`)
                .openOn(map);
        }
    });
}
```

**3. Trade Route Tracing (Advanced Units):**
```javascript
// Visualize Silk Road, Spice Routes, Columbian Exchange
const silkRoad = L.polyline([
    [34.3, 108.9], // Xi'an, China
    [39.9, 116.4], // Beijing
    [41.0, 69.0],  // Samarkand
    [35.7, 51.4],  // Tehran
    [41.9, 12.5]   // Rome
], {
    color: '#ffd700',
    weight: 3,
    opacity: 0.7,
    dashArray: '10, 10'
}).addTo(map);

// Add markers for major stops
const routeStops = [
    { name: "Xi'an", lat: 34.3, lng: 108.9, goods: "Silk, Tea, Porcelain" },
    // ... etc
];

routeStops.forEach(stop => {
    L.marker([stop.lat, stop.lng])
        .bindPopup(`<strong>${stop.name}</strong><br>Traded: ${stop.goods}`)
        .addTo(map);
});
```

---

### 3. **Geography Exercises - How They Work**

**Two Types:**

#### **Type A: Label the Map (Pre-Assessment, Unit 1)**
```javascript
// Student must click on correct locations
const geographyTest = {
    questions: [
        { prompt: "Click on Asia", correctBounds: [[55, 25], [-10, 150]] },
        { prompt: "Click on South America", correctBounds: [[13, -82], [-56, -34]] }
    ],
    currentQ: 0,
    score: 0
};

function checkClick(lat, lng) {
    const bounds = geographyTest.questions[geographyTest.currentQ].correctBounds;
    
    if (isWithinBounds(lat, lng, bounds)) {
        geographyTest.score++;
        showFeedback("Correct! ✅");
        nextQuestion();
    } else {
        showFeedback("Try again! That's not the right area.");
    }
}

// Must get 100% to proceed (unlimited attempts)
function completeGeographyTest() {
    if (geographyTest.score === geographyTest.questions.length) {
        saveToDatabase({
            studentId: currentStudent.id,
            lessonId: 'unit1-lesson1',
            geographyPassed: true,
            score: 100
        });
        
        unlockNextLesson();
    }
}
```

#### **Type B: Explore and Learn (Interactive Activity)**
```javascript
// No right/wrong - exploration and reflection
const continentExplorer = {
    visited: [],
    reflections: {}
};

function exploreContinent(continent) {
    // Mark as visited
    continentExplorer.visited.push(continent);
    
    // Show popup with origin foods
    showContinentInfo(continent);
    
    // After visiting all 6, ask reflection question
    if (continentExplorer.visited.length === 6) {
        askReflection("Which continent do you think had the MOST influence on global cuisine? Why?");
    }
}

function submitReflection(answer) {
    // Save to database
    saveToDatabase({
        studentId: currentStudent.id,
        activityId: 'continent-explorer',
        reflection: answer,
        completedAt: new Date()
    });
    
    markActivityComplete();
}
```

---

### 4. **Quiz System - How It Works**

**Based on your Bubble Brain quiz architecture, adapted for lessons:**

#### **Database Schema (Add to your existing Supabase):**
```sql
-- New table for Food History
CREATE TABLE food_history_quiz_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_profile_id UUID REFERENCES profiles(id),
    lesson_id TEXT NOT NULL,
    quiz_type TEXT, -- 'lesson', 'unit'
    
    -- Results
    score INTEGER,
    total_points INTEGER,
    percentage DECIMAL,
    passed BOOLEAN,
    
    -- Detailed answers
    answers JSONB, -- Array of {questionId, studentAnswer, correct, pointsEarned}
    
    -- Timing
    attempted_at TIMESTAMP DEFAULT NOW(),
    time_taken_minutes INTEGER,
    
    -- Retake tracking
    attempt_number INTEGER DEFAULT 1
);

-- Quiz questions (hardcoded, but flexible)
CREATE TABLE food_history_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id TEXT NOT NULL,
    
    -- Question data
    question_type TEXT, -- 'multiple_choice', 'short_answer', 'geography_map'
    question_text TEXT,
    options JSONB, -- For MC: [{label: "A", text: "...", correct: true}, ...]
    correct_answer TEXT,
    explanation TEXT,
    
    -- Metadata
    points INTEGER DEFAULT 5,
    difficulty TEXT, -- 'easy', 'medium', 'hard'
    order_num INTEGER
);
```

#### **Quiz Flow (In-App Submission):**
```javascript
class LessonQuiz {
    constructor(lessonId) {
        this.lessonId = lessonId;
        this.questions = [];
        this.currentIndex = 0;
        this.answers = [];
        this.started = false;
    }
    
    async loadQuestions() {
        // Fetch from Supabase (similar to your game_progress queries)
        const { data, error } = await supabase
            .from('food_history_questions')
            .select('*')
            .eq('lesson_id', this.lessonId)
            .order('order_num');
        
        this.questions = data;
        return this.questions;
    }
    
    displayQuestion() {
        const q = this.questions[this.currentIndex];
        
        document.getElementById('question-text').textContent = q.question_text;
        
        if (q.question_type === 'multiple_choice') {
            this.renderMultipleChoice(q);
        } else if (q.question_type === 'short_answer') {
            this.renderShortAnswer(q);
        } else if (q.question_type === 'geography_map') {
            this.renderMapQuestion(q);
        }
    }
    
    async submitAnswer(answer) {
        const q = this.questions[this.currentIndex];
        
        let correct = false;
        let pointsEarned = 0;
        
        // Check answer
        if (q.question_type === 'multiple_choice') {
            correct = (answer === q.correct_answer);
            pointsEarned = correct ? q.points : 0;
        } else if (q.question_type === 'short_answer') {
            // Use AI to grade (similar to your AI integrations)
            const gradeResult = await gradeShortAnswer(q.question_text, answer, q.correct_answer);
            correct = gradeResult.partialCredit > 0.8;
            pointsEarned = Math.round(q.points * gradeResult.partialCredit);
        } else if (q.question_type === 'geography_map') {
            correct = this.checkGeographyAnswer(answer.lat, answer.lng, q.correct_answer);
            pointsEarned = correct ? q.points : 0;
        }
        
        // Save answer
        this.answers.push({
            questionId: q.id,
            studentAnswer: answer,
            correct: correct,
            pointsEarned: pointsEarned,
            explanationShown: false
        });
        
        // Show immediate feedback
        this.showFeedback(correct, q.explanation);
        
        // Auto-save progress (like your localStorage + Supabase pattern)
        this.autoSave();
    }
    
    async finishQuiz() {
        const totalPoints = this.answers.reduce((sum, a) => sum + a.pointsEarned, 0);
        const maxPoints = this.questions.reduce((sum, q) => sum + q.points, 0);
        const percentage = (totalPoints / maxPoints) * 100;
        const passed = percentage >= 80;
        
        // Save to Supabase (similar to your game_progress saves)
        const { data, error } = await supabase
            .from('food_history_quiz_attempts')
            .insert({
                student_profile_id: currentStudent.id,
                lesson_id: this.lessonId,
                quiz_type: 'lesson',
                score: totalPoints,
                total_points: maxPoints,
                percentage: percentage,
                passed: passed,
                answers: this.answers,
                time_taken_minutes: this.calculateTimeSpent(),
                attempt_number: await this.getAttemptNumber()
            });
        
        if (passed) {
            // Unlock next lesson
            await this.unlockNextLesson();
        }
        
        // Show results modal
        this.showResults(percentage, passed);
    }
}
```

---

### 5. **AI Tutor - How It Works**

**Similar to your AI Facts feature in Geography app, but more conversational:**

#### **Integration Point:**
```javascript
// Floating chat button (like your sidebar sections)
<button id="ai-tutor-btn" class="floating-tutor-btn">
    💬 Ask AI Tutor
</button>

<div id="ai-tutor-sidebar" class="tutor-sidebar hidden">
    <div class="tutor-messages" id="tutor-chat"></div>
    <input type="text" id="tutor-input" placeholder="Ask a question..." />
    <button onclick="sendToTutor()">Send</button>
</div>
```

#### **Backend (Netlify Function, like your existing functions/):**
```javascript
// netlify/functions/ai-tutor.js
import Anthropic from "@anthropic-ai/sdk";

export async function handler(event, context) {
    const { studentId, lessonId, message, conversationHistory } = JSON.parse(event.body);
    
    // Load student context
    const student = await getStudentProfile(studentId);
    const lesson = await getLessonContent(lessonId);
    
    // Build system prompt
    const systemPrompt = `You are a food history tutor helping ${student.name}, a ${student.age}-year-old student.

CURRENT LESSON: ${lesson.title}
TOPICS COVERED: ${lesson.topics.join(', ')}

STUDENT PROFILE:
- Geography weakness (2/10) - reinforce locations constantly
- Loves video and interactive content
- Aspiring chef
- Lives in rural Alaska

YOUR ROLE:
- Use Socratic method (ask questions, don't give answers)
- Connect to Timothy's chef aspirations
- Reinforce geography ("Where is that?" frequently)
- Never complete assignments for him

FORBIDDEN:
- Writing essays or answers
- Giving quiz answers directly
- Doing his work`;

    // Check for cheating attempts
    if (detectCheatingAttempt(message)) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                reply: "I can help you understand concepts, but I can't give you direct answers to quizzes or write your assignments. What part of the concept are you struggling with?",
                flagged: true
            })
        };
    }
    
    // Call Claude Opus 4.6 (you have Anthropic API key in .env)
    const anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY
    });
    
    const response = await anthropic.messages.create({
        model: "claude-opus-4.6",
        max_tokens: 1024,
        system: systemPrompt,
        messages: [
            ...conversationHistory,
            { role: "user", content: message }
        ]
    });
    
    const reply = response.content[0].text;
    
    // Save conversation to database
    await saveConversation(studentId, lessonId, message, reply);
    
    return {
        statusCode: 200,
        body: JSON.stringify({
            reply: reply,
            tokensUsed: response.usage.output_tokens,
            flagged: false
        })
    };
}
```

---

### 6. **Completion Criteria - How Teacher Sees Student Work**

**Based on your Teacher Dashboard architecture:**

#### **Database Tracking:**
```sql
-- New table for lesson completion
CREATE TABLE food_history_lesson_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_profile_id UUID REFERENCES profiles(id),
    unit_id INTEGER,
    lesson_id TEXT,
    
    -- Completion tracking
    reading_completed BOOLEAN DEFAULT FALSE,
    videos_watched JSONB, -- {videoId: watchPercentage}
    activities_completed JSONB, -- {activityId: completed, timestamp}
    geography_passed BOOLEAN DEFAULT FALSE,
    quiz_passed BOOLEAN DEFAULT FALSE,
    
    -- Timing
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    time_spent_minutes INTEGER,
    
    -- Status
    status TEXT DEFAULT 'not_started' -- 'not_started', 'in_progress', 'completed'
);
```

#### **What Teacher/Parent Sees:**
```javascript
// Teacher Dashboard - Student Detail View
async function loadStudentProgress(studentId) {
    const { data: progress } = await supabase
        .from('food_history_lesson_progress')
        .select(`
            *,
            food_history_quiz_attempts(*),
            food_history_essays(*),
            food_history_projects(*)
        `)
        .eq('student_profile_id', studentId);
    
    // Render dashboard
    return {
        unitsCompleted: calculateCompletedUnits(progress),
        currentUnit: findCurrentUnit(progress),
        timeSpent: calculateTotalTime(progress),
        quizScores: extractQuizScores(progress),
        essaysToGrade: findPendingEssays(progress),
        projectsToGrade: findPendingProjects(progress),
        aiTutorConversations: await loadAIConversations(studentId),
        geographyImprovement: calculateGeographyProgress(progress)
    };
}
```

#### **Teacher Dashboard UI (Similar to your existing dashboard):**
```html
<!-- Based on your neo-brutalism card style -->
<div class="teacher-dashboard">
    <div class="student-overview-card">
        <h2>Timothy - Food History Progress</h2>
        
        <div class="progress-stats">
            <div class="stat">
                <span class="stat-label">Units Completed</span>
                <span class="stat-value">3 / 20</span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 15%"></div>
                </div>
            </div>
            
            <div class="stat">
                <span class="stat-label">Geography Progress</span>
                <span class="stat-value">5/10 → 📈 Improving!</span>
            </div>
            
            <div class="stat">
                <span class="stat-label">Time Spent This Week</span>
                <span class="stat-value">8.5 hours</span>
            </div>
        </div>
    </div>
    
    <!-- Essays to Grade -->
    <div class="pending-work-card">
        <h3>📝 Essays Awaiting Review (2)</h3>
        
        <div class="essay-item">
            <span>Unit 3 Essay: Agricultural Revolution Comparison</span>
            <span class="word-count">847 words</span>
            <button onclick="gradeEssay('unit3-essay')">Grade Now</button>
        </div>
    </div>
    
    <!-- Recent Activity -->
    <div class="activity-feed">
        <h3>📊 Recent Activity</h3>
        <ul>
            <li>✅ Passed Unit 3, Lesson 4 quiz (92%)</li>
            <li>📺 Watched: "The Columbian Exchange" video</li>
            <li>💬 Asked AI Tutor 3 questions about spice trade</li>
            <li>🗺️ Completed Silk Road map tracing activity</li>
        </ul>
    </div>
    
    <!-- AI Tutor Monitoring -->
    <div class="ai-tutor-card">
        <h3>💬 AI Tutor Conversations (7 this week)</h3>
        <button onclick="viewConversations()">View All</button>
        <div class="flagged-notice" style="display: none;">
            ⚠️ 1 conversation flagged for review
        </div>
    </div>
</div>
```

---

### 7. **Student Submission Flow - Everything In-App**

**NO Google Docs needed - all in-app submission to Supabase!**

#### **Essay Submission:**
```javascript
// Rich text editor (or simple textarea)
<div id="essay-editor">
    <h2>Unit 3 Essay Prompt</h2>
    <p class="prompt">
        "Compare agricultural development in two different regions. 
        How did geography influence what was domesticated?"
    </p>
    
    <textarea id="essay-content" rows="20"></textarea>
    <div class="word-count">Word count: <span id="count">0</span> / 1000</div>
    
    <button onclick="saveDraft()">Save Draft</button>
    <button onclick="submitEssay()">Submit for Grading</button>
</div>

<script>
async function submitEssay() {
    const content = document.getElementById('essay-content').value;
    const wordCount = content.trim().split(/\s+/).length;
    
    // Save to Supabase
    const { data, error } = await supabase
        .from('food_history_essays')
        .insert({
            student_profile_id: currentStudent.id,
            unit_id: 3,
            prompt: "Compare agricultural development...",
            content: content,
            word_count: wordCount,
            submitted_at: new Date(),
            status: 'pending_review'
        });
    
    if (!error) {
        showNotification("Essay submitted! Your teacher will review it soon.");
        
        // Send email notification to parent/teacher
        await fetch('/.netlify/functions/send-notification', {
            method: 'POST',
            body: JSON.stringify({
                teacherId: currentStudent.teacherId,
                type: 'essay_submitted',
                studentName: currentStudent.name,
                unitId: 3
            })
        });
    }
}
</script>
```

#### **Project Submission (File Upload):**
```javascript
// Upload to Supabase Storage (like your photo uploads)
<div id="project-upload">
    <h2>Unit 5 Project: Columbian Exchange Infographic</h2>
    
    <input type="file" 
           id="project-file" 
           accept="image/*,application/pdf"
           onchange="previewFile()" />
    
    <div id="file-preview"></div>
    
    <textarea id="project-reflection" 
              placeholder="What did you learn creating this?"></textarea>
    
    <button onclick="submitProject()">Submit Project</button>
</div>

<script>
async function submitProject() {
    const fileInput = document.getElementById('project-file');
    const file = fileInput.files[0];
    const reflection = document.getElementById('project-reflection').value;
    
    // Upload file to Supabase Storage
    const fileName = `${currentStudent.id}/unit5-project-${Date.now()}.${file.name.split('.').pop()}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
        .from('food-history-projects')
        .upload(fileName, file);
    
    if (!uploadError) {
        // Get public URL
        const { data: urlData } = supabase.storage
            .from('food-history-projects')
            .getPublicUrl(fileName);
        
        // Save project record
        const { data, error } = await supabase
            .from('food_history_projects')
            .insert({
                student_profile_id: currentStudent.id,
                unit_id: 5,
                project_type: 'infographic',
                title: 'Columbian Exchange Infographic',
                file_url: urlData.publicUrl,
                reflection: reflection,
                submitted_at: new Date(),
                status: 'pending_review'
            });
        
        showNotification("Project submitted! ✅");
    }
}
</script>
```

---

### 8. **Parent Dashboard - What It Does**

**Extends your existing Teacher Dashboard pattern:**

#### **Parent Can See:**
1. **Progress Overview** (units completed, time spent)
2. **Grade Essays** (using rubric interface)
3. **Grade Projects** (view files, provide feedback)
4. **Monitor AI Tutor** (view conversations, see flags)
5. **Analytics** (struggling areas, strengths, time spent per unit)
6. **Download Transcripts** (for college applications)

#### **Grading Interface Example:**
```html
<div class="grading-interface">
    <div class="essay-content">
        <h3>Timothy's Essay - Unit 3</h3>
        <div class="essay-text">
            [Full essay content here, 847 words]
        </div>
    </div>
    
    <div class="rubric">
        <h3>Grading Rubric</h3>
        
        <div class="rubric-item">
            <label>Thesis & Argument (0-25 points)</label>
            <input type="number" min="0" max="25" id="thesis-score" />
            <p class="rubric-desc">Clear thesis, well-supported argument</p>
        </div>
        
        <div class="rubric-item">
            <label>Use of Evidence (0-25 points)</label>
            <input type="number" min="0" max="25" id="evidence-score" />
            <p class="rubric-desc">Specific examples from lessons, accurate facts</p>
        </div>
        
        <div class="rubric-item">
            <label>Geographic Understanding (0-25 points)</label>
            <input type="number" min="0" max="25" id="geography-score" />
            <p class="rubric-desc">Demonstrates spatial understanding, accurate locations</p>
        </div>
        
        <div class="rubric-item">
            <label>Writing Quality (0-25 points)</label>
            <input type="number" min="0" max="25" id="writing-score" />
            <p class="rubric-desc">Clear, organized, proper grammar/spelling</p>
        </div>
        
        <div class="total-score">
            Total: <span id="total">0</span> / 100
        </div>
        
        <textarea id="feedback" placeholder="Written feedback for Timothy..."></textarea>
        
        <button onclick="submitGrade()">Submit Grade</button>
    </div>
</div>

<script>
async function submitGrade() {
    const scores = {
        thesis: parseInt(document.getElementById('thesis-score').value),
        evidence: parseInt(document.getElementById('evidence-score').value),
        geography: parseInt(document.getElementById('geography-score').value),
        writing: parseInt(document.getElementById('writing-score').value)
    };
    
    const total = scores.thesis + scores.evidence + scores.geography + scores.writing;
    const feedback = document.getElementById('feedback').value;
    
    // Update essay record
    const { data, error } = await supabase
        .from('food_history_essays')
        .update({
            score: total,
            rubric_scores: scores,
            parent_feedback: feedback,
            graded_at: new Date(),
            status: 'graded'
        })
        .eq('id', currentEssayId);
    
    if (!error) {
        // Notify student
        await fetch('/.netlify/functions/send-notification', {
            method: 'POST',
            body: JSON.stringify({
                studentId: currentStudent.id,
                type: 'essay_graded',
                score: total,
                unitId: 3
            })
        });
        
        showNotification("Grade submitted! Timothy has been notified.");
        returnToDashboard();
    }
}
</script>
```

---

## 🎯 SUMMARY - TECHNICAL DECISIONS

| Feature | Technology | Based On |
|---------|-----------|----------|
| **Maps** | Leaflet 1.9.4 | Your Geography Detective Academy exact setup |
| **Videos** | YouTube Data API v3 + iframe API | Your existing API key, new endpoint |
| **Database** | Supabase (PostgreSQL) | Your existing project, new tables |
| **Auth** | Supabase Auth | Your existing auth system |
| **Quiz System** | In-app + Supabase | Based on Bubble Brain quiz architecture |
| **AI Tutor** | Claude Opus 4.6 via Netlify Functions | Based on your AI Facts pattern |
| **File Upload** | Supabase Storage | Your existing storage bucket pattern |
| **Teacher Dashboard** | Web interface + Supabase RLS | Your existing Teacher Dashboard design |
| **Deployment** | Netlify | Same as your Geography app |

---

## 🚀 NEXT STEP: Update Lesson Template

Now that we know the technical architecture, I'll update the lesson template to specify:
- Exact database fields to populate
- Exact Supabase queries to use
- Exact Leaflet code patterns
- Exact quiz question format

**Should I proceed to create detailed lesson specs using this architecture?**
