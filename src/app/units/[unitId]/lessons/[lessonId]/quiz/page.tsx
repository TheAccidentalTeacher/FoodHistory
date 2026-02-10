import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import QuizInterface from '@/components/quiz/QuizInterface'

interface PageProps {
  params: Promise<{
    unitId: string
    lessonId: string
  }>
}

export default async function QuizPage({ params }: PageProps) {
  const { unitId, lessonId } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get quiz for this lesson
  const { data: quiz, error: quizError } = await supabase
    .from('quizzes')
    .select('*')
    .eq('lesson_id', lessonId)
    .single()

  if (quizError || !quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto p-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Quiz Not Found</h2>
            <p className="text-muted-foreground mb-6">
              This lesson doesn't have a quiz available yet.
            </p>
            <Link href={`/units/${unitId}/lessons/${lessonId}`}>
              <Button>Back to Lesson</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Get quiz questions
  const { data: questions } = await supabase
    .from('quiz_questions')
    .select('*')
    .eq('quiz_id', quiz.id)
    .order('sequence_order')

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto p-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">No Questions Available</h2>
            <p className="text-muted-foreground mb-6">
              This quiz doesn't have any questions yet.
            </p>
            <Link href={`/units/${unitId}/lessons/${lessonId}`}>
              <Button>Back to Lesson</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Get student profile
  const { data: studentProfile } = await supabase
    .from('student_profiles')
    .select('id')
    .eq('id', user.id)
    .single()

  // Check previous attempts
  const { data: attempts } = await supabase
    .from('student_quiz_attempts')
    .select('*')
    .eq('quiz_id', quiz.id)
    .eq('student_id', studentProfile?.id || '')
    .order('created_at', { ascending: false })

  const attemptCount = attempts?.length || 0
  const hasPassedBefore = attempts?.some(a => (a.score_percentage || 0) >= quiz.passing_score) || false

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <Link href={`/units/${unitId}/lessons/${lessonId}`}>
            <Button variant="ghost" className="mb-4">
              ← Back to Lesson
            </Button>
          </Link>

          <QuizInterface
            quiz={quiz}
            questions={questions}
            studentId={studentProfile?.id || ''}
            unitId={unitId}
            lessonId={lessonId}
            attemptCount={attemptCount}
            hasPassedBefore={hasPassedBefore}
          />
        </div>
      </div>
    </div>
  )
}
