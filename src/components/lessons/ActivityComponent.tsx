'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, CheckCircle, AlertCircle } from 'lucide-react'

interface Activity {
  id: string
  activity_type: string
  title: string
  instructions: string
  content: any
  points: number
  order: number
}

interface ActivityComponentProps {
  activity: Activity
}

export default function ActivityComponent({ activity }: ActivityComponentProps) {
  const [isCompleted, setIsCompleted] = useState(false)
  const [userAnswer, setUserAnswer] = useState<any>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const handleSubmit = () => {
    // Mock submission - in production, validate against correct answer
    setShowFeedback(true)
    setIsCompleted(true)
  }

  const renderActivityContent = () => {
    switch (activity.activity_type) {
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
              {activity.content?.events?.map((event: string, index: number) => (
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
                {activity.content?.columnA?.map((item: string, index: number) => (
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
                {activity.content?.columnB?.map((item: string, index: number) => (
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
                {activity.content?.text || 'Activity content not available'}
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
            <Badge variant="outline">{activity.points} points</Badge>
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
                  You've completed this activity and earned {activity.points} points.
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
