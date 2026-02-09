'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { BookOpen, Video, Map, CheckCircle, Clock } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import VideoPlayer from './VideoPlayer'
import ActivityComponent from './ActivityComponent'

interface LessonViewerProps {
  lesson: {
    id: string
    title: string
    content: string
    reading_time_minutes: number
    learning_objectives: string[]
    unit_id: number
  }
  videos: Array<{
    id: string
    youtube_id: string
    title: string
    description: string
    order: number
  }>
  activities: Array<{
    id: string
    activity_type: string
    title: string
    instructions: string
    content: any
    points: number
    order: number
  }>
  hasQuiz: boolean
  onStartQuiz?: () => void
  onMarkComplete?: () => void
  isCompleted?: boolean
}

export default function LessonViewer({
  lesson,
  videos = [],
  activities = [],
  hasQuiz,
  onStartQuiz,
  onMarkComplete,
  isCompleted = false
}: LessonViewerProps) {
  const [activeTab, setActiveTab] = useState<string>('reading')
  const [readingProgress, setReadingProgress] = useState(0)

  // Handle scroll progress for reading section
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget
    const scrollPercentage = (element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100
    setReadingProgress(Math.min(Math.round(scrollPercentage), 100))
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      {/* Lesson Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold">{lesson.title}</h1>
          {isCompleted && (
            <Badge variant="default" className="bg-green-600">
              <CheckCircle className="w-4 h-4 mr-1" />
              Completed
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {lesson.reading_time_minutes} min read
          </span>
          {videos.length > 0 && (
            <span className="flex items-center gap-1">
              <Video className="w-4 h-4" />
              {videos.length} video{videos.length > 1 ? 's' : ''}
            </span>
          )}
          {activities.length > 0 && (
            <span className="flex items-center gap-1">
              <Map className="w-4 h-4" />
              {activities.length} activit{activities.length > 1 ? 'ies' : 'y'}
            </span>
          )}
        </div>
      </div>

      {/* Learning Objectives */}
      {lesson.learning_objectives && lesson.learning_objectives.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Learning Objectives</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1">
              {lesson.learning_objectives.map((objective, index) => (
                <li key={index} className="text-sm">
                  {objective}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="reading" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Reading</span>
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="w-4 h-4" />
            <span className="hidden sm:inline">Videos</span>
            {videos.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {videos.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="activities" className="flex items-center gap-2">
            <Map className="w-4 h-4" />
            <span className="hidden sm:inline">Activities</span>
            {activities.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {activities.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="quiz" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Quiz</span>
          </TabsTrigger>
        </TabsList>

        {/* Reading Tab */}
        <TabsContent value="reading">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Reading Material</CardTitle>
                <div className="text-sm text-muted-foreground">
                  {readingProgress}% complete
                </div>
              </div>
              <Progress value={readingProgress} className="h-2" />
            </CardHeader>
            <CardContent
              className="prose prose-slate dark:prose-invert max-w-none overflow-y-auto max-h-[600px]"
              onScroll={handleScroll}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {lesson.content}
              </ReactMarkdown>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Videos Tab */}
        <TabsContent value="videos">
          {videos.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                No videos available for this lesson.
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {videos.map((video) => (
                <VideoPlayer
                  key={video.id}
                  videoId={video.youtube_id}
                  title={video.title}
                  description={video.description}
                />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Activities Tab */}
        <TabsContent value="activities">
          {activities.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                No activities available for this lesson.
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => (
                <ActivityComponent
                  key={activity.id}
                  activity={activity}
                />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Quiz Tab */}
        <TabsContent value="quiz">
          <Card>
            <CardHeader>
              <CardTitle>Lesson Quiz</CardTitle>
              <CardDescription>
                Test your understanding of the material
              </CardDescription>
            </CardHeader>
            <CardContent>
              {hasQuiz ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Complete the reading and watch all videos before taking the quiz.
                    You must score 80% or higher to pass.
                  </p>
                  <Button onClick={onStartQuiz} size="lg" className="w-full sm:w-auto">
                    Start Quiz
                  </Button>
                </div>
              ) : (
                <p className="text-center text-muted-foreground">
                  No quiz available for this lesson yet.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Bottom Actions */}
      {!isCompleted && (
        <div className="mt-6 flex justify-end">
          <Button onClick={onMarkComplete} variant="default" size="lg">
            Mark as Complete
          </Button>
        </div>
      )}
    </div>
  )
}
