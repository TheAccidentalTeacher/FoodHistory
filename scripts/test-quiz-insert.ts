import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function testInsert() {
  console.log('\n🧪 Testing quiz question insert patterns...\n')

  const quizId = 3 // Lesson 106 quiz

  // Test 1: Minimal required fields
  console.log('Test 1: Minimal fields')
  const { error: e1 } = await supabase
    .from('quiz_questions')
    .insert({
      quiz_id: quizId,
      question_text: 'Test question 1?',
      question_type: 'multiple_choice',
      correct_answer: 'B',
      points: 5,
      question_number: 1,
      order_index: 1,
      explanation: 'Test explanation'
    })
  console.log('Result:', e1 ? e1.message : '✅ Success')

  // Test 2: With options as JSONB string
  console.log('\nTest 2: With options as stringified JSON')
  const { error: e2 } = await supabase
    .from('quiz_questions')
    .insert({
      quiz_id: quizId,
      question_text: 'Test question 2?',
      question_type: 'multiple_choice',
      correct_answer: 'B',
      points: 5,
      question_number: 2,
      order_index: 2,
      explanation: 'Test explanation',
      options: JSON.stringify(['Option A', 'Option B', 'Option C', 'Option D'])
    })
  console.log('Result:', e2 ? e2.message : '✅ Success')

  // Test 3: With options as array
  console.log('\nTest 3: With options as array')
  const { error: e3 } = await supabase
    .from('quiz_questions')
    .insert({
      quiz_id: quizId,
      question_text: 'Test question 3?',
      question_type: 'multiple_choice',
      correct_answer: 'B',
      points: 5,
      question_number: 3,
      order_index: 3,
      explanation: 'Test explanation',
      options: ['Option A', 'Option B', 'Option C', 'Option D']
    })
  console.log('Result:', e3 ? e3.message : '✅ Success')

  // Check what was inserted
  const { data } = await supabase
    .from('quiz_questions')
    .select('*')
    .eq('quiz_id', quizId)

  console.log('\n📋 Inserted questions:', data)

  // Clean up test data
  await supabase
    .from('quiz_questions')
    .delete()
    .eq('quiz_id', quizId)
    .in('question_number', [1, 2, 3])
}

testInsert()
