/**
 * API Route: AI Tutor Chat
 * 
 * POST /api/tutor/chat
 * Handles conversational AI tutoring with geographic framework
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import {
  generateTutorResponse,
  extractGeographicThemes,
  detectPromptedAction,
  assessThinkingLevel,
  type TutorContext
} from '@/lib/ai-tutor'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  console.log('[TUTOR API] POST request received at:', new Date().toISOString())
  console.log('[TUTOR API] Request URL:', request.url)
  console.log('[TUTOR API] Request headers:', Object.fromEntries(request.headers.entries()))
  
  try {
    console.log('[TUTOR API] Creating Supabase client...')
    const supabase = await createClient()
    
    // Check authentication
    console.log('[TUTOR API] Checking authentication...')
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    console.log('[TUTOR API] Auth result:', { user: user?.id, error: authError })
    if (authError || !user) {
      console.log('[TUTOR API] Authentication failed:', authError)
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get student profile
    console.log('[TUTOR API] Fetching student profile for user:', user.id)
    const { data: student } = await supabase
      .from('student_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (!student) {
      console.log('[TUTOR API] Student profile not found for user:', user.id)
      return NextResponse.json(
        { error: 'Student profile not found' },
        { status: 404 }
      )
    }
    console.log('[TUTOR API] Student profile found:', student.id)

    console.log('[TUTOR API] Parsing request body...')
    const body = await request.json()
    console.log('[TUTOR API] Request body:', { 
      messageLength: body.message?.length,
      hasConversationId: !!body.conversation_id,
      hasContext: !!body.context
    })
    const {
      message,
      conversation_id,
      context
    }: {
      message: string
      conversation_id?: number
      context: TutorContext
    } = body

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Ensure context has student_id
    const fullContext: TutorContext = {
      ...context,
      student_id: student.id
    }

    let activeConversationId = conversation_id

    // If no conversation exists, create one
    if (!activeConversationId) {
      const { data: newConversation, error: createError } = await supabase
        .from('tutor_conversations')
        .insert({
          student_id: student.id,
          unit_id: context.unit_id,
          lesson_id: context.lesson_id,
          current_paragraph: context.current_paragraph,
          activity_type: context.activity_type
        })
        .select('id')
        .single()

      if (createError || !newConversation) {
        throw new Error('Failed to create conversation')
      }

      activeConversationId = newConversation.id
    }

    // Get conversation history
    const { data: previousMessages, error: historyError } = await supabase
      .from('tutor_messages')
      .select('role, content')
      .eq('conversation_id', activeConversationId)
      .order('created_at', { ascending: true })
      .limit(20) // Last 20 messages for context

    if (historyError) {
      throw new Error('Failed to fetch conversation history')
    }

    // Add user message to database
    const userThinkingLevel = assessThinkingLevel(message)
    
    const { error: userMessageError } = await supabase
      .from('tutor_messages')
      .insert({
        conversation_id: activeConversationId,
        role: 'user',
        content: message,
        thinking_level: userThinkingLevel
      })

    if (userMessageError) {
      throw new Error('Failed to save user message')
    }

    // Prepare full message history for AI
    const fullHistory = [
      ...(previousMessages || []),
      { role: 'user' as const, content: message }
    ]

    // Generate AI response
    const { content: aiResponse, tokens_used } = await generateTutorResponse(
      fullHistory,
      fullContext
    )

    // Analyze AI response for themes and actions
    const referencedThemes = extractGeographicThemes(aiResponse)
    const promptedAction = detectPromptedAction(aiResponse)

    // Save AI response to database
    const { error: aiMessageError } = await supabase
      .from('tutor_messages')
      .insert({
        conversation_id: activeConversationId,
        role: 'assistant',
        content: aiResponse,
        referenced_themes: referencedThemes,
        prompted_action: promptedAction,
        tokens_used
      })

    if (aiMessageError) {
      throw new Error('Failed to save AI response')
    }

    // Update conversation metadata
    if (referencedThemes.length > 0) {
      const { data: currentConvo } = await supabase
        .from('tutor_conversations')
        .select('geographic_themes_discussed, inquiry_depth')
        .eq('id', activeConversationId)
        .single()

      const existingThemes = currentConvo?.geographic_themes_discussed || []
      const updatedThemes = [...new Set([...existingThemes, ...referencedThemes])]

      await supabase
        .from('tutor_conversations')
        .update({
          geographic_themes_discussed: updatedThemes,
          inquiry_depth: (currentConvo?.inquiry_depth || 0) + 1
        })
        .eq('id', activeConversationId)
    }

    return NextResponse.json({
      success: true,
      conversation_id: activeConversationId,
      response: aiResponse,
      metadata: {
        themes: referencedThemes,
        prompted_action: promptedAction,
        tokens_used
      }
    })

  } catch (error) {
    console.error('Tutor chat error:', error)
    return NextResponse.json(
      {
        error: 'Failed to process chat',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/tutor/chat?conversation_id=123
 * Retrieve conversation history
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const conversationId = searchParams.get('conversation_id')

    if (!conversationId) {
      return NextResponse.json(
        { error: 'conversation_id is required' },
        { status: 400 }
      )
    }

    // Get student profile
    const { data: student } = await supabase
      .from('student_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (!student) {
      return NextResponse.json(
        { error: 'Student profile not found' },
        { status: 404 }
      )
    }

    // Verify conversation belongs to student
    const { data: conversation, error: convoError } = await supabase
      .from('tutor_conversations')
      .select('*')
      .eq('id', conversationId)
      .eq('student_id', student.id)
      .single()

    if (convoError || !conversation) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      )
    }

    // Get messages
    const { data: messages, error: messagesError } = await supabase
      .from('tutor_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })

    if (messagesError) {
      throw new Error('Failed to fetch messages')
    }

    return NextResponse.json({
      success: true,
      conversation,
      messages
    })

  } catch (error) {
    console.error('Fetch conversation error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch conversation',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
