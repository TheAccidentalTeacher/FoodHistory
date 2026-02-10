/**
 * AI Tutor Chat Component
 * Persistent sidebar with Socratic method and geographic framework
 */

'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { X, Send, Loader2, MessageCircle, Map, Compass } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TutorMessage {
  role: 'user' | 'assistant'
  content: string
  referenced_themes?: string[]
  prompted_action?: string
  timestamp?: string
}

interface TutorContext {
  unit_id?: number
  unit_title?: string
  lesson_id?: number
  lesson_title?: string
  current_paragraph?: string
  activity_type?: 'quiz' | 'reflection' | 'map' | 'project'
}

interface TutorChatProps {
  isOpen: boolean
  onClose: () => void
  context: TutorContext
  conversationId?: number
}

const THEME_COLORS: Record<string, string> = {
  Location: 'bg-blue-100 text-blue-800',
  Place: 'bg-green-100 text-green-800',
  'Human-Environment Interaction': 'bg-purple-100 text-purple-800',
  Movement: 'bg-orange-100 text-orange-800',
  Region: 'bg-pink-100 text-pink-800'
}

const STARTER_QUESTIONS = [
  "How does geography affect this topic?",
  "Help me understand the location context",
  "What connections can I make to previous lessons?",
  "Help me find videos about this topic"
]

export default function TutorChat({ isOpen, onClose, context, conversationId: initialConvoId }: TutorChatProps) {
  const [messages, setMessages] = useState<TutorMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [conversationId, setConversationId] = useState<number | undefined>(initialConvoId)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Load conversation history if conversation_id exists
  useEffect(() => {
    if (conversationId) {
      loadConversationHistory()
    }
  }, [conversationId])

  const loadConversationHistory = async () => {
    try {
      const response = await fetch(`/api/tutor/chat?conversation_id=${conversationId}`)
      const data = await response.json()

      if (data.success && data.messages) {
        setMessages(data.messages.map((msg: any) => ({
          role: msg.role,
          content: msg.content,
          referenced_themes: msg.referenced_themes,
          prompted_action: msg.prompted_action,
          timestamp: msg.created_at
        })))
      }
    } catch (error) {
      console.error('Failed to load conversation:', error)
    }
  }

  const sendMessage = async (messageText: string = input) => {
    if (!messageText.trim() || loading) return

    const userMessage: TutorMessage = {
      role: 'user',
      content: messageText,
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/tutor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          conversation_id: conversationId,
          context
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message')
      }

      // Update conversation ID if this was first message
      if (!conversationId && data.conversation_id) {
        setConversationId(data.conversation_id)
      }

      const assistantMessage: TutorMessage = {
        role: 'assistant',
        content: data.response,
        referenced_themes: data.metadata.themes,
        prompted_action: data.metadata.prompted_action,
        timestamp: new Date().toISOString()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)
      
      // Show error message
      const errorMessage: TutorMessage = {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again or refresh the page.',
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-white border-l shadow-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-green-50">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Compass className="h-5 w-5 text-blue-600" />
              <h2 className="font-semibold text-lg">Geography Tutor</h2>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Ask questions, explore geography, discover connections
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Context Badge */}
        {context.lesson_title && (
          <div className="mt-3 flex items-center gap-2 text-xs">
            <Map className="h-3 w-3" />
            <span className="text-muted-foreground">{context.lesson_title}</span>
          </div>
        )}
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        {messages.length === 0 ? (
          <div className="space-y-4">
            <div className="text-center text-sm text-muted-foreground py-8">
              <Compass className="h-12 w-12 mx-auto mb-3 text-blue-300" />
              <p className="font-medium mb-2">👋 Hello! I'm your Geography Tutor</p>
              <p className="mb-4">
                I'll help you explore food history through the lens of geography's 5 themes:
              </p>
              <div className="flex flex-wrap gap-1 justify-center mb-4">
                {Object.entries(THEME_COLORS).map(([theme, color]) => (
                  <Badge key={theme} variant="secondary" className={cn("text-xs", color)}>
                    {theme}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Starter Questions */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Try asking:</p>
              {STARTER_QUESTIONS.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full text-left justify-start text-xs h-auto py-2"
                  onClick={() => sendMessage(question)}
                  disabled={loading}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex",
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-lg px-4 py-2",
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  )}
                >
                  <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                  
                  {/* Geographic Themes */}
                  {message.referenced_themes && message.referenced_themes.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {message.referenced_themes.map((theme, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className={cn("text-xs", THEME_COLORS[theme] || 'bg-gray-200')}
                        >
                          {theme}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-4 py-3">
                  <Loader2 className="h-4 w-4 animate-spin text-gray-600" />
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex gap-2">
          <Textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question about geography, food, or history..."
            className="flex-1 min-h-[60px] max-h-32 resize-none"
            disabled={loading}
          />
          <Button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            size="icon"
            className="h-[60px] w-[60px] shrink-0"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          💡 Tip: I'll guide you to discover answers through questions and geographic thinking
        </p>
      </div>
    </div>
  )
}
