import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  console.log('\n📋 Current Lesson URLs for Unit 1:\n')

  // Get Unit 1 ID
  const { data: unit } = await supabase
    .from('units')
    .select('id, unit_number')
    .eq('unit_number', 1)
    .single()

  if (!unit) {
    console.log('Unit 1 not found!')
    return
  }

  // Get lessons for Unit 1
  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, lesson_number, title')
    .eq('unit_id', unit.id)
    .order('lesson_number')

  if (!lessons || lessons.length === 0) {
    console.log('No lessons found!')
    return
  }

  console.log(`Unit 1 ID: ${unit.id}\n`)

  for (const lesson of lessons) {
    const url = `https://food-history.vercel.app/units/${unit.id}/lessons/${lesson.id}`
    console.log(`Lesson ${lesson.lesson_number}: ${lesson.title}`)
    console.log(`   ${url}\n`)
  }
}

main()
