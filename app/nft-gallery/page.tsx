'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Palette, Zap, ExternalLink } from 'lucide-react'
import Image from 'next/image'

interface NFT {
  id: string
  name: string
  description: string
  image: string
  price: number
  creator: string
  mintAddress?: string
}

export default function NFTGallery() {
  const [nfts, setNfts] = useState<NFT[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    // Mock NFT data
    setNfts([
      {
        id: '1',
        name: 'Cyber Phoenix',
        description: 'A majestic phoenix rising through digital flames',
        image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400',
        price: 2.5,
        creator: 'AI Artist',
        mintAddress: 'ABC123...XYZ'
      },
      {
        id: '2',
        name: 'Quantum Landscape',
        description: 'Abstract quantum realm visualization',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400',
        price: 1.8,
        creator: 'AI Artist',
        mintAddress: 'DEF456...UVW'
      }
    ])
  }, [])

  const generateNewNFT = async () => {
    setIsGenerating(true)
    
    try {
      const response = await fetch('/api/generate-nft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: 'futuristic digital art, cyberpunk style, neon colors, abstract composition'
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        const newNFT: NFT = {
          id: Date.now().toString(),
          name: `AI Creation ${nfts.length + 1}`,
          description: 'AI-generated NFT artwork',
          image: data.imageUrl,
          price: Math.random() * 5 + 0.5,
          creator: 'CONSILIENCE AI',
          mintAddress: 'MINT' + Date.now()
        }
        setNfts(prev => [newNFT, ...prev])
      }
    } catch (error) {
      console.error('NFT generation failed:', error)
    }
    
    setIsGenerating(false)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="border-b border-gray-800 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-cyan-400">NFT Gallery</h1>
            <p className="text-gray-400 mt-1">AI-generated NFTs on Solana</p>
          </div>
          <Button 
            variant="cyber" 
            onClick={generateNewNFT}
            disabled={isGenerating}
            className="flex items-center gap-2"
          >
            {isGenerating ? (
              <Zap className="w-4 h-4 animate-spin" />
            ) : (
              <Palette className="w-4 h-4" />
            )}
            {isGenerating ? 'Generating...' : 'Generate NFT'}
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {nfts.map((nft) => (
            <Card key={nft.id} className="bg-gray-800 border-gray-700 hover:border-cyan-400/50 transition-all group">
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  src={nft.image}
                  alt={nft.name}
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-cyan-400 text-lg">{nft.name}</CardTitle>
                <CardDescription className="text-sm">{nft.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-orange-400 font-bold">{nft.price} SOL</span>
                  <span className="text-xs text-gray-400">by {nft.creator}</span>
                </div>
                
                {nft.mintAddress && (
                  <div className="text-xs text-gray-500 font-mono">
                    {nft.mintAddress}
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Button size="sm" variant="cyber" className="flex-1">
                    Buy Now
                  </Button>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {nfts.length === 0 && (
          <div className="text-center py-12">
            <Palette className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No NFTs yet</h3>
            <p className="text-gray-500 mb-6">Generate your first AI-powered NFT</p>
            <Button variant="cyber" onClick={generateNewNFT}>
              Create First NFT
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}