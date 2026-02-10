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
  initialPrompt?: string
}

export default function TutorButton({
  context,
  variant = 'default',
  label = 'Ask Geography Tutor',
  conversationId,
  initialPrompt
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
          initialPrompt={initialPrompt}
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
        initialPrompt={initialPrompt}
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
  prompt: string
  conversationId?: number
}

export function TutorContextualPrompt({
  context,
  prompt,
  conversationId
}: ContextualPromptProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(true)
  }

  return (
    <>
      <div 
        onClick={handleClick}
        className="my-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-l-4 border-blue-400 rounded-r-lg cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02] group"
      >
        <div className="flex items-start gap-3">
          <div className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
            💭
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
              Think about it...
            </p>
            <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              {prompt}
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Click to explore with your AI tutor →
            </p>
          </div>
        </div>
      </div>

      <TutorChat
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        context={context}
        conversationId={conversationId}
        initialPrompt={prompt}
      />
    </>
  )
}
