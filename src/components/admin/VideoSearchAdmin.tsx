/**
 * Admin Video Search Component
 * Search for and add educational videos to lessons
 */

'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Search, Loader2, Play, Plus, ExternalLink } from 'lucide-react'
import { formatDuration } from '@/lib/youtube'

interface Video {
  videoId: string
  title: string
  description: string
  channelTitle: string
  thumbnailUrl: string
  durationSeconds: number
  viewCount?: number
}

export default function VideoSearchAdmin() {
  const [searchType, setSearchType] = useState<'simple' | 'ai'>('ai')
  const [query, setQuery] = useState('')
  const [lessonTitle, setLessonTitle] = useState('')
  const [lessonContent, setLessonContent] = useState('')
  const [unitTitle, setUnitTitle] = useState('')
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async () => {
    setLoading(true)
    setError('')
    setVideos([])

    try {
      if (searchType === 'simple') {
        // Simple search
        const response = await fetch(`/api/videos/search?query=${encodeURIComponent(query)}&maxResults=10`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Search failed')
        }

        setVideos(data.videos)
      } else {
        // AI-powered search
        const response = await fetch('/api/videos/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lessonTitle,
            lessonContent,
            unitTitle,
            useAI: true,
            aiProvider: 'anthropic',
            maxResults: 10
          })
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Search failed')
        }

        setVideos(data.videos)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed')
    } finally {
      setLoading(false)
    }
  }

  const handleAddVideo = async (video: Video, lessonId: number) => {
    // TODO: Add video to database
    console.log('Adding video to lesson:', lessonId, video)
    alert(`Video "${video.title}" will be added to lesson ${lessonId}`)
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Video Search</h1>
        <p className="text-muted-foreground">
          Search for educational videos using AI or simple keyword search
        </p>
      </div>

      {/* Search Type Tabs */}
      <div className="flex gap-2">
        <Button
          variant={searchType === 'ai' ? 'default' : 'outline'}
          onClick={() => setSearchType('ai')}
        >
          AI-Powered Search
        </Button>
        <Button
          variant={searchType === 'simple' ? 'default' : 'outline'}
          onClick={() => setSearchType('simple')}
        >
          Simple Search
        </Button>
      </div>

      {/* Search Form */}
      <Card>
        <CardHeader>
          <CardTitle>
            {searchType === 'ai' ? 'AI-Powered Video Search' : 'Simple Video Search'}
          </CardTitle>
          <CardDescription>
            {searchType === 'ai'
              ? 'Provide lesson details and AI will generate optimal search queries'
              : 'Enter keywords to search YouTube directly'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {searchType === 'simple' ? (
            <div className="space-y-2">
              <Label htmlFor="query">Search Query</Label>
              <Input
                id="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., food history agriculture CrashCourse"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="unitTitle">Unit Title (optional)</Label>
                <Input
                  id="unitTitle"
                  value={unitTitle}
                  onChange={(e) => setUnitTitle(e.target.value)}
                  placeholder="e.g., The Origins of Food"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lessonTitle">Lesson Title *</Label>
                <Input
                  id="lessonTitle"
                  value={lessonTitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                  placeholder="e.g., The Agricultural Revolution"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lessonContent">Lesson Content Preview *</Label>
                <Textarea
                  id="lessonContent"
                  value={lessonContent}
                  onChange={(e) => setLessonContent(e.target.value)}
                  placeholder="Paste a preview of the lesson content (first paragraph or key topics)"
                  rows={4}
                  required
                />
              </div>
            </>
          )}

          <Button
            onClick={handleSearch}
            disabled={loading || (searchType === 'simple' ? !query : !lessonTitle || !lessonContent)}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Search Videos
              </>
            )}
          </Button>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-800">
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Search Results */}
      {videos.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Search Results ({videos.length})</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {videos.map((video) => (
              <Card key={video.videoId} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <a
                      href={`https://youtube.com/watch?v=${video.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white"
                    >
                      <Play className="h-12 w-12" />
                    </a>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                    <Badge variant="secondary">
                      {formatDuration(video.durationSeconds)}
                    </Badge>
                  </div>
                  <CardDescription>{video.channelTitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {video.description}
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Plus className="mr-2 h-4 w-4" />
                      Add to Lesson
                    </Button>
                    <Button size="sm" variant="ghost" asChild>
                      <a
                        href={`https://youtube.com/watch?v=${video.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
