/**
 * Parses lesson content to extract contextual prompts and convert them to components
 * 
 * Syntax: {{prompt|Prompt text that sparks curiosity}}
 * 
 * Example: 
 * Rice grows in monsoon climates.
 * {{prompt|Why do you think rice needs so much rainfall to grow?}}
 * The heavy seasonal rains...
 */

export interface ParsedPrompt {
  text: string
  position: number
}

export function extractPrompts(content: string): ParsedPrompt[] {
  const promptRegex = /\{\{prompt\|(.*?)\}\}/g
  const prompts: ParsedPrompt[] = []
  let match

  while ((match = promptRegex.exec(content)) !== null) {
    prompts.push({
      text: match[1].trim(),
      position: match.index
    })
  }

  return prompts
}

export function contentHasPrompts(content: string): boolean {
  return /\{\{prompt\|/.test(content)
}

/**
 * Splits content around prompts to enable proper rendering
 * Returns array of content chunks and prompts in order
 */
export function splitContentByPrompts(content: string): Array<{ type: 'content' | 'prompt', value: string }> {
  const parts: Array<{ type: 'content' | 'prompt', value: string }> = []
  const promptRegex = /\{\{prompt\|(.*?)\}\}/g
  
  let lastIndex = 0
  let match

  while ((match = promptRegex.exec(content)) !== null) {
    // Add content before this prompt
    if (match.index > lastIndex) {
      parts.push({
        type: 'content',
        value: content.substring(lastIndex, match.index)
      })
    }

    // Add the prompt
    parts.push({
      type: 'prompt',
      value: match[1].trim()
    })

    lastIndex = match.index + match[0].length
  }

  // Add remaining content after last prompt
  if (lastIndex < content.length) {
    parts.push({
      type: 'content',
      value: content.substring(lastIndex)
    })
  }

  return parts
}
