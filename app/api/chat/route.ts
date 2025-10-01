import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an AI assistant for CONSILIENCE, helping with blockchain projects, tokenomics, and team collaboration.'
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    })

    return NextResponse.json({
      success: true,
      response: response.choices[0]?.message?.content || 'No response generated'
    })
  } catch (error) {
    return NextResponse.json({ error: 'Chat error' }, { status: 500 })
  }
}