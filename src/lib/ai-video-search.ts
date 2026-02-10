/**
 * AI-powered video search query generation
 * Uses OpenAI or Anthropic to generate effective YouTube search queries
 */

import Anthropic from '@anthropic-ai/sdk'
import OpenAI from 'openai'

export interface AIVideoSearchParams {
  lessonTitle: string
  lessonContent: string
  unitTitle?: string
  targetAudience?: string
  preferredChannels?: string[]
  numberOfQueries?: number
}

export interface GeneratedQuery {
  query: string
  reasoning: string
  suggestedChannels?: string[]
}

/**
 * Generate optimized YouTube search queries using AI
 */
export async function generateVideoSearchQueries(
  params: AIVideoSearchParams,
  provider: 'openai' | 'anthropic' = 'anthropic'
): Promise<GeneratedQuery[]> {
  const {
    lessonTitle,
    lessonContent,
    unitTitle,
    targetAudience = 'high school students',
    preferredChannels = [
      'CrashCourse',
      'TED-Ed',
      'Kurzgesagt',
      'PBS Eons',
      'Vox',
      'SciShow',
      'History Channel',
      'National Geographic',
      'Tasting History',
      'Bon Appétit'
    ],
    numberOfQueries = 3
  } = params

  const prompt = `You are helping find educational YouTube videos for a food history curriculum.

Lesson Context:
- Unit: ${unitTitle || 'Food History'}
- Lesson Title: ${lessonTitle}
- Target Audience: ${targetAudience}
- Lesson Content Preview: ${lessonContent.substring(0, 500)}...

Preferred Educational Channels: ${preferredChannels.join(', ')}

Generate ${numberOfQueries} effective YouTube search queries that would find high-quality educational videos for this lesson. For each query:

1. Make it specific enough to find relevant content
2. Use terms that educational channels typically use
3. Consider including channel names for better results
4. Suggest specific educational YouTube channels that might have relevant content

Respond in JSON format:
{
  "queries": [
    {
      "query": "search query string",
      "reasoning": "why this query will find good videos",
      "suggestedChannels": ["channel1", "channel2"]
    }
  ]
}

Focus on finding videos that:
- Are educational and accurate
- Appropriate for ${targetAudience}
- Between 5-20 minutes long
- From reputable educational sources
- Complement the lesson content`

  if (provider === 'anthropic') {
    return generateWithAnthropic(prompt)
  } else {
    return generateWithOpenAI(prompt)
  }
}

/**
 * Generate queries using Anthropic Claude
 */
async function generateWithAnthropic(prompt: string): Promise<GeneratedQuery[]> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    throw new Error('Anthropic API key not configured')
  }

  const anthropic = new Anthropic({ apiKey })

  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: prompt
      }
    ]
  })

  const content = message.content[0]
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Anthropic')
  }

  const jsonMatch = content.text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw new Error('Could not parse JSON from Anthropic response')
  }

  const result = JSON.parse(jsonMatch[0])
  return result.queries || []
}

/**
 * Generate queries using OpenAI GPT
 */
async function generateWithOpenAI(prompt: string): Promise<GeneratedQuery[]> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('OpenAI API key not configured')
  }

  const openai = new OpenAI({ apiKey })

  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: 'You are an expert at finding educational YouTube videos. Always respond with valid JSON.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    response_format: { type: 'json_object' }
  })

  const content = completion.choices[0].message.content
  if (!content) {
    throw new Error('No response from OpenAI')
  }

  const result = JSON.parse(content)
  return result.queries || []
}

/**
 * Quick search query generation without AI (fallback)
 */
export function generateBasicSearchQuery(lessonTitle: string, unitTitle?: string): string {
  const baseTerms = ['educational', 'history', 'crash course']
  const cleanTitle = lessonTitle.replace(/^Lesson \d+:\s*/i, '')

  if (unitTitle) {
    return `${cleanTitle} ${unitTitle} ${baseTerms.join(' ')}`
  }

  return `${cleanTitle} ${baseTerms.join(' ')}`
}
