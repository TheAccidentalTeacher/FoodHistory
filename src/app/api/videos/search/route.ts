/**
 * API Route: Search for educational videos
 * 
 * POST /api/videos/search
 * 
 * Uses AI to generate search queries, then searches YouTube
 */

import { NextRequest, NextResponse } from 'next/server'
import { generateVideoSearchQueries, generateBasicSearchQuery } from '@/lib/ai-video-search'
import { searchYouTubeVideos, YouTubeVideo } from '@/lib/youtube'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      lessonTitle,
      lessonContent,
      unitTitle,
      useAI = true,
      aiProvider = 'anthropic',
      maxResults = 10
    } = body

    if (!lessonTitle) {
      return NextResponse.json(
        { error: 'lessonTitle is required' },
        { status: 400 }
      )
    }

    let searchResults: YouTubeVideo[] = []

    if (useAI && lessonContent) {
      // Use AI to generate smart search queries
      try {
        const queries = await generateVideoSearchQueries(
          {
            lessonTitle,
            lessonContent,
            unitTitle,
            numberOfQueries: 2
          },
          aiProvider
        )

        // Search with each AI-generated query
        for (const queryObj of queries) {
          const videos = await searchYouTubeVideos({
            query: queryObj.query,
            maxResults: Math.ceil(maxResults / queries.length),
            videoDuration: 'medium',
            order: 'relevance'
          })
          searchResults.push(...videos)
        }

        // Remove duplicates
        const uniqueVideos = Array.from(
          new Map(searchResults.map(v => [v.videoId, v])).values()
        )
        searchResults = uniqueVideos.slice(0, maxResults)

      } catch (aiError) {
        console.error('AI search failed, falling back to basic search:', aiError)
        // Fall back to basic search
        const basicQuery = generateBasicSearchQuery(lessonTitle, unitTitle)
        searchResults = await searchYouTubeVideos({
          query: basicQuery,
          maxResults
        })
      }
    } else {
      // Use basic search without AI
      const basicQuery = generateBasicSearchQuery(lessonTitle, unitTitle)
      searchResults = await searchYouTubeVideos({
        query: basicQuery,
        maxResults
      })
    }

    return NextResponse.json({
      success: true,
      videos: searchResults,
      count: searchResults.length
    })

  } catch (error) {
    console.error('Video search error:', error)
    return NextResponse.json(
      {
        error: 'Failed to search videos',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/videos/search?query=...
 * Simple query-based search
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query')
    const maxResults = parseInt(searchParams.get('maxResults') || '10')

    if (!query) {
      return NextResponse.json(
        { error: 'query parameter is required' },
        { status: 400 }
      )
    }

    const videos = await searchYouTubeVideos({
      query,
      maxResults,
      videoDuration: 'medium',
      order: 'relevance'
    })

    return NextResponse.json({
      success: true,
      videos,
      count: videos.length
    })

  } catch (error) {
    console.error('Video search error:', error)
    return NextResponse.json(
      {
        error: 'Failed to search videos',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
