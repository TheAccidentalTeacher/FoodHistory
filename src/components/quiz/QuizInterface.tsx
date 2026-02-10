'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, AlertTriangle, BookOpen } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Quiz {
  id: number
  title: string
  passing_score: number
  max_attempts: number | null
  time_limit_minutes: number | null
}

interface Question {
  id: number
  question_text: string
  question_type: 'multiple_choice' | 'short_answer'
  correct_answer: string
  answer_options: string[] | null
  points: number
  explanation: string | null
  sequence_order: number
}

interface QuizInterfaceProps {
  quiz: Quiz
  questions: Question[]
  studentId: string
  unitId: string
  lessonId: string
  attemptCount: number
  hasPassedBefore: boolean
}

export default function QuizInterface({
  quiz,
  questions,
  studentId,
  unitId,
  lessonId,
  attemptCount,
  hasPassedBefore
}: QuizInterfaceProps) {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [results, setResults] = useState<{
    score: number
    percentage: number
    passed: boolean
    feedback: Array<{ questionId: number; correct: boolean; explanation: string | null }>
  } | null>(null)

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100
  const canTakeQuiz = !quiz.max_attempts || attemptCount < quiz.max_attempts

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Grade the quiz
      let totalPoints = 0
      let earnedPoints = 0
      const feedback: Array<{ questionId: number; correct: boolean; explanation: string | null }> = []

      questions.forEach(question => {
        totalPoints += question.points
        const userAnswer = answers[question.id]
        const isCorrect = userAnswer?.trim().toUpperCase() === question.correct_answer.trim().toUpperCase()
        
        if (isCorrect) {
          earnedPoints += question.points
        }

        feedback.push({
          questionId: question.id,
          correct: isCorrect,
          explanation: question.explanation
        })
      })

      const percentage = Math.round((earnedPoints / totalPoints) * 100)
      const passed = percentage >= quiz.passing_score

      // Save attempt to database
      const supabase = createClient()
      await supabase
        .from('student_quiz_attempts')
        .insert({
          student_id: studentId,
          quiz_id: quiz.id,
          score_earned: earnedPoints,
          score_possible: totalPoints,
          score_percentage: percentage,
          answers: answers,
          completed_at: new Date().toISOString()
        })

      setResults({
        score: earnedPoints,
        percentage,
        passed,
        feedback
      })
      setShowResults(true)
    } catch (error) {
      console.error('Error submitting quiz:', error)
      alert('Error submitting quiz. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReturnToLesson = () => {
    router.push(`/units/${unitId}/lessons/${lessonId}`)
  }

  if (!canTakeQuiz) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            Maximum Attempts Reached
          </CardTitle>
          <CardDescription>
            You've used all {quiz.max_attempts} attempts for this quiz.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            {hasPassedBefore
              ? "You've already passed this quiz. Great job!"
              : "Please review the lesson material and speak with your instructor about retaking this quiz."}
          </p>
          <Button onClick={handleReturnToLesson}>Return to Lesson</Button>
        </CardContent>
      </Card>
    )
  }

  if (showResults && results) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {results.passed ? (
              <>
                <CheckCircle className="w-6 h-6 text-green-500" />
                Quiz Passed!
              </>
            ) : (
              <>
                <XCircle className="w-6 h-6 text-red-500" />
                Quiz Not Passed
              </>
            )}
          </CardTitle>
          <CardDescription>
            You scored {results.score} out of {questions.reduce((sum, q) => sum + q.points, 0)} points ({results.percentage}%)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {results.passed ? (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-200">
                Congratulations! You've passed the quiz with {results.percentage}%. The passing score was {quiz.passing_score}%.
              </p>
            </div>
          ) : (
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
              <p className="text-sm text-orange-800 dark:text-orange-200">
                You scored {results.percentage}%, but the passing score is {quiz.passing_score}%. Review the material and try again.
              </p>
              {quiz.max_attempts && (
                <p className="text-sm text-orange-800 dark:text-orange-200 mt-2">
                  Attempts remaining: {quiz.max_attempts - attemptCount - 1}
                </p>
              )}
            </div>
          )}

          <div className="space-y-4">
            <h3 className="font-semibold">Review Your Answers</h3>
            {questions.map((question, index) => {
              const feedback = results.feedback.find(f => f.questionId === question.id)
              return (
                <div key={question.id} className="p-4 border rounded-lg">
                  <div className="flex items-start gap-2 mb-2">
                    {feedback?.correct ? (
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">Question {index + 1}</p>
                      <p className="text-sm text-muted-foreground mt-1">{question.question_text}</p>
                    </div>
                  </div>
                  <div className="ml-7 mt-2 space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Your answer:</span>{' '}
                      <span className={feedback?.correct ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                        {answers[question.id] || 'Not answered'}
                      </span>
                    </p>
                    {!feedback?.correct && (
                      <p>
                        <span className="font-medium">Correct answer:</span>{' '}
                        <span className="text-green-600 dark:text-green-400">{question.correct_answer}</span>
                      </p>
                    )}
                    {feedback?.explanation && (
                      <p className="text-muted-foreground mt-2 pt-2 border-t">
                        <span className="font-medium">Explanation:</span> {feedback.explanation}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex gap-2">
            <Button onClick={handleReturnToLesson} variant="outline" className="flex-1">
              <BookOpen className="w-4 h-4 mr-2" />
              Return to Lesson
            </Button>
            {!results.passed && canTakeQuiz && (
              <Button onClick={() => { setShowResults(false); setAnswers({}); setCurrentQuestionIndex(0); }} className="flex-1">
                Try Again
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Quiz Header */}
      <Card>
        <CardHeader>
          <CardTitle>{quiz.title}</CardTitle>
          <CardDescription>
            <div className="space-y-1">
              <p>Passing score: {quiz.passing_score}%</p>
              {quiz.max_attempts && (
                <p>Attempts: {attemptCount + 1} of {quiz.max_attempts}</p>
              )}
              {quiz.time_limit_minutes && (
                <p>Time limit: {quiz.time_limit_minutes} minutes</p>
              )}
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progress</span>
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            </div>
            <Progress value={progress} />
          </div>
        </CardContent>
      </Card>

      {/* Current Question */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg">Question {currentQuestionIndex + 1}</CardTitle>
            <Badge variant="secondary">{currentQuestion.points} points</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-base leading-relaxed">{currentQuestion.question_text}</p>

          {currentQuestion.question_type === 'multiple_choice' && currentQuestion.answer_options ? (
            <RadioGroup
              value={answers[currentQuestion.id] || ''}
              onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
            >
              {currentQuestion.answer_options.map((option, index) => {
                const optionLetter = String.fromCharCode(65 + index) // A, B, C, D
                return (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <RadioGroupItem value={optionLetter} id={`option-${index}`} className="mt-0.5" />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer leading-relaxed">
                      <span className="font-medium mr-2">{optionLetter})</span>
                      {option}
                    </Label>
                  </div>
                )
              })}
            </RadioGroup>
          ) : (
            <Textarea
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
              placeholder="Type your answer here..."
              className="min-h-[150px]"
            />
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-4 border-t">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              variant="outline"
            >
              Previous
            </Button>

            <div className="text-sm text-muted-foreground">
              {Object.keys(answers).length} of {questions.length} answered
            </div>

            {currentQuestionIndex < questions.length - 1 ? (
              <Button onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || Object.keys(answers).length < questions.length}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Answer Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Answer Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {questions.map((q, index) => (
              <Button
                key={q.id}
                variant={answers[q.id] ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentQuestionIndex(index)}
                className={currentQuestionIndex === index ? 'ring-2 ring-orange-500' : ''}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
