/**
 * Lesson Content Renderer
 * Parses and renders lesson content with contextual AI tutor prompts
 */

'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { TutorContextualPrompt } from '@/components/tutor/TutorButton'
import { splitContentByPrompts } from '@/lib/parseContentPrompts'

interface LessonContentRendererProps {
  content: string
  context: {
    unit_id: number
    unit_title?: string
    lesson_id: number
    lesson_title: string
  }
}

export default function LessonContentRenderer({ content, context }: LessonContentRendererProps) {
  const parts = splitContentByPrompts(content)

  return (
    <div>
      {parts.map((part, index) => {
        if (part.type === 'prompt') {
          return (
            <TutorContextualPrompt
              key={`prompt-${index}`}
              context={context}
              prompt={part.value}
            />
          )
        } else {
          return (
            <div key={`content-${index}`} className="markdown-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {part.value}
              </ReactMarkdown>
            </div>
          )
        }
      })}
    </div>
  )
}
