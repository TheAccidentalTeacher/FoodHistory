'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { MapPin, CheckCircle, AlertCircle, Pencil } from 'lucide-react'
import dynamic from 'next/dynamic'

const MapActivity = dynamic(() => import('./MapActivity'), { 
  ssr: false,
  loading: () => <div className="w-full h-96 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">Loading map...</div>
})

interface Activity {
  id: string
  activity_type: string
  title: string
  instructions: string
  activity_data: any
  points_possible: number
  sequence_order: number
}

interface ActivityComponentProps {
  activity: Activity
}

export default function ActivityComponent({ activity }: ActivityComponentProps) {
  const [isCompleted, setIsCompleted] = useState(false)
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [showFeedback, setShowFeedback] = useState(false)
  const [wordCount, setWordCount] = useState(0)

  const handleTextChange = (field: string, value: string) => {
    setResponses(prev => ({ ...prev, [field]: value }))
    const words = value.trim().split(/\s+/).filter(w => w.length > 0)
    setWordCount(words.length)
  }

  const handleSubmit = () => {
    // Save to database in production
    setShowFeedback(true)
    setIsCompleted(true)
  }

  const renderActivityContent = () => {
    switch (activity.activity_type) {
      case 'reflection':
        return (
          <div className="space-y-6">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-sm text-muted-foreground mb-4">
                Take time to reflect on these questions. Your answers will be saved and can become part of your final portfolio.
              </p>
            </div>

            {/* Question 1 */}
            <div className="space-y-2">
              <Label htmlFor="q1" className="text-base font-medium">
                1. What's the most memorable meal you've ever had?
              </Label>
              <p className="text-sm text-muted-foreground">
                Describe where you were, what you ate, and why it stands out in your memory. (Minimum: 50 words)
              </p>
              <Textarea
                id="q1"
                value={responses.q1 || ''}
                onChange={(e) => handleTextChange('q1', e.target.value)}
                placeholder="Share your memorable meal experience..."
                className="min-h-[120px]"
                disabled={isCompleted}
              />
              <div className="text-xs text-muted-foreground text-right">
                {responses.q1 ? responses.q1.trim().split(/\s+/).filter(w => w.length > 0).length : 0} words
              </div>
            </div>

            {/* Question 2 */}
            <div className="space-y-2">
              <Label htmlFor="q2" className="text-base font-medium">
                2. Describe one food tradition in your family
              </Label>
              <p className="text-sm text-muted-foreground">
                This could be a holiday meal, a special recipe, or even "Tuesday night dinners." Where do you think this tradition came from? (Minimum: 50 words)
              </p>
              <Textarea
                id="q2"
                value={responses.q2 || ''}
                onChange={(e) => handleTextChange('q2', e.target.value)}
                placeholder="Describe your family food tradition..."
                className="min-h-[120px]"
                disabled={isCompleted}
              />
              <div className="text-xs text-muted-foreground text-right">
                {responses.q2 ? responses.q2.trim().split(/\s+/).filter(w => w.length > 0).length : 0} words
              </div>
            </div>

            {/* Question 3 */}
            <div className="space-y-2">
              <Label htmlFor="q3" className="text-base font-medium">
                3. Three foods you eat regularly that did NOT originate in North America
              </Label>
              <p className="text-sm text-muted-foreground">
                Name three foods and guess where they came from. You'll learn the real answers in this course!
              </p>
              <Textarea
                id="q3"
                value={responses.q3 || ''}
                onChange={(e) => handleTextChange('q3', e.target.value)}
                placeholder="Food 1: ___ → Origin guess: ___&#10;Food 2: ___ → Origin guess: ___&#10;Food 3: ___ → Origin guess: ___"
                className="min-h-[100px]"
                disabled={isCompleted}
              />
            </div>

            {/* Question 4 */}
            <div className="space-y-2">
              <Label htmlFor="q4" className="text-base font-medium">
                4. As a future Michelin-star personal chef...
              </Label>
              <p className="text-sm text-muted-foreground">
                What historical period, culture, or region are you MOST curious to learn about? Why? (Minimum: 30 words)
              </p>
              <Textarea
                id="q4"
                value={responses.q4 || ''}
                onChange={(e) => handleTextChange('q4', e.target.value)}
                placeholder="Share what interests you most about food history..."
                className="min-h-[100px]"
                disabled={isCompleted}
              />
              <div className="text-xs text-muted-foreground text-right">
                {responses.q4 ? responses.q4.trim().split(/\s+/).filter(w => w.length > 0).length : 0} words
              </div>
            </div>
          </div>
        )

      case 'map_interaction':
        return (
          <div className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-sm text-muted-foreground">
                Click on each continent to discover foods that originated there. After exploring all 6 continents, you'll answer a reflection question.
              </p>
            </div>
            <MapActivity onComplete={() => setIsCompleted(true)} />
          </div>
        )

      case 'map_click':
      case 'map_click':
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Click on the map to identify locations mentioned in the lesson.
            </p>
            <div className="w-full h-64 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600">
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto mb-2 text-slate-400" />
                <p className="text-sm text-slate-500">
                  Interactive map will load here
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  (Requires Leaflet integration)
                </p>
              </div>
            </div>
          </div>
        )

      case 'timeline':
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Arrange these events in chronological order.
            </p>
            <div className="space-y-2">
              {activity.activity_data?.events?.map((event: string, index: number) => (
                <div
                  key={index}
                  className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 cursor-move"
                >
                  {event}
                </div>
              ))}
            </div>
          </div>
        )

      case 'matching':
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Match the items from Column A to Column B.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Column A</h4>
                {activity.activity_data?.columnA?.map((item: string, index: number) => (
                  <div
                    key={index}
                    className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Column B</h4>
                {activity.activity_data?.columnB?.map((item: string, index: number) => (
                  <div
                    key={index}
                    className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'fill_blank':
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Fill in the blanks with the correct words.
            </p>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <p className="text-sm leading-relaxed">
                {activity.activity_data?.text || 'Activity content not available'}
              </p>
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center text-muted-foreground py-8">
            <p>Activity type: {activity.activity_type}</p>
            <p className="text-sm mt-2">Content will be rendered here</p>
          </div>
        )
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{activity.title}</CardTitle>
            <CardDescription className="mt-2">
              {activity.instructions}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end gap-2">
            {isCompleted && (
              <Badge variant="default" className="bg-green-600">
                <CheckCircle className="w-4 h-4 mr-1" />
                Completed
              </Badge>
            )}
            <Badge variant="outline">{activity.points_possible} points</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {renderActivityContent()}

        {showFeedback && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-semibold text-green-900 dark:text-green-100">
                  Great job!
                </p>
                <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                  You've completed this activity and earned {activity.points_possible} points.
                </p>
              </div>
            </div>
          </div>
        )}

        {!isCompleted && (
          <div className="mt-4 flex justify-end">
            <Button onClick={handleSubmit} variant="default">
              Submit Answer
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
