/**
 * AI Tutor Button
 * Opens the tutor chat sidebar from anywhere in the app
 */

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MessageCircle, Sparkles } from 'lucide-react'
import TutorChat from './TutorChat'
import { cn } from '@/lib/utils'

interface TutorButtonProps {
  context: {
    unit_id?: number
    unit_title?: string
    lesson_id?: number
    lesson_title?: string
    current_paragraph?: string
    activity_type?: 'quiz' | 'reflection' | 'map' | 'project'
  }
  variant?: 'default' | 'outline' | 'ghost' | 'floating'
  label?: string
  conversationId?: number
}

export default function TutorButton({
  context,
  variant = 'default',
  label = 'Ask Geography Tutor',
  conversationId
}: TutorButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (variant === 'floating') {
    return (
      <>
        <Button
          onClick={() => setIsOpen(true)}
          className={cn(
            "fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg z-40",
            "bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700",
            "transition-all duration-200 hover:scale-110"
          )}
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">{label}</span>
        </Button>

        <TutorChat
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          context={context}
          conversationId={conversationId}
        />
      </>
    )
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant={variant}
        className={cn(
          variant === 'default' && "bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
        )}
      >
        <MessageCircle className="mr-2 h-4 w-4" />
        {label}
      </Button>

      <TutorChat
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        context={context}
        conversationId={conversationId}
      />
    </>
  )
}

/**
 * Contextual Prompt Button
 * Embedded in content with pre-loaded question
 */
interface ContextualPromptProps {
  context: TutorButtonProps['context']
  preloadedQuestion?: string
  prompt: string
  conversationId?: number
}

export function TutorContextualPrompt({
  context,
  preloadedQuestion,
  prompt,
  conversationId
}: ContextualPromptProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="my-4 p-4 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg">
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-blue-900">💭 {prompt}</p>
            <Button
              variant="link"
              className="h-auto p-0 text-blue-700 hover:text-blue-900 text-sm"
              onClick={() => setIsOpen(true)}
            >
              Ask the Geography Tutor →
            </Button>
          </div>
        </div>
      </div>

      <TutorChat
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        context={context}
        conversationId={conversationId}
      />
    </>
  )
}
