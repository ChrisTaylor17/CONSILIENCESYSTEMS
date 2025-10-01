import { NextRequest, NextResponse } from 'next/server'
import { generateNFTImage } from '@/lib/ai-image'

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    const result = await generateNFTImage(prompt)

    if (!result.success) {
      return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      imageUrl: result.imageUrl,
      revisedPrompt: result.revisedPrompt
    })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}