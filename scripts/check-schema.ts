import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function checkSchema() {
  console.log('\n🔍 Checking quiz_questions table schema...\n')

  // Try to get any existing quiz question to see the schema
  const { data, error } = await supabase
    .from('quiz_questions')
    .select('*')
    .limit(1)

  if (error) {
    console.log('Error querying quiz_questions:', error.message)
    
    // Try inserting a test record to see what columns are accepted
    console.log('\nTrying test insert to discover schema...\n')
    const { error: insertError } = await supabase
      .from('quiz_questions')
      .insert({
        quiz_id: '00000000-0000-0000-0000-000000000000', // Fake UUID
        question_text: 'Test',
        question_type: 'multiple_choice',
        correct_answer: 'A',
        points: 5,
        question_number: 1,
        order_index: 1,
        explanation: 'Test'
      })
    
    console.log('Insert error:', insertError)
  } else {
    console.log('Existing quiz questions found:', data)
  }

  // Check if there are any quizzes
  const { data: quizzes } = await supabase
    .from('quizzes')
    .select('*')
    .limit(3)

  console.log('\n📝 Existing quizzes:', quizzes)

  // Check videos
  const { data: videos } = await supabase
    .from('videos')
    .select('*')
    .eq('lesson_id', 106)

  console.log('\n🎥 Videos for Lesson 106:', videos)

  // Check activities
  const { data: activities } = await supabase
    .from('activities')
    .select('*')
    .eq('lesson_id', 106)

  console.log('\n🎯 Activities for Lesson 106:', activities)
}

checkSchema()
