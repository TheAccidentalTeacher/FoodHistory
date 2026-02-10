/**
 * Database Seeding Script for Food Throughout History
 * Rewritten to handle ALL unit markdown formats correctly.
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
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
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
  content: string
  reading_time_minutes: number
}

/**
 * Parse unit metadata and lessons from a markdown spec file.
 * Handles ALL formats:
 *   - "# UNIT 1: TITLE" or "# Unit 2: Title"  
 *   - "# UNIT 5 COMPLETE SPECIFICATION" (title on next ## line)
 *   - Lessons as "# LESSON 1: TITLE" or "## Lesson 1: Title"
 */
function parseMarkdown(filePath: string): { unit: ParsedUnit; lessons: ParsedLesson[] } {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')

  // --- Parse unit metadata ---
  let unitNumber = 0
  let unitTitle = ''
  let era = ''
  let region = ''
  let description = ''

  for (let i = 0; i < Math.min(lines.length, 100); i++) {
    const line = lines[i]

    // Unit number and title: "# UNIT 1: TITLE" or "# Unit 2: Title"
    const colonMatch = line.match(/^#\s+UNIT\s+(\d+):\s+(.+)/i)
    if (colonMatch) {
      unitNumber = parseInt(colonMatch[1])
      unitTitle = colonMatch[2].trim()
    }

    // Alternate: "# UNIT 5 COMPLETE SPECIFICATION" — title on next line
    if (!unitTitle && line.match(/^#\s+UNIT\s+(\d+)\s+COMPLETE/i)) {
      const m = line.match(/^#\s+UNIT\s+(\d+)/i)
      if (m) unitNumber = parseInt(m[1])
      // Look for ## title on next line
      if (i + 1 < lines.length && lines[i + 1].startsWith('##')) {
        unitTitle = lines[i + 1].replace(/^##\s*/, '').trim()
      }
    }

    // Geographic Focus / Region
    if (line.match(/\*\*Geographic [Ff]ocus:\*\*/)) {
      const after = line.split(/\*\*Geographic [Ff]ocus:\*\*/)[1]?.trim()
      region = after || lines[i + 1]?.trim() || ''
    }

    // Historical Era / Timeline
    if (line.match(/\*\*(Historical Era|Timeline Covered):\*\*/)) {
      const after = line.split(/\*\*(Historical Era|Timeline Covered):\*\*/)[1]?.trim()
      era = after || lines[i + 1]?.trim() || ''
    }
  }

  // Build description from first paragraph after "UNIT OVERVIEW" or "Unit Overview"
  for (let i = 0; i < Math.min(lines.length, 200); i++) {
    if (lines[i].match(/UNIT OVERVIEW|Unit Overview/i)) {
      let desc = ''
      for (let j = i + 1; j < Math.min(i + 20, lines.length); j++) {
        const l = lines[j].trim()
        if (l && !l.startsWith('#') && !l.startsWith('**') && !l.startsWith('---')) {
          desc += l + ' '
          if (desc.length > 200) break
        }
      }
      description = desc.trim().substring(0, 500)
      break
    }
  }

  if (!description) description = unitTitle

  // --- Parse lessons ---
  // Match both "# LESSON 1: TITLE" and "## Lesson 1: Title"
  const lessonHeaderRegex = /^#{1,2}\s+(?:LESSON|Lesson)\s+(\d+):\s+(.+)/i

  const lessons: ParsedLesson[] = []
  let currentLessonNum = 0
  let currentLessonTitle = ''
  let currentContent: string[] = []
  let inLesson = false
  let readingTime = 15

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const lessonMatch = line.match(lessonHeaderRegex)

    if (lessonMatch) {
      // Save previous lesson
      if (inLesson && currentLessonNum > 0) {
        lessons.push({
          lesson_number: currentLessonNum,
          title: currentLessonTitle,
          content: currentContent.join('\n'),
          reading_time_minutes: readingTime,
        })
      }

      currentLessonNum = parseInt(lessonMatch[1])
      currentLessonTitle = lessonMatch[2].trim()
      currentContent = []
      inLesson = true
      readingTime = 15

      // Look for reading time in nearby metadata
      for (let j = i + 1; j < Math.min(i + 20, lines.length); j++) {
        const meta = lines[j]
        const timeMatch = meta.match(/(\d+)\s*minutes?\s*(?:total|read)/i)
        if (timeMatch) {
          readingTime = parseInt(timeMatch[1])
          break
        }
        if (meta.match(lessonHeaderRegex)) break
      }
      continue
    }

    // Stop collecting when we hit essay, project, unit test, or completion section
    if (inLesson) {
      if (line.match(/^#{1,2}\s+(UNIT\s+\d+\s+ESSAY|Unit\s+\d+\s+Essay|📝\s+Unit|🔬\s+Unit|📋\s+Comprehensive|UNIT\s+\d+\s+(?:ESSAY|COMPREHENSIVE|HANDS)|✅\s+Unit)/i)) {
        lessons.push({
          lesson_number: currentLessonNum,
          title: currentLessonTitle,
          content: currentContent.join('\n'),
          reading_time_minutes: readingTime,
        })
        inLesson = false
        continue
      }

      // Collect all content lines (skip "Lesson Metadata" header itself)
      if (!line.match(/^## Lesson Metadata/i)) {
        currentContent.push(line)
      }
    }
  }

  // Save last lesson
  if (inLesson && currentLessonNum > 0) {
    lessons.push({
      lesson_number: currentLessonNum,
      title: currentLessonTitle,
      content: currentContent.join('\n'),
      reading_time_minutes: readingTime,
    })
  }

  return {
    unit: {
      number: unitNumber,
      title: unitTitle,
      description: description.substring(0, 500),
      era: era.substring(0, 100),
      region: region.substring(0, 100),
    },
    lessons,
  }
}

/**
 * Seed a single unit into the database
 */
async function seedUnit(unitNumber: number) {
  console.log(`\n📦 Seeding Unit ${unitNumber}...`)

  const unitFilePath = path.join(process.cwd(), `UNIT-${unitNumber}-COMPLETE-SPECIFICATION.md`)
  if (!fs.existsSync(unitFilePath)) {
    console.error(`  ❌ File not found: UNIT-${unitNumber}-COMPLETE-SPECIFICATION.md`)
    return false
  }

  try {
    const { unit, lessons } = parseMarkdown(unitFilePath)

    if (!unit.number || !unit.title) {
      console.error(`  ❌ Could not parse unit number or title from file`)
      return false
    }

    console.log(`  📝 Unit: ${unit.title}`)
    console.log(`  📍 Region: ${unit.region || 'N/A'}`)
    console.log(`  🕐 Era: ${unit.era || 'N/A'}`)
    console.log(`  📖 Lessons found: ${lessons.length}`)

    // Upsert unit
    const { data: insertedUnit, error: unitError } = await supabase
      .from('units')
      .upsert({
        unit_number: unit.number,
        title: unit.title.substring(0, 200),
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

    // Delete existing lessons for this unit (clean re-seed)
    await supabase.from('lessons').delete().eq('unit_id', insertedUnit.id)

    // Insert lessons
    for (const lesson of lessons) {
      const wordCount = lesson.content.split(/\s+/).length
      const estimatedReadTime = lesson.reading_time_minutes || Math.max(10, Math.ceil(wordCount / 200))

      const { error: lessonError } = await supabase
        .from('lessons')
        .insert({
          unit_id: insertedUnit.id,
          lesson_number: lesson.lesson_number,
          title: lesson.title.substring(0, 200),
          content: lesson.content,
          reading_time_minutes: estimatedReadTime,
          objectives: [],
        })

      if (lessonError) {
        console.error(`    ❌ Lesson ${lesson.lesson_number}: ${lessonError.message}`)
      } else {
        console.log(`    ✅ Lesson ${lesson.lesson_number}: ${lesson.title} (${wordCount} words, ~${estimatedReadTime} min)`)
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

  console.log('🌱 Food Throughout History - Database Seeder')
  console.log(`📡 Connected to: ${supabaseUrl}\n`)

  if (specificUnit) {
    console.log(`🎯 Seeding Unit ${specificUnit} only`)
    await seedUnit(specificUnit)
  } else {
    console.log('🎯 Seeding all available units')
    for (let i = 1; i <= 20; i++) {
      const filePath = path.join(process.cwd(), `UNIT-${i}-COMPLETE-SPECIFICATION.md`)
      if (fs.existsSync(filePath)) {
        await seedUnit(i)
      }
    }
  }

  console.log('\n🎉 Seeding complete!')
}

main().catch(console.error)
