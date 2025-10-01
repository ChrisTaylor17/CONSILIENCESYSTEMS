import CybercoreBackground from '@/components/ui/cybercore-section-hero'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Zap, Coins, Palette } from 'lucide-react'

export default function Home() {
  return (
    <>
      <CybercoreBackground beamCount={70} />
      
      <div className="content-wrapper">
        <header className="main-header">
          <div className="logo">CONSILIENCE</div>
          <nav>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <main className="hero-section">
          <h1>Build Together, Launch Together</h1>
          <p>
            Connect with like-minded creators, collaborate on projects, and launch tokens & NFTs on Solana 
            with AI-powered guidance every step of the way.
          </p>
          <Button variant="cyber" size="lg" className="cta-button">
            Start Building Now
          </Button>
        </main>

        <section id="features" className="py-20 px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-cyan-400">
              Everything You Need to Succeed
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-900/50 border-cyan-400/20 backdrop-blur-sm">
                <CardHeader>
                  <Users className="w-8 h-8 text-cyan-400 mb-2" />
                  <CardTitle className="text-cyan-400">Smart Matching</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    AI-powered algorithm matches you with collaborators based on skills, interests, and project goals.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-cyan-400/20 backdrop-blur-sm">
                <CardHeader>
                  <Zap className="w-8 h-8 text-orange-400 mb-2" />
                  <CardTitle className="text-orange-400">AI Guidance</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Real-time AI assistant helps your team make decisions, solve problems, and stay on track.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-cyan-400/20 backdrop-blur-sm">
                <CardHeader>
                  <Coins className="w-8 h-8 text-yellow-400 mb-2" />
                  <CardTitle className="text-yellow-400">Token Launch</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Seamlessly create and launch tokens on Solana with built-in tools and templates.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-cyan-400/20 backdrop-blur-sm">
                <CardHeader>
                  <Palette className="w-8 h-8 text-purple-400 mb-2" />
                  <CardTitle className="text-purple-400">NFT Creation</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Design, mint, and launch NFT collections with integrated marketplace features.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 px-8 bg-gray-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12 text-cyan-400">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-cyan-400 text-black rounded-full flex items-center justify-center font-bold text-xl mx-auto">
                  1
                </div>
                <h3 className="text-xl font-semibold text-white">Match & Connect</h3>
                <p className="text-gray-300">
                  Create your profile and let our AI match you with perfect collaborators for your project ideas.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="w-12 h-12 bg-orange-400 text-black rounded-full flex items-center justify-center font-bold text-xl mx-auto">
                  2
                </div>
                <h3 className="text-xl font-semibold text-white">Build Together</h3>
                <p className="text-gray-300">
                  Collaborate in real-time with AI-powered chat assistance, project management, and decision support.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="w-12 h-12 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-xl mx-auto">
                  3
                </div>
                <h3 className="text-xl font-semibold text-white">Launch & Succeed</h3>
                <p className="text-gray-300">
                  Deploy your tokens and NFTs on Solana with guided launch strategies and marketing support.
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 px-8 text-center border-t border-gray-800">
          <div className="max-w-4xl mx-auto">
            <div className="logo text-2xl mb-4">CONSILIENCE SYSTEMS</div>
            <p className="text-gray-400 mb-6">
              Empowering creators to build the future of decentralized collaboration.
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-cyan-400">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-cyan-400">Terms</a>
              <a href="#" className="text-gray-400 hover:text-cyan-400">Support</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}