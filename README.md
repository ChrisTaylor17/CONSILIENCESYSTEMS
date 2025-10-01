# CONSILIENCE - AI-Powered Project Collaboration Platform

A SaaS platform that matches creators to collaborate on projects and launch tokens & NFTs on Solana with AI guidance.

## Features

- **Smart Matching**: AI-powered algorithm matches collaborators based on skills and project needs
- **AI Guidance**: Real-time AI assistant helps teams make decisions and stay on track
- **Token Launch**: Seamlessly create and launch tokens on Solana
- **NFT Creation**: Design, mint, and launch NFT collections
- **Team Chat**: Collaborate with AI-powered chat assistance

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **AI**: OpenAI GPT-4 integration
- **Blockchain**: Solana Web3.js, SPL Token
- **Deployment**: Vercel-ready

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
# Add your OpenAI API key
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                 # Next.js app directory
│   ├── dashboard/       # Dashboard pages
│   ├── globals.css      # Global styles with cybercore animations
│   └── page.tsx         # Landing page
├── components/ui/       # shadcn/ui components
│   ├── cybercore-section-hero.tsx  # Animated background
│   ├── button.tsx       # Button component
│   └── card.tsx         # Card component
├── lib/                 # Utility functions
│   ├── openai.ts        # OpenAI integration
│   ├── solana.ts        # Solana blockchain integration
│   └── utils.ts         # General utilities
```

## Key Components

### CybercoreBackground
Animated cybercore-style background with light beams and glowing effects.

### AI Integration
- Project guidance and recommendations
- Smart collaborator matching
- Real-time chat assistance

### Solana Integration
- Token creation and minting
- NFT collection deployment
- Wallet integration ready

## Deployment

Deploy to Vercel:

```bash
npm run build
```

The app is configured for Vercel deployment with proper Next.js settings.

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key for AI features
- `NEXT_PUBLIC_SOLANA_NETWORK`: Solana network (devnet/mainnet)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.