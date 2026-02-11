/**
 * AI Tutor System - Core Logic
 * Implements Socratic method with 5 Themes of Geography framework
 */

import Anthropic from '@anthropic-ai/sdk'
import OpenAI from 'openai'

export interface TutorContext {
  student_id?: number // Optional now that we simplified
  unit_id?: number
  unit_title?: string
  lesson_id?: number
  lesson_title?: string
  current_paragraph?: string
  activity_type?: 'quiz' | 'reflection' | 'map' | 'project'
  student_progress?: {
    lessons_completed: number[]
    recent_topics: string[]
    struggle_areas?: string[]
  }
}

export interface TutorMessage {
  role: 'user' | 'assistant'
  content: string
  referenced_themes?: string[]
  prompted_action?: string
  thinking_level?: string
  tokens_used?: number
}

/**
 * Base system prompt - Always active
 */
const BASE_SYSTEM_PROMPT = `You are an enthusiastic geography and history teacher helping a high school student learn about food history. Your teaching style is Socratic - you guide students to discover answers through thoughtful questions rather than giving direct answers.

CORE FRAMEWORK: Always connect discussions to the 5 Themes of Geography:
1. **Location** - Where is it? (absolute and relative location)
2. **Place** - What's it like there? (physical and human characteristics)
3. **Human-Environment Interaction** - How do people interact with their environment? (adapt, modify, depend)
4. **Movement** - How do people, goods, and ideas move? (migration, trade, cultural exchange)
5. **Region** - What makes areas similar or different? (formal, functional, perceptual regions)

TEACHING PRINCIPLES:
- Ask probing questions before giving answers
- Help students develop research and critical thinking skills
- Connect food topics to geography and history constantly
- Encourage curiosity and deeper investigation
- Make learning feel like an exciting discovery
- Be enthusiastic but professional (high school level)
- Break complex questions into manageable steps (scaffolding)
- Help students make predictions before learning new content
- Connect current topics to previously learned material
- Use real-world examples and comparisons

REMEMBER:
- This is a GEOGRAPHY and HISTORY course about food
- Always reference which geographic theme(s) you're discussing (use bold: **Location**, **Place**, etc.)
- Help students think like geographers and historians
- Guide research skills (video search terms, source evaluation)
- Make connections across lessons and units
- Never be condescending; respect student intelligence
- When they ask for help finding videos, teach them HOW to search effectively
- Encourage map exploration when relevant to geographic concepts

YOUR CONVERSATION MODES:
1. **Socratic Guide** - Answer questions with guiding questions
2. **Geographic Connector** - Explicitly link to the 5 themes
3. **Research Assistant** - Help develop search strategies
4. **Curiosity Catalyst** - Pose thought-provoking extensions
5. **Connection Maker** - Link across lessons and historical periods

Use emojis sparingly and appropriately: 🌍 🗺️ 🤔 💡 📍 🔍 (but don't overdo it)`

/**
 * Generate context-specific prompt augmentation
 */
function generateContextPrompt(context: TutorContext): string {
  let prompt = '\n\nCURRENT CONTEXT:\n'
  
  if (context.unit_id && context.unit_title) {
    prompt += `- Unit ${context.unit_id}: ${context.unit_title}\n`
  }
  
  if (context.lesson_id && context.lesson_title) {
    prompt += `- Lesson: ${context.lesson_title}\n`
  }
  
  if (context.current_paragraph) {
    prompt += `- Student is currently reading: "${context.current_paragraph.substring(0, 200)}..."\n`
  }
  
  if (context.activity_type) {
    const activityNames = {
      quiz: 'taking a quiz',
      reflection: 'working on a reflection activity',
      map: 'exploring the interactive map',
      project: 'working on a project'
    }
    prompt += `- Currently ${activityNames[context.activity_type]}\n`
  }
  
  if (context.student_progress) {
    prompt += `\nSTUDENT BACKGROUND:\n`
    prompt += `- Completed ${context.student_progress.lessons_completed.length} lessons\n`
    if (context.student_progress.recent_topics.length > 0) {
      prompt += `- Recent topics: ${context.student_progress.recent_topics.join(', ')}\n`
    }
    if (context.student_progress.struggle_areas && context.student_progress.struggle_areas.length > 0) {
      prompt += `- May need extra support with: ${context.student_progress.struggle_areas.join(', ')}\n`
    }
  }
  
  prompt += `\nTailor your responses to their current context. Reference specific content when relevant. Connect to previous lessons they've completed. Use the appropriate conversation mode based on what they need.`
  
  return prompt
}

/**
 * Generate AI response using Anthropic Claude
 */
export async function generateTutorResponse(
  messages: TutorMessage[],
  context: TutorContext,
  provider: 'anthropic' | 'openai' = 'openai' // Default to OpenAI
): Promise<{ content: string; tokens_used: number }> {
  
  if (provider === 'anthropic') {
    return generateWithAnthropic(messages, context)
  } else {
    return generateWithOpenAI(messages, context)
  }
}

/**
 * Anthropic Claude implementation
 */
async function generateWithAnthropic(
  messages: TutorMessage[],
  context: TutorContext
): Promise<{ content: string; tokens_used: number }> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    throw new Error('Anthropic API key not configured')
  }

  const anthropic = new Anthropic({ apiKey })
  
  // Prepare system prompt
  const systemPrompt = BASE_SYSTEM_PROMPT + generateContextPrompt(context)
  
  // Convert messages to Anthropic format
  const anthropicMessages = messages.map(msg => ({
    role: msg.role,
    content: msg.content
  }))

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20240620',
    max_tokens: 1024,
    system: systemPrompt,
    messages: anthropicMessages
  })

  const content = response.content[0]
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Anthropic')
  }

  return {
    content: content.text,
    tokens_used: response.usage.input_tokens + response.usage.output_tokens
  }
}

/**
 * OpenAI GPT implementation
 */
async function generateWithOpenAI(
  messages: TutorMessage[],
  context: TutorContext
): Promise<{ content: string; tokens_used: number }> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('OpenAI API key not configured')
  }

  const openai = new OpenAI({ apiKey })
  
  // Prepare system prompt
  const systemPrompt = BASE_SYSTEM_PROMPT + generateContextPrompt(context)
  
  // Convert messages to OpenAI format
  const openaiMessages = [
    { role: 'system' as const, content: systemPrompt },
    ...messages.map(msg => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content
    }))
  ]

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: openaiMessages,
    max_tokens: 1024,
    temperature: 0.7
  })

  const content = response.choices[0].message.content
  if (!content) {
    throw new Error('No response from OpenAI')
  }

  return {
    content,
    tokens_used: response.usage?.total_tokens || 0
  }
}

/**
 * Analyze message for geographic themes mentioned
 */
export function extractGeographicThemes(content: string): string[] {
  const themes: string[] = []
  
  const themePatterns = [
    { theme: 'Location', patterns: ['location', 'where', 'latitude', 'longitude', 'coordinates', 'located'] },
    { theme: 'Place', patterns: ['place', 'climate', 'landform', 'physical characteristics', 'human characteristics', 'culture'] },
    { theme: 'Human-Environment Interaction', patterns: ['interaction', 'adapt', 'modify', 'depend', 'environment', 'irrigation', 'terracing'] },
    { theme: 'Movement', patterns: ['movement', 'trade', 'migration', 'exchange', 'spread', 'travel', 'route'] },
    { theme: 'Region', patterns: ['region', 'area', 'similar', 'different', 'mediterranean', 'belt', 'zone'] }
  ]
  
  const lowerContent = content.toLowerCase()
  
  for (const { theme, patterns } of themePatterns) {
    if (patterns.some(pattern => lowerContent.includes(pattern))) {
      themes.push(theme)
    }
  }
  
  return [...new Set(themes)] // Remove duplicates
}

/**
 * Detect if message prompts an action
 */
export function detectPromptedAction(content: string): string | null {
  const lowerContent = content.toLowerCase()
  
  if (lowerContent.includes('search') || lowerContent.includes('video') || lowerContent.includes('find')) {
    return 'video_search'
  }
  
  if (lowerContent.includes('map') || lowerContent.includes('explore') || lowerContent.includes('geography')) {
    return 'map_exploration'
  }
  
  if (lowerContent.includes('reflect') || lowerContent.includes('think about') || lowerContent.includes('write')) {
    return 'reflection'
  }
  
  return null
}

/**
 * Assess thinking level from user message
 */
export function assessThinkingLevel(content: string): string {
  const lowerContent = content.toLowerCase()
  
  // Evaluative: comparing, judging, critiquing
  if (
    lowerContent.includes('compare') ||
    lowerContent.includes('why do you think') ||
    lowerContent.includes('better') ||
    lowerContent.includes('disagree')
  ) {
    return 'evaluative'
  }
  
  // Analytical: explaining, connecting, analyzing
  if (
    lowerContent.includes('because') ||
    lowerContent.includes('connect') ||
    lowerContent.includes('relate') ||
    lowerContent.includes('explain')
  ) {
    return 'analytical'
  }
  
  // Surface: recalling, listing, defining
  return 'surface'
}
