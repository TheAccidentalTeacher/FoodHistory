import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch user profile
  const { data: studentProfile } = await supabase
    .from('student_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: parentProfile } = await supabase
    .from('parent_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const profile = studentProfile || parentProfile
  const role = studentProfile ? 'student' : 'parent'

  // If parent, fetch linked students
  let linkedStudents: any[] = []
  if (role === 'parent') {
    const { data } = await supabase
      .from('student_profiles')
      .select(`
        id,
        email,
        full_name,
        age,
        geography_skill_level,
        created_at
      `)
      .eq('parent_id', user.id)
      .order('created_at', { ascending: false })
    
    linkedStudents = data || []
  }

  // Sign out function
  const signOut = async () => {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto p-4 sm:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Welcome back, {profile?.full_name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-muted-foreground">
              Ready to explore food history today?
            </p>
          </div>
          <form action={signOut}>
            <Button variant="outline" type="submit">
              Sign Out
            </Button>
          </form>
        </div>

        {/* Role Badge */}
        <Badge variant="secondary" className="mb-6 text-sm capitalize">
          {role} Account
        </Badge>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {/* Parent - Linked Students Overview */}
          {role === 'parent' && (
            <Card className="md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle>Your Students</CardTitle>
                <CardDescription>Students linked to your account</CardDescription>
              </CardHeader>
              <CardContent>
                {linkedStudents.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      No students linked yet. Add a student to get started!
                    </p>
                    <Link href="/dashboard/add-student">
                      <Button>Add Your First Student</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {linkedStudents.map((student) => (
                      <Card key={student.id}>
                        <CardHeader>
                          <CardTitle className="text-lg">{student.full_name}</CardTitle>
                          <CardDescription>{student.email}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Age:</span>
                              <span className="font-medium">{student.age}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Geography Level:</span>
                              <Badge variant="secondary">{student.geography_skill_level}/10</Badge>
                            </div>
                            <Link href={`/progress?student=${student.id}`}>
                              <Button variant="outline" size="sm" className="w-full mt-2">
                                View Progress
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Student Stats */}
          {role === 'student' && studentProfile && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Geography Skills</CardTitle>
                  <CardDescription>Track your improvement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Current Level:</span>
                      <Badge variant="default">{studentProfile.geography_skill_level}/10</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Target:</span>
                      <Badge variant="outline">10/10</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">To Go:</span>
                      <Badge variant="secondary">
                        {10 - studentProfile.geography_skill_level} levels
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                  <CardDescription>Student information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Age:</span>
                      <span className="text-sm font-medium">{studentProfile.age}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Email:</span>
                      <span className="text-sm font-medium">{studentProfile.email}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                  <CardDescription>Your progress overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Units Completed:</span>
                      <Badge variant="secondary">0 / 20</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Lessons Completed:</span>
                      <Badge variant="secondary">0 / 80</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Quizzes Passed:</span>
                      <Badge variant="secondary">0 / 80</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              {role === 'student' 
                ? 'Start your learning journey' 
                : 'Manage your student\'s progress'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link href="/units">
                <Button className="w-full" variant="default">
                  Browse Units
                </Button>
              </Link>
              {role === 'student' && (
                <>
                  <Link href="/units/4">
                    <Button className="w-full" variant="outline">
                      Start Unit 4
                    </Button>
                  </Link>
                  <Link href="/geography">
                    <Button className="w-full" variant="outline">
                      Practice Geography
                    </Button>
                  </Link>
                  <Link href="/tutor">
                    <Button className="w-full" variant="outline">
                      Ask AI Tutor
                    </Button>
                  </Link>
                </>
              )}
              {role === 'parent' && (
                <>
                  <Link href="/dashboard/add-student">
                    <Button className="w-full" variant="default">
                      Add Student
                    </Button>
                  </Link>
                  <Link href="/grading">
                    <Button className="w-full" variant="outline">
                      Grade Essays
                    </Button>
                  </Link>
                  <Link href="/reports">
                    <Button className="w-full" variant="outline">
                      View Reports
                    </Button>
                  </Link>
                  <Link href="/progress">
                    <Button className="w-full" variant="outline">
                      Track Progress
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Welcome Message */}
        <Card className="mt-6 bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 border-orange-200 dark:border-orange-800">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-2">
              🍽️ Welcome to Food Throughout History!
            </h3>
            <p className="text-sm text-muted-foreground">
              {role === 'student' 
                ? "You are about to embark on an amazing journey through 10,000 years of culinary history. Explore 20 comprehensive units, master geography, and develop your skills as an aspiring chef. Let\'s get started!"
                : "Monitor your student\'s progress through this comprehensive food history curriculum. Review their work, provide feedback, and watch them grow as a culinary historian and aspiring chef."}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
