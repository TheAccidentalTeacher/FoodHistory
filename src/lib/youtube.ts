/**
 * YouTube API utilities for searching and retrieving video information
 */

export interface YouTubeVideo {
  videoId: string
  title: string
  description: string
  channelTitle: string
  thumbnailUrl: string
  duration: string // ISO 8601 format
  durationSeconds: number
  publishedAt: string
  viewCount?: number
  likeCount?: number
}

export interface YouTubeSearchParams {
  query: string
  maxResults?: number
  relevanceLanguage?: string
  videoDuration?: 'short' | 'medium' | 'long' // short: <4min, medium: 4-20min, long: >20min
  order?: 'relevance' | 'date' | 'rating' | 'viewCount'
  safeSearch?: 'none' | 'moderate' | 'strict'
}

/**
 * Search YouTube for educational videos
 */
export async function searchYouTubeVideos(
  params: YouTubeSearchParams
): Promise<YouTubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey) {
    throw new Error('YouTube API key not configured')
  }

  const {
    query,
    maxResults = 10,
    relevanceLanguage = 'en',
    videoDuration = 'medium',
    order = 'relevance',
    safeSearch = 'strict'
  } = params

  // Step 1: Search for videos
  const searchUrl = new URL('https://www.googleapis.com/youtube/v3/search')
  searchUrl.searchParams.append('part', 'snippet')
  searchUrl.searchParams.append('q', query)
  searchUrl.searchParams.append('type', 'video')
  searchUrl.searchParams.append('maxResults', maxResults.toString())
  searchUrl.searchParams.append('order', order)
  searchUrl.searchParams.append('relevanceLanguage', relevanceLanguage)
  searchUrl.searchParams.append('safeSearch', safeSearch)
  searchUrl.searchParams.append('videoDuration', videoDuration)
  searchUrl.searchParams.append('videoEmbeddable', 'true')
  searchUrl.searchParams.append('key', apiKey)

  const searchResponse = await fetch(searchUrl.toString())
  if (!searchResponse.ok) {
    const error = await searchResponse.json()
    throw new Error(`YouTube search failed: ${error.error?.message || 'Unknown error'}`)
  }

  const searchData = await searchResponse.json()
  const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',')

  if (!videoIds) {
    return []
  }

  // Step 2: Get detailed video information
  const videosUrl = new URL('https://www.googleapis.com/youtube/v3/videos')
  videosUrl.searchParams.append('part', 'snippet,contentDetails,statistics')
  videosUrl.searchParams.append('id', videoIds)
  videosUrl.searchParams.append('key', apiKey)

  const videosResponse = await fetch(videosUrl.toString())
  if (!videosResponse.ok) {
    const error = await videosResponse.json()
    throw new Error(`YouTube videos fetch failed: ${error.error?.message || 'Unknown error'}`)
  }

  const videosData = await videosResponse.json()

  // Step 3: Transform to our format
  return videosData.items.map((item: any) => ({
    videoId: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    channelTitle: item.snippet.channelTitle,
    thumbnailUrl: item.snippet.thumbnails.medium.url,
    duration: item.contentDetails.duration,
    durationSeconds: parseDuration(item.contentDetails.duration),
    publishedAt: item.snippet.publishedAt,
    viewCount: parseInt(item.statistics.viewCount || '0'),
    likeCount: parseInt(item.statistics.likeCount || '0')
  }))
}

/**
 * Parse ISO 8601 duration string (e.g., "PT15M33S") to seconds
 */
function parseDuration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return 0

  const hours = parseInt(match[1] || '0')
  const minutes = parseInt(match[2] || '0')
  const seconds = parseInt(match[3] || '0')

  return hours * 3600 + minutes * 60 + seconds
}

/**
 * Format duration seconds to readable string
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

/**
 * Get video information by ID
 */
export async function getVideoById(videoId: string): Promise<YouTubeVideo | null> {
  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey) {
    throw new Error('YouTube API key not configured')
  }

  const url = new URL('https://www.googleapis.com/youtube/v3/videos')
  url.searchParams.append('part', 'snippet,contentDetails,statistics')
  url.searchParams.append('id', videoId)
  url.searchParams.append('key', apiKey)

  const response = await fetch(url.toString())
  if (!response.ok) {
    return null
  }

  const data = await response.json()
  if (!data.items || data.items.length === 0) {
    return null
  }

  const item = data.items[0]
  return {
    videoId: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    channelTitle: item.snippet.channelTitle,
    thumbnailUrl: item.snippet.thumbnails.medium.url,
    duration: item.contentDetails.duration,
    durationSeconds: parseDuration(item.contentDetails.duration),
    publishedAt: item.snippet.publishedAt,
    viewCount: parseInt(item.statistics.viewCount || '0'),
    likeCount: parseInt(item.statistics.likeCount || '0')
  }
}
