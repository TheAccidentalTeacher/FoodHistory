import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { BookOpen, Video, CheckCircle, Lock, Clock, Target } from 'lucide-react'

interface PageProps {
  params: Promise<{
    unitId: string
  }>
}

export default async function UnitDetailPage({ params }: PageProps) {
  const { unitId } = await params
  const unitNumber = parseInt(unitId)

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch unit details
  const { data: unit, error: unitError } = await supabase
    .from('units')
    .select('*')
    .eq('number', unitNumber)
    .single()

  if (unitError || !unit) {
    return (
      <div className="container mx-auto p-8">
        <Card>
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Unit Not Found</h2>
            <p className="text-muted-foreground mb-4">
              This unit hasn't been created yet or doesn't exist.
            </p>
            <Link href="/units">
              <Button>Browse All Units</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Fetch lessons for this unit
  const { data: lessons } = await supabase
    .from('lessons')
    .select('*, videos(*)')
    .eq('unit_id', unit.id)
    .order('order', { ascending: true })

  // Fetch student profile
  const { data: studentProfile } = await supabase
    .from('student_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  // Fetch progress for this unit's lessons
  const { data: progressData } = await supabase
    .from('student_progress')
    .select('lesson_id, status')
    .eq('student_profile_id', studentProfile?.id || '')
    .eq('unit_id', unit.id)

  const progressByLesson = progressData?.reduce((acc, p) => {
    acc[p.lesson_id] = p.status
    return acc
  }, {} as Record<string, string>) || {}

  const completedLessons = progressData?.filter(p => p.status === 'completed').length || 0
  const totalLessons = lessons?.length || 0
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto p-4 sm:p-8">
        {/* Back Button */}
        <Link href="/units">
          <Button variant="ghost" className="mb-4">
            ← Back to All Units
          </Button>
        </Link>

        {/* Unit Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <Badge variant="outline" className="mb-2">
                  Unit {unit.number}
                </Badge>
                <CardTitle className="text-3xl mb-2">{unit.title}</CardTitle>
                <CardDescription className="text-base">
                  {unit.summary}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
              {/* Geographic Focus */}
              {unit.geographic_focus && (
                <div>
                  <h4 className="font-semibold text-sm mb-1">Geographic Focus</h4>
                  <p className="text-sm text-muted-foreground">{unit.geographic_focus}</p>
                </div>
              )}

              {/* Historical Era */}
              {unit.historical_era && (
                <div>
                  <h4 className="font-semibold text-sm mb-1">Historical Era</h4>
                  <p className="text-sm text-muted-foreground">{unit.historical_era}</p>
                </div>
              )}

              {/* Duration */}
              {unit.duration_weeks && (
                <div>
                  <h4 className="font-semibold text-sm mb-1">Duration</h4>
                  <p className="text-sm text-muted-foreground">
                    {unit.duration_weeks} week{unit.duration_weeks > 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </div>

            {/* Learning Objectives */}
            {unit.learning_objectives && Array.isArray(unit.learning_objectives) && unit.learning_objectives.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Learning Objectives
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {unit.learning_objectives.map((objective: string, index: number) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Progress */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold">Unit Progress</span>
                <span className="text-muted-foreground">
                  {completedLessons} of {totalLessons} lessons completed
                </span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Lessons List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Lessons</h2>

          {!lessons || lessons.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center py-8">
                <BookOpen className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-muted-foreground">
                  No lessons available for this unit yet.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Run the seeding script to populate content.
                </p>
              </CardContent>
            </Card>
          ) : (
            lessons.map((lesson, index) => {
              const status = progressByLesson[lesson.id] || 'not_started'
              const isCompleted = status === 'completed'
              const isInProgress = status === 'in_progress'
              const isLocked = false // In production, implement sequential unlocking

              return (
                <Card key={lesson.id} className={isCompleted ? 'border-green-600' : ''}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">
                            Lesson {lesson.lesson_number}
                          </Badge>
                          {isCompleted && (
                            <Badge variant="default" className="bg-green-600">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Complete
                            </Badge>
                          )}
                          {isInProgress && (
                            <Badge variant="default" className="bg-blue-600">
                              In Progress
                            </Badge>
                          )}
                          {isLocked && (
                            <Badge variant="secondary">
                              <Lock className="w-3 h-3 mr-1" />
                              Locked
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-xl">{lesson.title}</CardTitle>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {lesson.reading_time_minutes || 15} min
                          </span>
                          {lesson.videos && lesson.videos.length > 0 && (
                            <span className="flex items-center gap-1">
                              <Video className="w-4 h-4" />
                              {lesson.videos.length} video{lesson.videos.length > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                      </div>
                      <Link href={`/units/${unitNumber}/lessons/${lesson.id}`}>
                        <Button disabled={isLocked}>
                          {isCompleted ? 'Review' : isInProgress ? 'Continue' : 'Start'}
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                </Card>
              )
            })
          )}
        </div>

        {/* Unit Test (if all lessons complete) */}
        {completedLessons === totalLessons && totalLessons > 0 && (
          <Card className="mt-6 border-orange-600">
            <CardHeader>
              <CardTitle>Unit Test</CardTitle>
              <CardDescription>
                Test your knowledge of all concepts covered in this unit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg" className="w-full sm:w-auto">
                Take Unit Test
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
