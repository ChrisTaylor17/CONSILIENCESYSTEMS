'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Users, Zap } from 'lucide-react'

export default function Projects() {
  const [projects] = useState([
    {
      id: 1,
      name: 'DeFi Analytics Platform',
      description: 'Real-time analytics for DeFi protocols',
      members: 4,
      progress: 75,
      status: 'active'
    },
    {
      id: 2,
      name: 'NFT Marketplace',
      description: 'Next-gen NFT trading platform',
      members: 3,
      progress: 45,
      status: 'active'
    }
  ])

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="border-b border-gray-800 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-cyan-400">Projects</h1>
          <Button variant="cyber">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-cyan-400">{project.name}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                  <Users className="w-4 h-4" />
                  {project.members} members
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 to-orange-400 h-2 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <Button size="sm" variant="outline" className="w-full">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}