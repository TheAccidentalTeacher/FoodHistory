'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AddStudentPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Get current parent user
      const { data: { user: parentUser } } = await supabase.auth.getUser()
      if (!parentUser) {
        throw new Error('You must be logged in as a parent to add students')
      }

      // 1. Create auth user for student via service
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: `${firstName} ${lastName}`,
            role: 'student',
          },
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      })

      if (authError) throw authError
      if (!authData.user) throw new Error('Failed to create student account')

      // 2. Create student profile linked to parent
      const { error: profileError } = await supabase
        .from('student_profiles')
        .insert({
          id: authData.user.id,
          email: email,
          full_name: `${firstName} ${lastName}`,
          age: parseInt(age),
          geography_skill_level: 2,
          parent_id: parentUser.id, // Link to current parent
        })

      if (profileError) throw profileError

      setSuccess(true)
      setTimeout(() => {
        router.push('/dashboard')
        router.refresh()
      }, 2000)

    } catch (err: any) {
      setError(err.message || 'Failed to add student')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Add Student Account</CardTitle>
            <CardDescription>
              Create a student account for your child. They'll be able to access all course materials
              and you'll be able to track their progress.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {success ? (
              <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-6 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-2">
                  Student Account Created!
                </h3>
                <p className="text-green-800 dark:text-green-200">
                  {firstName} can now log in with their email and password.
                  Redirecting to dashboard...
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddStudent} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      placeholder="Timothy"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      placeholder="Smith"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="age" className="text-sm font-medium">
                    Age
                  </label>
                  <Input
                    id="age"
                    type="number"
                    min="10"
                    max="25"
                    placeholder="15"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="student@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    This will be their login email
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <p className="text-xs text-muted-foreground">
                    Must be at least 6 characters. Share this with your student.
                  </p>
                </div>

                {error && (
                  <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-800 dark:text-red-400">
                    {error}
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Creating student account...' : 'Create Student Account'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
