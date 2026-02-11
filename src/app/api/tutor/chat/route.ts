/**
 * API Route: AI Tutor Chat
 * 
 * POST /api/tutor/chat
 * Handles conversational AI tutoring with geographic framework
 * Simplified version - no database tracking required
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import {
  generateTutorResponse,
  extractGeographicThemes,
  detectPromptedAction,
  type TutorContext
} from '@/lib/ai-tutor'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  console.log('[TUTOR API] POST request received at:', new Date().toISOString())
  
  try {
    // Check authentication
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      console.log('[TUTOR API] Authentication failed')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('[TUTOR API] Authenticated user:', user.id)

    // Parse request
    const body = await request.json()
    const { message, context } = body

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Build context for AI
    const fullContext: TutorContext = {
      unitId: context?.unitId,
      lessonId: context?.lessonId,
      currentParagraph: context?.currentParagraph,
      activityType: context?.activityType
    }

    // Get conversation history from client (no database needed)
    const history = context?.history || []
    const fullHistory = [
      ...history,
      { role: 'user' as const, content: message }
    ]

    console.log('[TUTOR API] Generating AI response with', fullHistory.length, 'messages')

    // Generate AI response
    const { content: aiResponse, tokens_used } = await generateTutorResponse(
      fullHistory,
      fullContext
    )

    console.log('[TUTOR API] AI response generated,', tokens_used, 'tokens used')

    // Analyze response for geographic themes
    const referencedThemes = extractGeographicThemes(aiResponse)
    const promptedAction = detectPromptedAction(aiResponse)

    return NextResponse.json({
      response: aiResponse,
      metadata: {
        themes: referencedThemes,
        prompted_action: promptedAction,
        tokens_used
      }
    })

  } catch (error) {
    console.error('[TUTOR API] Error:', error)
    return NextResponse.json(
      {
        error: 'Failed to process chat',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
