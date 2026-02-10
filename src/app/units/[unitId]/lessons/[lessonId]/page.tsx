import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import LessonViewer from '@/components/lessons/LessonViewer'

interface PageProps {
  params: Promise<{
    unitId: string
    lessonId: string
  }>
}

export default async function LessonPage({ params }: PageProps) {
  const { unitId, lessonId } = await params

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch lesson details
  const { data: lesson, error: lessonError } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', lessonId)
    .single()

  if (lessonError || !lesson) {
    return (
      <div className="container mx-auto p-8">
        <Card>
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Lesson Not Found</h2>
            <p className="text-muted-foreground mb-4">
              This lesson doesn't exist or hasn't been created yet.
            </p>
            <Link href={`/units/${unitId}`}>
              <Button>Back to Unit</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Fetch videos for this lesson
  const { data: videos } = await supabase
    .from('videos')
    .select('*')
    .eq('lesson_id', lessonId)
    .order('sequence_order', { ascending: true })

  // Fetch activities for this lesson
  const { data: activities } = await supabase
    .from('activities')
    .select('*')
    .eq('lesson_id', lessonId)
    .order('sequence_order', { ascending: true })

  // Check if there's a quiz for this lesson
  const { data: quiz } = await supabase
    .from('quizzes')
    .select('id')
    .eq('lesson_id', lessonId)
    .single()

  // Fetch student profile (id = auth user id in this schema)
  const { data: studentProfile } = await supabase
    .from('student_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Check if lesson is completed
  const { data: progress } = await supabase
    .from('student_progress')
    .select('status')
    .eq('student_id', studentProfile?.id || '')
    .eq('lesson_id', lessonId)
    .single()

  const isCompleted = progress?.status === 'completed'

  // Handler functions will be implemented in a client component wrapper
  const handleStartQuiz = async () => {
    'use server'
    redirect(`/units/${unitId}/lessons/${lessonId}/quiz`)
  }

  const handleMarkComplete = async () => {
    'use server'
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return

    const { data: studentProfile } = await supabase
      .from('student_profiles')
      .select('id')
      .eq('id', user.id)
      .single()

    if (!studentProfile) return

    // Upsert progress
    await supabase
      .from('student_progress')
      .upsert({
        student_id: studentProfile.id,
        lesson_id: lessonId,
        status: 'completed',
        completed_at: new Date().toISOString()
      }, {
        onConflict: 'student_id,lesson_id'
      })

    redirect(`/units/${unitId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-900 dark:to-slate-800">
      {/* Back Button */}
      <div className="container mx-auto p-4">
        <Link href={`/units/${unitId}`}>
          <Button variant="ghost" className="mb-4">
            ← Back to Unit
          </Button>
        </Link>
      </div>

      {/* Lesson Viewer */}
      <LessonViewer
        lesson={lesson}
        videos={videos || []}
        activities={activities || []}
        hasQuiz={!!quiz}
        isCompleted={isCompleted}
      />
    </div>
  )
}
