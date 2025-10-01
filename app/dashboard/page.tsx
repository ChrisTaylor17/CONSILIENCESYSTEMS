'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, MessageSquare, Coins, Palette, Zap } from 'lucide-react'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('projects')

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-cyan-400">CONSILIENCE Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">Welcome back, Creator</span>
            <Button variant="outline" size="sm">Profile</Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              <Button
                variant={activeTab === 'projects' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('projects')}
              >
                <Zap className="w-4 h-4 mr-2" />
                My Projects
              </Button>
              <Button
                variant={activeTab === 'matches' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('matches')}
              >
                <Users className="w-4 h-4 mr-2" />
                Find Collaborators
              </Button>
              <Button
                variant={activeTab === 'chat' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('chat')}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Team Chat
              </Button>
              <Button
                variant={activeTab === 'tokens' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('tokens')}
              >
                <Coins className="w-4 h-4 mr-2" />
                Launch Tokens
              </Button>
              <Button
                variant={activeTab === 'nfts' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('nfts')}
              >
                <Palette className="w-4 h-4 mr-2" />
                Create NFTs
              </Button>
            </nav>
          </div>

          <div className="lg:col-span-3">
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">My Projects</h2>
                  <Button variant="cyber">New Project</Button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-cyan-400">DeFi Dashboard</CardTitle>
                      <CardDescription>Building a comprehensive DeFi analytics platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">3 collaborators</span>
                        <Button size="sm" variant="outline">View</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-orange-400">NFT Marketplace</CardTitle>
                      <CardDescription>Creating a next-gen NFT trading platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">2 collaborators</span>
                        <Button size="sm" variant="outline">View</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'tokens' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Launch Tokens</h2>
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>Create Your Token</CardTitle>
                    <CardDescription>Launch your project token on Solana</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Token Name"
                        className="p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      />
                      <input
                        type="text"
                        placeholder="Symbol"
                        className="p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      />
                    </div>
                    <Button variant="cyber" className="w-full">Create Token</Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}