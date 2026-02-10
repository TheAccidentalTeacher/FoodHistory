import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Globe, Clock, BookOpen, CheckCircle } from 'lucide-react'

export default async function UnitsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch all units
  const { data: units, error } = await supabase
    .from('units')
    .select('*')
    .order('unit_number', { ascending: true })

  if (error) {
    console.error('Error fetching units:', error)
  }

  // Fetch student profile for progress tracking
  const { data: studentProfile } = await supabase
    .from('student_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Fetch progress for this student
  const { data: progressData } = await supabase
    .from('student_progress')
    .select('lesson_id, status')
    .eq('student_id', studentProfile?.id || '')

  // Calculate progress for each unit
  const progressByUnit = progressData?.reduce((acc, progress) => {
    // Note: progress is per lesson, need to group by unit
    return acc
  }, {} as Record<number, { completed: number; total: number }>) || {}

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto p-4 sm:p-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" className="mb-4">
              ← Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-2">Food Throughout History</h1>
          <p className="text-lg text-muted-foreground">
            Explore 10,000 years of culinary evolution across 20 comprehensive units
          </p>
        </div>

        {/* Units Grid */}
        {!units || units.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No Units Available Yet</h3>
                <p className="text-muted-foreground mb-4">
                  The course content is being prepared. Check back soon!
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> Run the database seeding script to populate units:
                  <code className="block mt-2 p-2 bg-slate-100 dark:bg-slate-800 rounded">
                    npm run seed
                  </code>
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {units.map((unit) => {
              const progress = progressByUnit[unit.id] || { completed: 0, total: 4 }
              const progressPercentage = progress.total > 0 
                ? (progress.completed / progress.total) * 100 
                : 0
              const isCompleted = progressPercentage === 100

              return (
                <Link key={unit.id} href={`/units/${unit.unit_number}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline">Unit {unit.unit_number}</Badge>
                        {isCompleted && (
                          <Badge variant="default" className="bg-green-600">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Complete
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl line-clamp-2">
                        {unit.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {unit.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {/* Geographic Focus */}
                        {unit.region && (
                          <div className="flex items-start gap-2 text-sm">
                            <Globe className="w-4 h-4 mt-0.5 text-orange-600" />
                            <span className="text-muted-foreground">
                              {unit.region}
                            </span>
                          </div>
                        )}

                        {/* Historical Era */}
                        {unit.era && (
                          <div className="flex items-start gap-2 text-sm">
                            <Clock className="w-4 h-4 mt-0.5 text-orange-600" />
                            <span className="text-muted-foreground">
                              {unit.era}
                            </span>
                          </div>
                        )}

                        {/* Progress */}
                        <div className="pt-2">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>Progress</span>
                            <span>{Math.round(progressPercentage)}%</span>
                          </div>
                          <Progress value={progressPercentage} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
