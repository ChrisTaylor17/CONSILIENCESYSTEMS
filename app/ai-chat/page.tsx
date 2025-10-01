'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Send, Bot, User, Zap, Lightbulb, Code, Coins } from 'lucide-react'

export default function AIChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Hello! I\'m your AI assistant for CONSILIENCE. I can help you with project planning, tokenomics, smart contracts, and team collaboration. What would you like to work on today?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const quickActions = [
    { icon: Lightbulb, label: 'Project Ideas', prompt: 'Help me brainstorm innovative DeFi project ideas' },
    { icon: Code, label: 'Smart Contracts', prompt: 'Review my smart contract for security vulnerabilities' },
    { icon: Coins, label: 'Tokenomics', prompt: 'Design tokenomics for my gaming project' },
    { icon: Zap, label: 'Team Building', prompt: 'What skills should I look for in my team?' }
  ]

  const sendMessage = async (messageText?: string) => {
    const text = messageText || input
    if (!text.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user' as const,
      content: text,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Get real AI response
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      })
      
      const data = await response.json()
      
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai' as const,
        content: data.success ? data.response : 'Sorry, I encountered an error.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
    } catch (error) {
      const errorResponse = {
        id: Date.now() + 1,
        type: 'ai' as const,
        content: 'Sorry, I\'m having trouble connecting right now.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorResponse])
    }
    
    setIsLoading(false)
  }

  const generateAIResponse = (prompt: string) => {
    if (prompt.toLowerCase().includes('project') || prompt.toLowerCase().includes('idea')) {
      return 'Here are some innovative project ideas:\n\n1. **Cross-chain DeFi Aggregator**: Build a platform that aggregates liquidity across multiple blockchains\n2. **AI-Powered Yield Farming**: Create smart contracts that automatically optimize yield farming strategies\n3. **Decentralized Creator Economy**: Platform for creators to tokenize their content and engage with fans\n\nWhich direction interests you most?'
    }
    
    if (prompt.toLowerCase().includes('smart contract') || prompt.toLowerCase().includes('security')) {
      return 'For smart contract security, I recommend:\n\n✅ **Key Security Practices:**\n- Use OpenZeppelin libraries for standard implementations\n- Implement proper access controls with role-based permissions\n- Add reentrancy guards for external calls\n- Use SafeMath for arithmetic operations\n- Implement circuit breakers for emergency stops\n\nWould you like me to review specific contract code?'
    }

    if (prompt.toLowerCase().includes('tokenomics') || prompt.toLowerCase().includes('token')) {
      return 'Great tokenomics design includes:\n\n🎯 **Core Elements:**\n- **Utility**: Clear use cases for your token\n- **Distribution**: Fair allocation (team, community, treasury)\n- **Incentives**: Rewards for desired behaviors\n- **Deflationary mechanisms**: Burning, staking rewards\n- **Governance**: Voting rights for token holders\n\nWhat type of project are you building tokens for?'
    }

    return 'I understand you\'re looking for guidance. Could you provide more specific details about your project or challenge? I can help with:\n\n• Project planning and strategy\n• Technical architecture\n• Team building and collaboration\n• Tokenomics and economics\n• Smart contract development\n• Community building\n\nWhat area would you like to focus on?'
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="border-b border-gray-800 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-cyan-400">AI Assistant</h1>
          <p className="text-gray-400 mt-1">Get expert guidance for your blockchain projects</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Quick Actions Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-left h-auto p-3"
                    onClick={() => sendMessage(action.prompt)}
                  >
                    <action.icon className="w-4 h-4 mr-2 text-cyan-400" />
                    <span className="text-sm">{action.label}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="bg-gray-800 border-gray-700 h-full flex flex-col">
              <CardHeader className="border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <Bot className="w-6 h-6 text-orange-400" />
                  <CardTitle className="text-cyan-400">CONSILIENCE AI</CardTitle>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                    Online
                  </span>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'ai' 
                        ? 'bg-orange-400 text-black' 
                        : 'bg-cyan-400 text-black'
                    }`}>
                      {message.type === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-cyan-400">
                          {message.type === 'ai' ? 'AI Assistant' : 'You'}
                        </span>
                        <span className="text-xs text-gray-400">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <div className={`p-3 rounded-lg whitespace-pre-line ${
                        message.type === 'ai'
                          ? 'bg-orange-400/10 border border-orange-400/20'
                          : 'bg-gray-700'
                      }`}>
                        {message.content}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-400 text-black flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-orange-400/10 border border-orange-400/20 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          <span className="text-sm text-gray-400 ml-2">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>

              {/* Input */}
              <div className="p-4 border-t border-gray-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything about your blockchain project..."
                    className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-md text-white"
                    onKeyPress={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
                    disabled={isLoading}
                  />
                  <Button 
                    onClick={() => sendMessage()} 
                    variant="cyber"
                    disabled={isLoading || !input.trim()}
                  >
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