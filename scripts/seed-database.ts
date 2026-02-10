/**
 * Database Seeding Script - CLEAN CONTENT EXTRACTION
 * Extracts beautiful, formatted lesson content from specification files
 * NO metadata, NO section numbers, NO AI slop - just clean educational content
 */

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

interface ParsedLesson {
  lesson_number: number
  title: string
  content: string
  reading_time_minutes: number
  objectives: string[]
  videos: ParsedVideo[]
  activities: ParsedActivity[]
  quiz: ParsedQuiz | null
}

interface ParsedVideo {
  title: string
  description: string
  youtube_id: string
  duration_seconds: number
  sequence_order: number
}

interface ParsedActivity {
  title: string
  activity_type: string
  instructions: string
  activity_data: any
  points_possible: number
  sequence_order: number
}

interface ParsedQuiz {
  title: string
  time_limit_minutes: number | null
  passing_score: number
  max_attempts: number | null
  questions: ParsedQuizQuestion[]
}

interface ParsedQuizQuestion {
  question_text: string
  question_type: 'multiple_choice' | 'short_answer'
  correct_answer: string
  options: string[] | null
  points: number
  sequence_order: number
  explanation: string | null
}

/**
 * Extract lesson content - simple approach
 * Just grab everything between lesson header and next major section
 * Clean up section metadata headers but keep all content
 */
function extractCleanContent(lessonText: string): string {
  const lines = lessonText.split('\n')
  const output: string[] = []
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    // Skip the first line if it's the lesson header
    if (i === 0 && trimmed.match(/^#{1,2}\s+(?:LESSON|Lesson)\s+\d+:/i)) {
      continue
    }

    // Stop at these major sections
    if (trimmed.match(/^##\s+(VIDEOS?|INTERACTIVE|GEOGRAPHY|QUIZ|LESSON\s+COMPLETION)/i)) {
      break
    }

    // Stop at next lesson
    if (i > 0 && trimmed.match(/^#{1,2}\s+(?:LESSON|Lesson)\s+\d+:/i)) {
      break
    }

    // Stop at unit-level sections
    if (trimmed.match(/^#\s+UNIT\s+\d+\s+(ESSAY|PROJECT|TEST|COMPLETION)/i)) {
      break
    }

    // Skip "## READING CONTENT" header
    if (trimmed.match(/^##\s+(?:READING\s+CONTENT|Lesson\s+Metadata)/i)) {
      continue
    }

    // Skip duration metadata lines
    if (trimmed.match(/^\(.*minutes.*\)$/i)) {
      continue
    }

    // Skip section headers with duration: "### Section 1: Title (7 minutes, ~900 words)"
    // But DON'T skip regular headers
    if (trimmed.match(/^###\s+.+\(\d+\s+minutes?,\s*~?\d+\s*words?\)/i)) {
      continue
    }

    // Remove "Section N:" prefix from headers if present
    if (trimmed.match(/^###\s+Section\s+\d+:/i)) {
      output.push(line.replace(/^(###\s+)Section\s+\d+:\s+/i, '$1'))
      continue
    }

    // Include everything else
    output.push(line)
  }

  return output.join('\n').trim()
}

/**
 * Extract videos from VIDEOS section
 */
function extractVideos(lessonText: string): ParsedVideo[] {
  const videos: ParsedVideo[] = []
  const videoRegex = /###\s+Video\s+\d+:\s+"(.+?)"\s+\((\d+)-?(\d+)?\s+minutes\)/gi
  let match
  let seqOrder = 1

  while ((match = videoRegex.exec(lessonText)) !== null) {
    const title = match[1]
    const minDuration = parseInt(match[2])
    const maxDuration = match[3] ? parseInt(match[3]) : minDuration
    const avgDuration = Math.round((minDuration + maxDuration) / 2)

    videos.push({
      title,
      description: `Educational video: ${title}`,
      youtube_id: 'PLACEHOLDER', // Will be populated manually or via YouTube API
      duration_seconds: avgDuration * 60,
      sequence_order: seqOrder++
    })
  }

  return videos
}

/**
 * Extract activities from INTERACTIVE ACTIVITIES section
 */
function extractActivities(lessonText: string): ParsedActivity[] {
  const activities: ParsedActivity[] = []
  
  // Match activity headers like "### Activity 1: Personal Food History Reflection (12 minutes)"
  const activityRegex = /###\s+Activity\s+\d+:\s+(.+?)\s+\(\d+\s+minutes\)/gi
  const matches = lessonText.matchAll(activityRegex)
  let seqOrder = 1

  for (const match of matches) {
    const title = match[1]
    
    // Determine activity type based on title keywords
    let activity_type = 'reflection'
    if (title.toLowerCase().includes('map') || title.toLowerCase().includes('geography') || title.toLowerCase().includes('continent')) {
      activity_type = 'map_interaction'
    } else if (title.toLowerCase().includes('quiz') || title.toLowerCase().includes('question')) {
      activity_type = 'quiz'
    } else if (title.toLowerCase().includes('timeline') || title.toLowerCase().includes('chronology')) {
      activity_type = 'timeline'
    }

    activities.push({
      title,
      activity_type,
      instructions: `Complete the ${title.toLowerCase()} activity`,
      activity_data: { type: activity_type },
      points_possible: 10,
      sequence_order: seqOrder++
    })
  }

  return activities
}

/**
 * Extract quiz from LESSON QUIZ section
 */
function extractQuiz(lessonText: string): ParsedQuiz | null {
  // Check if there's a quiz section
  if (!lessonText.includes('## LESSON QUIZ')) {
    return null
  }

  const questions: ParsedQuizQuestion[] = []
  
  // Extract passing score
  const passingScoreMatch = lessonText.match(/\*\*Passing Score:\*\*\s+(\d+)%/i)
  const passingScore = passingScoreMatch ? parseInt(passingScoreMatch[1]) : 80

  // Extract max attempts
  const maxAttemptsMatch = lessonText.match(/\*\*Retakes Allowed:\*\*\s+Up to\s+(\d+)/i)
  const maxAttempts = maxAttemptsMatch ? parseInt(maxAttemptsMatch[1]) : 3

  // Extract each question block - match from **Question N:** to next **Question or **Expected
  const questionBlocks = lessonText.split(/(?=\*\*Question\s+\d+:)/gi).slice(1)

  let seqOrder = 1
  for (const block of questionBlocks) {
    // Stop at short answer questions section (handled separately)
    if (block.includes('**Expected Answer Elements:**') || block.includes('### Short Answer')) {
      break
    }

    // Extract question number and text
    const questionMatch = block.match(/\*\*Question\s+(\d+):\*\*\s*\n(.+?)\n([A-D]\))/s)
    if (!questionMatch) continue

    const questionText = questionMatch[2].trim()

    // Extract all options (A through D)
    const optionMatches = [...block.matchAll(/([A-D])\)\s+(.+?)(?:\s+✓)?\s*\n/g)]
    if (optionMatches.length < 2) continue

    const options = optionMatches.map(m => m[2].trim())
    
    // Find correct answer (marked with ✓)
    const correctMatch = optionMatches.find(m => m[0].includes('✓'))
    const correctAnswer = correctMatch ? correctMatch[1] : 'B'

    // Extract explanation
    const explanationMatch = block.match(/\*\*Explanation:\*\*\s+(.+?)(?=\n\n|\n---|$)/s)
    const explanation = explanationMatch ? explanationMatch[1].trim() : null

    questions.push({
      question_text: questionText,
      question_type: 'multiple_choice',
      correct_answer: correctAnswer,
      options,
      points: 5,
      sequence_order: seqOrder++,
      explanation
    })
  }

  // Extract short answer questions if any
  const shortAnswerRegex = /\*\*Question\s+(\d+):\*\*\s*\n(.+?)\n\n\*\*Expected Answer Elements:\*\*/gs
  let saMatch
  while ((saMatch = shortAnswerRegex.exec(lessonText)) !== null && seqOrder <= 15) {
    const questionText = saMatch[2].trim()

    questions.push({
      question_text: questionText,
      question_type: 'short_answer',
      correct_answer: '', // Will need manual grading or AI grading
      options: null,
      points: 5,
      sequence_order: seqOrder++,
      explanation: 'This question requires written response and will be graded based on key concepts.'
    })
  }

  if (questions.length === 0) {
    return null
  }

  return {
    title: 'Lesson Quiz',
    time_limit_minutes: null,
    passing_score: passingScore,
    max_attempts: maxAttempts,
    questions
  }
}

/**
 * Parse unit metadata from file header
 */
function parseUnitMetadata(content: string) {
  const lines = content.split('\n')
  let unitNumber = 0
  let unitTitle = ''
  let era = 'Not specified'
  let region = 'Not specified'
  let description = ''

  for (let i = 0; i < Math.min(lines.length, 150); i++) {
    const line = lines[i]
    const h1Match = line.match(/^#\s+UNIT\s+(\d+):\s+(.+)/i)
    if (h1Match) {
      unitNumber = parseInt(h1Match[1])
      unitTitle = h1Match[2].trim()
    }
    if (line.includes('**Geographic Focus:**')) {
      const after = line.split('**Geographic Focus:**')[1]?.trim()
      region = after || lines[i + 1]?.trim() || region
    }
    if (line.includes('**Historical Era:**')) {
      const after = line.split('**Historical Era:**')[1]?.trim()
      era = after || lines[i + 1]?.trim() || era
    }
  }

  // Build description from Unit Overview
  const overviewMatch = content.match(/##\s+UNIT OVERVIEW([\s\S]{200,800}?)(?=#{1,3}|$)/i)
  if (overviewMatch) {
    description = overviewMatch[1]
      .split('\n')
      .filter(l => {
        const t = l.trim()
        return t && !t.startsWith('#') && !t.startsWith('**') && !t.startsWith('-') && !t.startsWith('---')
      })
      .join(' ')
      .trim()
      .substring(0, 500)
  }

  return {
    number: unitNumber,
    title: unitTitle.substring(0, 200),
    description: description || unitTitle.substring(0, 500),
    era: era.substring(0, 100),
    region: region.substring(0, 100)
  }
}

/**
 * Parse all lessons from unit file
 */
function parseAllLessons(content: string): ParsedLesson[] {
  const lessons: ParsedLesson[] = []
  const lessonPattern = /^#{1,2}\s+(?:LESSON|Lesson)\s+(\d+):\s+(.+)/gm
  const matches = Array.from(content.matchAll(lessonPattern))

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i]
    const lessonNum = parseInt(match[1])
    const lessonTitle = match[2].trim()
    const startIndex = match.index!
    const endIndex = i < matches.length - 1 ? matches[i + 1].index! : content.length
    const lessonText = content.substring(startIndex, endIndex)

    const cleanContent = extractCleanContent(lessonText)
    
    if (!cleanContent || cleanContent.length < 100) {
      console.log(`    ⚠️  Warning: Lesson ${lessonNum} has no substantial content`)
      continue
    }

    const wordCount = cleanContent.split(/\s+/).length
    const readingTime = Math.max(10, Math.ceil(wordCount / 200))

    // Extract objectives
    const objectives: string[] = []
    const objMatch = lessonText.match(/###\s+Learning Objectives([\s\S]+?)(?=###|##|$)/i)
    if (objMatch) {
      const objMatches = objMatch[1].match(/^\d+\.\s+(.+)/gm)
      if (objMatches) {
        objectives.push(...objMatches.map(s => s.replace(/^\d+\.\s+/, '').trim()).slice(0, 5))
      }
    }

    // Extract videos, activities, and quiz
    const videos = extractVideos(lessonText)
    const activities = extractActivities(lessonText)
    const quiz = extractQuiz(lessonText)

    lessons.push({
      lesson_number: lessonNum,
      title: lessonTitle.substring(0, 200),
      content: cleanContent,
      reading_time_minutes: readingTime,
      objectives,
      videos,
      activities,
      quiz
    })

    console.log(`    ✅ Lesson ${lessonNum}: ${lessonTitle}`)
    console.log(`       ${wordCount} words, ~${readingTime} min read`)
    if (videos.length > 0) console.log(`       ${videos.length} video(s)`)
    if (activities.length > 0) console.log(`       ${activities.length} activity(ies)`)
    if (quiz) console.log(`       Quiz with ${quiz.questions.length} questions`)
  }

  return lessons
}

/**
 * Seed a single unit
 */
async function seedUnit(unitNumber: number) {
  console.log(`\n📦 Seeding Unit ${unitNumber}...`)

  const unitFilePath = path.join(process.cwd(), `UNIT-${unitNumber}-COMPLETE-SPECIFICATION.md`)
  if (!fs.existsSync(unitFilePath)) {
    console.error(`  ❌ File not found`)
    return false
  }

  try {
    const content = fs.readFileSync(unitFilePath, 'utf-8')
    const unit = parseUnitMetadata(content)
    const lessons = parseAllLessons(content)

    if (!unit.number || !unit.title) {
      console.error(`  ❌ Could not parse unit metadata`)
      return false
    }

    console.log(`  📝 ${unit.title}`)
    console.log(`  📖 ${lessons.length} lessons extracted`)

    // Upsert unit
    const { data: insertedUnit, error: unitError } = await supabase
      .from('units')
      .upsert({
        unit_number: unit.number,
        title: unit.title,
        description: unit.description,
        era: unit.era,
        region: unit.region,
      }, { onConflict: 'unit_number' })
      .select()
      .single()

    if (unitError) {
      console.error(`  ❌ Error inserting unit:`, unitError.message)
      return false
    }

    // Delete old lessons (this will cascade delete videos, activities, quizzes)
    await supabase.from('lessons').delete().eq('unit_id', insertedUnit.id)

    // Insert lessons with videos, activities, and quizzes
    for (const lesson of lessons) {
      const { data: insertedLesson, error: lessonError } = await supabase
        .from('lessons')
        .insert({
          unit_id: insertedUnit.id,
          lesson_number: lesson.lesson_number,
          title: lesson.title,
          content: lesson.content,
          reading_time_minutes: lesson.reading_time_minutes,
          objectives: lesson.objectives,
        })
        .select()
        .single()

      if (lessonError) {
        console.error(`    ❌ Error inserting lesson ${lesson.lesson_number}:`, lessonError.message)
        continue
      }

      // Insert videos for this lesson
      if (lesson.videos.length > 0) {
        for (const video of lesson.videos) {
          const { error: videoError } = await supabase
            .from('videos')
            .insert({
              lesson_id: insertedLesson.id,
              title: video.title,
              youtube_id: video.youtube_id,
              duration_seconds: video.duration_seconds,
              description: video.description,
              sequence_order: video.sequence_order
            })

          if (videoError) {
            console.error(`      ❌ Error inserting video:`, videoError.message)
          }
        }
      }

      // Insert activities for this lesson
      if (lesson.activities.length > 0) {
        for (const activity of lesson.activities) {
          const { error: activityError } = await supabase
            .from('activities')
            .insert({
              lesson_id: insertedLesson.id,
              title: activity.title,
              activity_type: activity.activity_type,
              instructions: activity.instructions,
              activity_data: activity.activity_data,
              points_possible: activity.points_possible,
              sequence_order: activity.sequence_order
            })

          if (activityError) {
            console.error(`      ❌ Error inserting activity:`, activityError.message)
          }
        }
      }

      // Insert quiz for this lesson
      if (lesson.quiz) {
        const { data: insertedQuiz, error: quizError } = await supabase
          .from('quizzes')
          .insert({
            lesson_id: insertedLesson.id,
            title: lesson.quiz.title,
            time_limit_minutes: lesson.quiz.time_limit_minutes,
            passing_score: lesson.quiz.passing_score,
            max_attempts: lesson.quiz.max_attempts
          })
          .select()
          .single()

        if (quizError) {
          console.error(`      ❌ Error inserting quiz:`, quizError.message)
        } else {
          // Insert quiz questions
          for (const question of lesson.quiz.questions) {
            const { error: questionError } = await supabase
              .from('quiz_questions')
              .insert({
                quiz_id: insertedQuiz.id,
                question_text: question.question_text,
                question_type: question.question_type,
                correct_answer: question.correct_answer || '',
                answer_options: question.options || null,
                points: question.points,
                explanation: question.explanation || 'No explanation provided.',
                sequence_order: question.sequence_order
              })

            if (questionError) {
              console.error(`      ❌ Error inserting quiz question:`, questionError.message)
            }
          }
        }
      }
    }

    console.log(`  ✅ Unit ${unitNumber} seeded successfully!`)
    return true
  } catch (error) {
    console.error(`  ❌ Error:`, error)
    return false
  }
}

async function main() {
  const args = process.argv.slice(2)
  const unitFlag = args.indexOf('--unit')
  const specificUnit = unitFlag !== -1 ? parseInt(args[unitFlag + 1]) : null

  console.log('🌱 Food Throughout History - Clean Content Seeder')
  console.log(`📡 ${process.env.NEXT_PUBLIC_SUPABASE_URL}\n`)

  if (specificUnit) {
    await seedUnit(specificUnit)
  } else {
    for (let i = 1; i <= 6; i++) {
      await seedUnit(i)
    }
  }

  console.log('\n🎉 Seeding complete!')
}

main().catch(console.error)
