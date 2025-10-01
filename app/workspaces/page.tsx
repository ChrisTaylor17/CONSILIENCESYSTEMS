'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare, Users, Zap, Send, Bot } from 'lucide-react'

export default function Workspaces() {
  const [activeWorkspace, setActiveWorkspace] = useState('defi-analytics')
  const [message, setMessage] = useState('')
  
  const workspaces = [
    { id: 'defi-analytics', name: 'DeFi Analytics', members: 4, unread: 3 },
    { id: 'nft-marketplace', name: 'NFT Marketplace', members: 3, unread: 0 },
    { id: 'gaming-token', name: 'Gaming Token', members: 6, unread: 7 }
  ]

  const messages = [
    {
      id: 1,
      user: 'Alice',
      avatar: 'A',
      message: 'Just pushed the latest smart contract updates',
      time: '2:30 PM',
      type: 'user'
    },
    {
      id: 2,
      user: 'AI Assistant',
      avatar: 'AI',
      message: 'Great work! I noticed the gas optimization could be improved by 15%. Would you like me to suggest some changes?',
      time: '2:32 PM',
      type: 'ai'
    },
    {
      id: 3,
      user: 'Bob',
      avatar: 'B',
      message: 'Yes please! Also, can we review the tokenomics model?',
      time: '2:35 PM',
      type: 'user'
    }
  ]

  const sendMessage = () => {
    if (message.trim()) {
      // Handle message sending
      setMessage('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="border-b border-gray-800 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-cyan-400">Workspaces</h1>
          <p className="text-gray-400 mt-1">Collaborate with your team and AI</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Workspace Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800 border-gray-700 h-full">
              <CardHeader>
                <CardTitle className="text-lg">Workspaces</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {workspaces.map((workspace) => (
                  <div
                    key={workspace.id}
                    onClick={() => setActiveWorkspace(workspace.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      activeWorkspace === workspace.id
                        ? 'bg-cyan-400/20 border border-cyan-400/50'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-cyan-400">{workspace.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Users className="w-3 h-3" />
                          {workspace.members}
                        </div>
                      </div>
                      {workspace.unread > 0 && (
                        <span className="bg-orange-400 text-black text-xs px-2 py-1 rounded-full font-bold">
                          {workspace.unread}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="bg-gray-800 border-gray-700 h-full flex flex-col">
              <CardHeader className="border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-cyan-400">
                      {workspaces.find(w => w.id === activeWorkspace)?.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {workspaces.find(w => w.id === activeWorkspace)?.members} members
                      <Bot className="w-4 h-4 text-orange-400" />
                      AI Assistant active
                    </CardDescription>
                  </div>
                  <Button size="sm" variant="outline">
                    <Zap className="w-4 h-4 mr-2" />
                    AI Insights
                  </Button>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      msg.type === 'ai' 
                        ? 'bg-orange-400 text-black' 
                        : 'bg-cyan-400 text-black'
                    }`}>
                      {msg.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-cyan-400">{msg.user}</span>
                        <span className="text-xs text-gray-400">{msg.time}</span>
                      </div>
                      <div className={`p-3 rounded-lg ${
                        msg.type === 'ai'
                          ? 'bg-orange-400/10 border border-orange-400/20'
                          : 'bg-gray-700'
                      }`}>
                        {msg.message}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-md text-white"
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <Button onClick={sendMessage} variant="cyber">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}