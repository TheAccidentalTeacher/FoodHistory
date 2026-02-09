'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Play, CheckCircle } from 'lucide-react'

interface VideoPlayerProps {
  videoId: string
  title: string
  description?: string
  onWatchComplete?: () => void
}

export default function VideoPlayer({
  videoId,
  title,
  description,
  onWatchComplete
}: VideoPlayerProps) {
  const [isWatched, setIsWatched] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  // Mock watch tracking - in production, use YouTube API
  useEffect(() => {
    if (isPlaying) {
      // Simulate marking as watched after 30 seconds
      const timer = setTimeout(() => {
        setIsWatched(true)
        if (onWatchComplete) {
          onWatchComplete()
        }
      }, 30000)

      return () => clearTimeout(timer)
    }
  }, [isPlaying, onWatchComplete])

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            {description && (
              <CardDescription className="mt-2">{description}</CardDescription>
            )}
          </div>
          {isWatched && (
            <Badge variant="default" className="bg-green-600">
              <CheckCircle className="w-4 h-4 mr-1" />
              Watched
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          {!isPlaying ? (
            // Thumbnail with play button
            <div
              className="absolute inset-0 bg-slate-900 rounded-lg flex items-center justify-center cursor-pointer group"
              onClick={() => setIsPlaying(true)}
            >
              <img
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover rounded-lg opacity-60 group-hover:opacity-80 transition-opacity"
              />
              <div className="relative z-10 bg-orange-600 rounded-full p-4 group-hover:bg-orange-700 transition-colors">
                <Play className="w-8 h-8 text-white" fill="white" />
              </div>
            </div>
          ) : (
            // YouTube iframe embed
            <iframe
              className="absolute inset-0 w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </CardContent>
    </Card>
  )
}
