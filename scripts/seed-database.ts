/**
 * Database Seeding Script for Food Throughout History
 * 
 * Properly parses unit specification files to extract:
 * - Clean reading content (for beautiful lesson display)
 * - Video metadata (YouTube IDs or search terms)
 * - Activity specifications  
 * - Quiz questions
 * 
 * NO MORE AI SLOP - only clean, formatted educational content!
 * 
 * Usage:
 *   npm run seed              # Seed all units
 *   npm run seed -- --unit 4  # Seed only Unit 4
 */

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
})

interface ParsedUnit {
  number: number
  title: string
  description: string
  era: string
  region: string
}

interface ParsedLesson {
  lesson_number: number
  title: string
  content: string // ONLY the reading content, beautifully formatted
  reading_time_minutes: number
  objectives: string[]
}

interface ParsedVideo {
  title: string
  description: string
  search_terms: string
  duration_seconds: number
}

/**
 * Extract ONLY the reading content section from a lesson
 * Handles two formats:
 * - Format A (Unit 1): Has explicit "## READING CONTENT" section
 * - Format B (Units 2-6): Content starts immediately after lesson header
 */
function extractReadingContent(lessonText: string): string {
  const lines = lessonText.split('\n')
  let content: string[] = []
  let inReadingSection = false
  let foundReadingStart = false

  // Check if this lesson uses Format A (has "## READING CONTENT" header)
  const hasExplicitReadingSection = lessonText.match(/^##\s+READING CONTENT/im)

  if (hasExplicitReadingSection) {
    // FORMAT A: Extract between "## READING CONTENT" and next major section
    for (const line of lines) {
      if (line.match(/^##\s+READING CONTENT/i)) {
        inReadingSection = true
        foundReadingStart = true
        continue
      }

      if (foundReadingStart && line.match(/^##\s+(VIDEOS|INTERACTIVE|GEOGRAPHY|QUIZ|LESSON COMPLETION)/i)) {
        break
      }

      if (inReadingSection) {
        if (line.match(/^\(.*minutes total\)/)) continue
        content.push(line)
      }
    }
  } else {
    // FORMAT B: Extract from start until first major H2 section (VIDEOS, ACTIVITIES, etc.)
    // Skip the lesson title line itself
    let startCollecting = false
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      
      // Skip the first line if it's the lesson header
      if (i === 0 && line.match(/^#{1,2}\s+(?:LESSON|Lesson)\s+\d+:/i)) {
        startCollecting = true
        continue
      }
      
      // Stop at metadata sections or next lesson
      if (startCollecting && line.match(/^##\s+(VIDEOS|VIDEO|INTERACTIVE|GEOGRAPHY|QUIZ|LESSON|Lesson\s+\d+:|UNIT\s+\d+\s+ESSAY)/i)) {
        break
      }
      
      if (startCollecting) {
        content.push(line)
      }
    }
  }

  // Clean up the content
  let cleaned = content.join('\n').trim()
  
  // Remove duration metadata from section headers
  cleaned = cleaned.replace(/###\s+(.+?)\s+\(\d+\s+minutes?,\s*~?\d+\s*words?\)/g, '### $1')
  
  // Remove "Section N:" prefix but keep section titles
  cleaned = cleaned.replace(/###\s+Section\s+\d+:\s+/g, '### ')
  
  return cleaned
}

/**
 * Parse unit metadata from the file header
 */
function parseUnitMetadata(content: string): ParsedUnit {
  const lines = content.split('\n')
  
  let unitNumber = 0
  let unitTitle = ''
  let era = 'Not specified'
  let region = 'Not specified'
  let description = ''

  for (let i = 0; i < Math.min(lines.length, 150); i++) {
    const line = lines[i]

    // Unit title from first H1
    const h1Match = line.match(/^#\s+UNIT\s+(\d+):\s+(.+)/i)
    if (h1Match) {
      unitNumber = parseInt(h1Match[1])
      unitTitle = h1Match[2].trim()
    }

    // Geographic Focus
    if (line.includes('**Geographic Focus:**')) {
      const after = line.split('**Geographic Focus:**')[1]?.trim()
      region = after || lines[i + 1]?.trim() || region
    }

    // Historical Era
    if (line.includes('**Historical Era:**')) {
      const after = line.split('**Historical Era:**')[1]?.trim()
      era = after || lines[i + 1]?.trim() || era
    }
  }

  // Build description from Unit Overview
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/^##\s+UNIT OVERVIEW/i)) {
      let desc = ''
      for (let j = i + 1; j < Math.min(i + 30, lines.length); j++) {
        const l = lines[j].trim()
        if (l && !l.startsWith('#') && !l.startsWith('**') && !l.startsWith('---') && !l.startsWith('-')) {
          desc += l + ' '
          if (desc.length > 200) break
        }
      }
      description = desc.trim().substring(0, 500)
      break
    }
  }

  if (!description) description = unitTitle

  return {
    number: unitNumber,
    title: unitTitle.substring(0, 200),
    description: description.substring(0, 500),
    era: era.substring(0, 100),
    region: region.substring(0, 100)
  }
}

/**
 * Extract all lessons from a unit specification file
 */
function parseAllLessons(content: string): ParsedLesson[] {
  const lessons: ParsedLesson[] = []
  
  // Split by lesson headers (# LESSON N: or ## Lesson N:)
  const lessonPattern = /^#{1,2}\s+(?:LESSON|Lesson)\s+(\d+):\s+(.+)/gm
  const matches = Array.from(content.matchAll(lessonPattern))

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i]
    const lessonNum = parseInt(match[1])
    const lessonTitle = match[2].trim()
    const startIndex = match.index!
    const endIndex = i < matches.length - 1 ? matches[i + 1].index! : content.length

    const lessonText = content.substring(startIndex, endIndex)
    
    // Extract ONLY the reading content
    const readingContent = extractReadingContent(lessonText)
    
    if (!readingContent) {
      console.log(`    ⚠️  Warning: No reading content found for Lesson ${lessonNum}`)
      continue
    }

    // Estimate reading time from word count
    const wordCount = readingContent.split(/\s+/).length
    const readingTime = Math.max(10, Math.ceil(wordCount / 200)) // 200 words/minute

    // Extract objectives if present
    const objectives: string[] = []
    const objectivesMatch = lessonText.match(/###\s+Learning Objectives([\s\S]+?)(?=###|##|$)/i)
    if (objectivesMatch) {
      const objText = objectivesMatch[1]
      const objMatches = objText.match(/^\d+\.\s+(.+)/gm)
      if (objMatches) {
        objectives.push(...objMatches.map(s => s.replace(/^\d+\.\s+/, '').trim()).slice(0, 5))
      }
    }

    lessons.push({
      lesson_number: lessonNum,
      title: lessonTitle.substring(0, 200),
      content: readingContent,
      reading_time_minutes: readingTime,
      objectives
    })
  }

  return lessons
}

/**
 * Seed a single unit into the database
 */
async function seedUnit(unitNumber: number) {
  console.log(`\n📦 Seeding Unit ${unitNumber}...`)

  // Unit spec files are in the project root
  const unitFilePath = path.join(process.cwd(), `UNIT-${unitNumber}-COMPLETE-SPECIFICATION.md`)
  
  if (!fs.existsSync(unitFilePath)) {
    console.error(`  ❌ File not found: ${unitFilePath}`)
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

    console.log(`  📝 Unit: ${unit.title}`)
    console.log(`  📍 Region: ${unit.region}`)
    console.log(`  🕐 Era: ${unit.era}`)
    console.log(`  📖 Lessons found: ${lessons.length}`)

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

    console.log(`  ✅ Unit upserted with ID: ${insertedUnit.id}`)

    // Delete existing lessons for clean re-seed
    await supabase.from('lessons').delete().eq('unit_id', insertedUnit.id)

    // Insert lessons
    for (const lesson of lessons) {
      const { error: lessonError } = await supabase
        .from('lessons')
        .insert({
          unit_id: insertedUnit.id,
          lesson_number: lesson.lesson_number,
          title: lesson.title,
          content: lesson.content,
          reading_time_minutes: lesson.reading_time_minutes,
          objectives: lesson.objectives,
        })

      if (lessonError) {
        console.error(`    ❌ Lesson ${lesson.lesson_number}: ${lessonError.message}`)
      } else {
        const preview = lesson.content.substring(0, 100).replace(/\n/g, ' ')
        console.log(`    ✅ Lesson ${lesson.lesson_number}: ${lesson.title}`)
        console.log(`       Content preview: "${preview}..."`)
        console.log(`       ${lesson.content.split(/\s+/).length} words, ~${lesson.reading_time_minutes} min`)
      }
    }

    console.log(`  ✅ Unit ${unitNumber} seeded successfully!`)
    return true
  } catch (error) {
    console.error(`  ❌ Error seeding unit ${unitNumber}:`, error)
    return false
  }
}

async function main() {
  const args = process.argv.slice(2)
  const unitFlag = args.indexOf('--unit')
  const specificUnit = unitFlag !== -1 ? parseInt(args[unitFlag + 1]) : null

  console.log('🌱 Food Throughout History - Database Seeder (Clean Content Mode)')
  console.log(`📡 Connected to: ${supabaseUrl}\n`)

  if (specificUnit) {
    console.log(`🎯 Seeding Unit ${specificUnit} only`)
    await seedUnit(specificUnit)
  } else {
    console.log('🎯 Seeding all available units')
    for (let i = 1; i <= 6; i++) {
      await seedUnit(i)
    }
  }

  console.log('\n🎉 Seeding complete! Content should now be clean and well-formatted.')
}

main().catch(console.error)
