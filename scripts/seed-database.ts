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

    lessons.push({
      lesson_number: lessonNum,
      title: lessonTitle.substring(0, 200),
      content: cleanContent,
      reading_time_minutes: readingTime,
      objectives
    })

    console.log(`    ✅ Lesson ${lessonNum}: ${lessonTitle}`)
    console.log(`       ${wordCount} words, ~${readingTime} min read`)
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

    // Delete old lessons
    await supabase.from('lessons').delete().eq('unit_id', insertedUnit.id)

    // Insert lessons
    for (const lesson of lessons) {
      const { error } = await supabase
        .from('lessons')
        .insert({
          unit_id: insertedUnit.id,
          lesson_number: lesson.lesson_number,
          title: lesson.title,
          content: lesson.content,
          reading_time_minutes: lesson.reading_time_minutes,
          objectives: lesson.objectives,
        })

      if (error) {
        console.error(`    ❌ Error inserting lesson ${lesson.lesson_number}:`, error.message)
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
