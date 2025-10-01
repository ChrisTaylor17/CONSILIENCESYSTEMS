'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Coins, TrendingUp, Users, Zap } from 'lucide-react'

export default function TokenRoom() {
  const [tokens] = useState([
    {
      symbol: 'CONS',
      name: 'Consilience Token',
      price: 0.45,
      change: 12.5,
      volume: '2.4M',
      holders: 1250,
      supply: '100M'
    },
    {
      symbol: 'BUILD',
      name: 'Builder Token',
      price: 1.23,
      change: -3.2,
      volume: '890K',
      holders: 890,
      supply: '50M'
    }
  ])

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="border-b border-gray-800 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-cyan-400">Token Room</h1>
            <p className="text-gray-400 mt-1">Launch and manage your Solana tokens</p>
          </div>
          <Button variant="cyber">
            <Coins className="w-4 h-4 mr-2" />
            Create Token
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Value Locked</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan-400">$2.4M</div>
              <p className="text-xs text-green-400 mt-1">+15.3% from last week</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Active Tokens</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-400">12</div>
              <p className="text-xs text-gray-400 mt-1">Across all projects</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Holders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400">8.2K</div>
              <p className="text-xs text-green-400 mt-1">+234 this week</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Tokens</h2>
          
          {tokens.map((token) => (
            <Card key={token.symbol} className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-orange-400 rounded-full flex items-center justify-center font-bold text-black">
                      {token.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-cyan-400">{token.name}</h3>
                      <p className="text-sm text-gray-400">{token.symbol}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <div className="font-bold">${token.price}</div>
                      <div className={`text-sm ${token.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {token.change > 0 ? '+' : ''}{token.change}%
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-gray-400">Volume</div>
                      <div className="font-medium">${token.volume}</div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-gray-400">Holders</div>
                      <div className="font-medium flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {token.holders}
                      </div>
                    </div>

                    <Button size="sm" variant="outline">
                      Manage
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-6">Token Creation Wizard</h2>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-cyan-400">Launch Your Token</CardTitle>
              <CardDescription>Create and deploy a new token on Solana with AI guidance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Token Name"
                  className="p-3 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
                <input
                  type="text"
                  placeholder="Symbol (e.g., CONS)"
                  className="p-3 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
                <input
                  type="number"
                  placeholder="Total Supply"
                  className="p-3 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
                <input
                  type="number"
                  placeholder="Decimals (usually 9)"
                  className="p-3 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>
              <textarea
                placeholder="Token description and utility..."
                rows={3}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white"
              />
              <div className="flex gap-3">
                <Button variant="cyber" className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Get AI Suggestions
                </Button>
                <Button variant="outline">
                  Create Token
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}