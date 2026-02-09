export interface StudentProfile {
  id: string
  user_id: string
  first_name: string
  last_name: string
  age: number
  grade?: string
  geography_baseline: number
  geography_current: number
  culinary_skill_level: number
  learning_preferences: Record<string, any>
  constraints: Record<string, any>
  created_at: string
  updated_at: string
}

export interface ParentProfile {
  id: string
  user_id: string
  first_name: string
  last_name: string
  student_ids: string[]
  notification_preferences: {
    email: boolean
    weekly_report: boolean
  }
  created_at: string
  updated_at: string
}

export interface StudentProgress {
  id: string
  student_id: string
  lesson_id: string
  status: 'not_started' | 'in_progress' | 'completed'
  started_at?: string
  completed_at?: string
  time_spent_minutes: number
  reading_sections_completed: number[]
  videos_watched: number[]
  activities_completed: number[]
  created_at: string
  updated_at: string
}

export interface QuizAttempt {
  id: string
  student_id: string
  quiz_id: string
  attempt_number: number
  score: number
  total_points: number
  percentage: number
  passed: boolean
  answers: Array<{
    question_id: string
    student_answer: string
    correct: boolean
    points_earned: number
    explanation: string
  }>
  time_taken_minutes?: number
  started_at: string
  submitted_at: string
  created_at: string
}
