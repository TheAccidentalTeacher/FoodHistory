/**
 * Database Seeding Script for Food Throughout History
 * 
 * This script parses unit specification markdown files and seeds the Supabase database
 * with units, lessons, reading sections, videos, quizzes, and more.
 * 
 * Usage:
 *   npm run seed              # Seed all units
 *   npm run seed -- --unit 4  # Seed only Unit 4
 */

import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

// Initialize Supabase client with service role key (bypasses RLS)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables!')
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Types matching our database schema
interface Unit {
  number: number
  title: string
  geographic_focus: string
  historical_era: string
  duration_weeks: number
  learning_objectives: string[]
  summary: string
  hands_on_project_type: string
  essay_prompt: string
  geography_focus: Record<string, any>
  order: number
}

interface Lesson {
  unit_id: number
  lesson_number: number
  title: string
  content: string
  reading_time_minutes: number
  video_ids: string[]
  learning_objectives: string[]
  order: number
}

interface ReadingSection {
  lesson_id: string
  section_number: number
  title: string
  content: string
  word_count: number
  order: number
}

interface Video {
  lesson_id: string
  youtube_id: string
  title: string
  description: string
  duration_seconds: number
  order: number
}

interface QuizQuestion {
  quiz_id: string
  question_type: 'multiple_choice' | 'short_answer' | 'true_false'
  question_text: string
  options: string[]
  correct_answer: string
  explanation: string
  points: number
  order: number
}

/**
 * Parse a unit specification markdown file
 */
function parseUnitMarkdown(filePath: string): {
  unit: Unit
  lessons: Lesson[]
  quizQuestions: Array<{ lessonNumber: number; questions: Omit<QuizQuestion, 'quiz_id'>[] }>
} {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')

  let unit: Partial<Unit> = {}
  let lessons: Lesson[] = []
  let currentLesson: Partial<Lesson> | null = null
  let currentSection = ''
  let lessonCounter = 0
  let quizQuestions: Array<{ lessonNumber: number; questions: Omit<QuizQuestion, 'quiz_id'>[] }> = []
  let currentQuestions: Omit<QuizQuestion, 'quiz_id'>[] = []
  let currentLessonForQuiz = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Parse unit metadata
    if (line.startsWith('# Unit ')) {
      const match = line.match(/# Unit (\d+): (.+)/)
      if (match) {
        unit.number = parseInt(match[1])
        unit.title = match[2]
        unit.order = parseInt(match[1])
      }
    }

    if (line.startsWith('**Geographic Focus:**')) {
      unit.geographic_focus = lines[i + 1]?.trim() || ''
    }

    if (line.startsWith('**Historical Era:**')) {
      unit.historical_era = lines[i + 1]?.trim() || ''
    }

    if (line.startsWith('**Duration:**')) {
      const match = lines[i + 1]?.match(/(\d+)/)
      unit.duration_weeks = match ? parseInt(match[1]) : 4
    }

    // Parse lessons
    if (line.match(/^## Lesson \d+:/)) {
      if (currentLesson && currentLesson.title) {
        lessons.push(currentLesson as Lesson)
      }
      lessonCounter++
      const match = line.match(/## Lesson (\d+): (.+)/)
      currentLesson = {
        unit_id: unit.number!,
        lesson_number: lessonCounter,
        title: match ? match[2] : '',
        content: '',
        reading_time_minutes: 15,
        video_ids: [],
        learning_objectives: [],
        order: lessonCounter
      }
    }

    // Parse video IDs (YouTube links)
    if (line.includes('youtube.com/watch?v=') || line.includes('youtu.be/')) {
      const match = line.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)
      if (match && currentLesson) {
        currentLesson.video_ids = currentLesson.video_ids || []
        if (!currentLesson.video_ids.includes(match[1])) {
          currentLesson.video_ids.push(match[1])
        }
      }
    }

    // Collect lesson content
    if (currentLesson && !line.startsWith('#') && line.trim()) {
      currentLesson.content += line + '\n'
    }

    // Parse quiz questions
    if (line.match(/^### Lesson \d+ Quiz/)) {
      const match = line.match(/### Lesson (\d+) Quiz/)
      currentLessonForQuiz = match ? parseInt(match[1]) : 0
      currentQuestions = []
    }

    if (currentLessonForQuiz > 0 && line.match(/^\d+\.\s+/)) {
      // Question text
      const questionText = line.replace(/^\d+\.\s+/, '').trim()
      let options: string[] = []
      let correctAnswer = ''
      let explanation = ''

      // Look ahead for options and answer
      for (let j = i + 1; j < Math.min(i + 10, lines.length); j++) {
        const nextLine = lines[j]
        if (nextLine.match(/^\s+[A-D]\)/)) {
          options.push(nextLine.trim().replace(/^[A-D]\)\s*/, ''))
        }
        if (nextLine.includes('**Answer:**')) {
          correctAnswer = nextLine.replace('**Answer:**', '').trim()
        }
        if (nextLine.includes('**Explanation:**')) {
          explanation = nextLine.replace('**Explanation:**', '').trim()
        }
        if (nextLine.match(/^\d+\.\s+/) || nextLine.startsWith('##')) {
          break
        }
      }

      currentQuestions.push({
        question_type: options.length > 0 ? 'multiple_choice' : 'short_answer',
        question_text: questionText,
        options: options.length > 0 ? options : [],
        correct_answer: correctAnswer,
        explanation: explanation,
        points: 1,
        order: currentQuestions.length + 1
      })
    }

    // Save quiz questions when moving to next section
    if (currentQuestions.length > 0 && line.startsWith('##') && !line.includes('Quiz')) {
      quizQuestions.push({
        lessonNumber: currentLessonForQuiz,
        questions: currentQuestions
      })
      currentQuestions = []
      currentLessonForQuiz = 0
    }
  }

  // Add last lesson
  if (currentLesson && currentLesson.title) {
    lessons.push(currentLesson as Lesson)
  }

  // Add last quiz
  if (currentQuestions.length > 0) {
    quizQuestions.push({
      lessonNumber: currentLessonForQuiz,
      questions: currentQuestions
    })
  }

  // Set defaults
  unit.summary = unit.title || ''
  unit.learning_objectives = []
  unit.hands_on_project_type = 'essay'
  unit.essay_prompt = `Write a comprehensive essay about ${unit.title}`
  unit.geography_focus = {}

  return {
    unit: unit as Unit,
    lessons,
    quizQuestions
  }
}

/**
 * Seed a single unit into the database
 */
async function seedUnit(unitNumber: number) {
  console.log(`\n📦 Seeding Unit ${unitNumber}...`)

  const unitFilePath = path.join(process.cwd(), `UNIT-${unitNumber}-COMPLETE-SPECIFICATION.md`)

  if (!fs.existsSync(unitFilePath)) {
    console.error(`❌ File not found: ${unitFilePath}`)
    return false
  }

  try {
    const { unit, lessons, quizQuestions } = parseUnitMarkdown(unitFilePath)

    // Insert unit
    console.log(`  📝 Inserting unit: ${unit.title}`)
    const { data: insertedUnit, error: unitError } = await supabase
      .from('units')
      .upsert(unit, { onConflict: 'number' })
      .select()
      .single()

    if (unitError) {
      console.error(`  ❌ Error inserting unit:`, unitError.message)
      return false
    }

    console.log(`  ✅ Unit inserted with ID: ${insertedUnit.id}`)

    // Insert lessons
    for (const lesson of lessons) {
      lesson.unit_id = insertedUnit.id
      console.log(`    📄 Inserting Lesson ${lesson.lesson_number}: ${lesson.title}`)

      const { data: insertedLesson, error: lessonError } = await supabase
        .from('lessons')
        .upsert(lesson, { onConflict: 'unit_id,lesson_number' })
        .select()
        .single()

      if (lessonError) {
        console.error(`    ❌ Error inserting lesson:`, lessonError.message)
        continue
      }

      // Insert quiz for this lesson
      const lessonQuiz = quizQuestions.find(q => q.lessonNumber === lesson.lesson_number)
      if (lessonQuiz && lessonQuiz.questions.length > 0) {
        console.log(`      🎯 Creating quiz with ${lessonQuiz.questions.length} questions`)

        const { data: insertedQuiz, error: quizError } = await supabase
          .from('quizzes')
          .upsert({
            lesson_id: insertedLesson.id,
            quiz_type: 'lesson',
            title: `${lesson.title} - Quiz`,
            passing_score: 80,
            time_limit_minutes: 20
          })
          .select()
          .single()

        if (quizError) {
          console.error(`      ❌ Error creating quiz:`, quizError.message)
          continue
        }

        // Insert quiz questions
        const questionsWithQuizId = lessonQuiz.questions.map(q => ({
          ...q,
          quiz_id: insertedQuiz.id
        }))

        const { error: questionsError } = await supabase
          .from('quiz_questions')
          .insert(questionsWithQuizId)

        if (questionsError) {
          console.error(`      ❌ Error inserting questions:`, questionsError.message)
        } else {
          console.log(`      ✅ Inserted ${questionsWithQuizId.length} questions`)
        }
      }

      // Insert videos
      if (insertedLesson.video_ids && Array.isArray(insertedLesson.video_ids)) {
        for (let v = 0; v < insertedLesson.video_ids.length; v++) {
          const videoId = insertedLesson.video_ids[v]
          await supabase.from('videos').insert({
            lesson_id: insertedLesson.id,
            youtube_id: videoId,
            title: `Video ${v + 1}`,
            description: '',
            duration_seconds: 0,
            order: v + 1
          })
        }
        console.log(`      🎬 Inserted ${insertedLesson.video_ids.length} videos`)
      }
    }

    console.log(`✅ Unit ${unitNumber} seeded successfully!\n`)
    return true

  } catch (error) {
    console.error(`❌ Error seeding unit ${unitNumber}:`, error)
    return false
  }
}

/**
 * Main seeding function
 */
async function main() {
  const args = process.argv.slice(2)
  const unitFlag = args.indexOf('--unit')
  const specificUnit = unitFlag !== -1 ? parseInt(args[unitFlag + 1]) : null

  console.log('🌱 Food Throughout History - Database Seeder\n')
  console.log(`📡 Connected to: ${supabaseUrl}`)

  if (specificUnit) {
    console.log(`🎯 Seeding Unit ${specificUnit} only\n`)
    await seedUnit(specificUnit)
  } else {
    console.log('🎯 Seeding all available units\n')

    // Seed Units 4, 5, 6 (the ones we have complete specifications for)
    const unitsToSeed = [4, 5, 6]

    for (const unitNum of unitsToSeed) {
      await seedUnit(unitNum)
    }
  }

  console.log('🎉 Seeding complete!')
}

// Run the script
main().catch(console.error)
