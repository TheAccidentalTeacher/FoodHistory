/**
 * Simple test endpoint to verify API routes work
 * GET /api/test
 */

import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  console.log('[TEST API] Request received at:', new Date().toISOString())
  
  return NextResponse.json({
    status: 'ok',
    message: 'API routes are working',
    timestamp: new Date().toISOString(),
    env: {
      hasAnthropicKey: !!process.env.ANTHROPIC_API_KEY,
      hasOpenAIKey: !!process.env.OPENAI_API_KEY,
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      nodeVersion: process.version
    }
  })
}

export async function POST() {
  console.log('[TEST API] POST request received at:', new Date().toISOString())
  
  return NextResponse.json({
    status: 'ok',
    message: 'POST requests are working',
    timestamp: new Date().toISOString()
  })
}
