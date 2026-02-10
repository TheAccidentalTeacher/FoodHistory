import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function findWorkingSchema() {
  console.log('\n🔍 Finding working schema for quiz_questions...\n')

  const quizId = 3

  // Try progressively simpler inserts
  const attempts = [
    {
      name: 'Basic required fields only',
      data: {
        quiz_id: quizId,
        question_text: 'Test?',
        question_type: 'multiple_choice',
        correct_answer: 'A',
        question_number: 99
      }
    },
    {
      name: 'With explanation',
      data: {
        quiz_id: quizId,
        question_text: 'Test?',
        question_type: 'multiple_choice',
        correct_answer: 'A',
        question_number: 98,
        explanation: 'Test explanation'
      }
    },
    {
      name: 'With points',
      data: {
        quiz_id: quizId,
        question_text: 'Test?',
        question_type: 'multiple_choice',
        correct_answer: 'A',
        question_number: 97,
        explanation: 'Test',
        points: 5
      }
    }
  ]

  for (const attempt of attempts) {
    console.log(`\n${attempt.name}:`)
    const { data, error } = await supabase
      .from('quiz_questions')
      .insert(attempt.data)
      .select()
    
    if (error) {
      console.log('❌', error.message)
    } else {
      console.log('✅ SUCCESS! Inserted:', data)
      
      // Show what columns exist
      console.log('\n📋 Actual table columns:')
      Object.keys(data[0]).forEach(key => console.log(`   - ${key}`))
      
      // Clean up
      await supabase
        .from('quiz_questions')
        .delete()
        .eq('id', data[0].id)
      
      return
    }
  }
}

findWorkingSchema()
