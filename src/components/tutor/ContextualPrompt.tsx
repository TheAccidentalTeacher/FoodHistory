'use client'

interface ContextualPromptProps {
  text: string
  context: {
    unit_id: number
    unit_title?: string
    lesson_id: number
    lesson_title: string
    paragraph_context?: string
  }
  onPromptClick: (prompt: string, context: any) => void
}

export default function ContextualPrompt({ text, context, onPromptClick }: ContextualPromptProps) {
  const handleClick = () => {
    onPromptClick(text, context)
  }

  return (
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
            {text}
          </p>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            Click to explore with your AI tutor →
          </p>
        </div>
      </div>
    </div>
  )
}
