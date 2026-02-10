import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function tryMinimal() {
  console.log('\n🧪 Trying absolute minimal insert...\n')

  const quizId = 3

  // Try with only quiz_id
  const tests = [
    { quiz_id: quizId },
    { quiz_id: quizId, question_text: 'Test?' },
    { quiz_id: quizId, question_text: 'Test?', question_type: 'multiple_choice' },
    { quiz_id: quizId, question_text: 'Test?', question_type: 'multiple_choice', correct_answer: 'A' },
    { quiz_id: quizId, question_text: 'Test?', question_type: 'multiple_choice', answer: 'A' },
    { quiz_id: quizId, text: 'Test?', type: 'multiple_choice', answer: 'A' },
    { quiz_id: quizId, content: 'Test?', type: 'multiple_choice', answer: 'A' },
  ]

  for (let i = 0; i < tests.length; i++) {
    console.log(`\nAttempt ${i + 1}:`, JSON.stringify(tests[i]))
    const { data, error } = await supabase
      .from('quiz_questions')
      .insert(tests[i])
      .select()
    
    if (error) {
      console.log('   ❌', error.message.substring(0, 80))
    } else {
      console.log('   ✅ SUCCESS!')
      console.log('\n📋 Actual columns:', Object.keys(data[0]))
      
      // Clean up
      await supabase.from('quiz_questions').delete().eq('id', data[0].id)
      return
    }
  }
}

tryMinimal()
