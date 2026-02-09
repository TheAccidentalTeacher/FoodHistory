export interface Unit {
  id: number
  number: number
  title: string
  slug: string
  description: string
  geographic_focus: string[]
  historical_era: string
  duration_hours: number
  learning_objectives: {
    objectives: string[]
  }
  unlock_requirements: {
    previous_unit_score: number
  }
  order_index: number
  created_at: string
}

export interface Lesson {
  id: string
  unit_id: number
  lesson_number: number
  title: string
  slug: string
  summary: string
  reading_time_minutes: number
  learning_objectives: {
    objectives: string[]
  }
  order_index: number
  created_at: string
}

export interface ReadingSection {
  id: string
  lesson_id: string
  section_number: number
  title: string
  content: string
  word_count: number
  order_index: number
  created_at: string
}

export interface Video {
  id: string
  lesson_id: string
  video_number: number
  title: string
  youtube_id: string
  duration_minutes: number
  description?: string
  order_index: number
  created_at: string
}

export interface Activity {
  id: string
  lesson_id: string
  activity_number: number
  title: string
  activity_type: 'map_exercise' | 'timeline' | 'comparison' | 'research' | 'analysis'
  instructions: string
  correct_answers: Record<string, any>
  hints?: string[]
  order_index: number
  created_at: string
}

export interface Quiz {
  id: string
  lesson_id?: string
  unit_id?: number
  quiz_type: 'lesson' | 'unit_test'
  title: string
  passing_score: number
  time_limit_minutes?: number
  instructions?: string
  created_at: string
}

export interface QuizQuestion {
  id: string
  quiz_id: string
  question_number: number
  question_type: 'multiple_choice' | 'short_answer' | 'geography_map' | 'true_false'
  question_text: string
  options?: string[]
  correct_answer: string
  explanation: string
  points: number
  order_index: number
  created_at: string
}

export interface EssayPrompt {
  id: string
  unit_id: number
  prompt: string
  min_words: number
  max_words: number
  rubric: Record<string, any>
  sample_essay?: string
  created_at: string
}

export interface ProjectPrompt {
  id: string
  unit_id: number
  title: string
  description: string
  instructions: string
  deliverables: Record<string, any>
  rubric: Record<string, any>
  example?: string
  created_at: string
}
