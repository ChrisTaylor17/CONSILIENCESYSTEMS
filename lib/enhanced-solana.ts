import { Connection, PublicKey, Keypair, Transaction, SystemProgram } from '@solana/web3.js'
import { createMint, getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token'
import { generateNFTImage, generateNFTMetadata } from './ai-image'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

export interface EnhancedNFTConfig {
  name: string
  description: string
  aiPrompt: string
  royalty?: number
  collection?: string
}

export async function createAINFT(config: EnhancedNFTConfig, payerKeypair: Keypair) {
  try {
    // Generate AI image
    const imageResult = await generateNFTImage(config.aiPrompt)
    if (!imageResult.success || !imageResult.imageUrl) {
      throw new Error('Failed to generate AI image')
    }

    // Create metadata
    const metadata = await generateNFTMetadata(
      config.name,
      config.description,
      imageResult.imageUrl
    )

    // Create mint
    const mint = await createMint(
      connection,
      payerKeypair,
      payerKeypair.publicKey,
      null,
      0 // NFTs have 0 decimals
    )

    // Get token account
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payerKeypair,
      mint,
      payerKeypair.publicKey
    )

    // Mint NFT
    await mintTo(
      connection,
      payerKeypair,
      mint,
      tokenAccount.address,
      payerKeypair.publicKey,
      1
    )

    return {
      success: true,
      mintAddress: mint.toBase58(),
      tokenAccount: tokenAccount.address.toBase58(),
      metadata,
      imageUrl: imageResult.imageUrl,
      aiPrompt: imageResult.revisedPrompt
    }
  } catch (error) {
    console.error('AI NFT creation error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export async function createTokenWithAI(
  name: string,
  symbol: string,
  description: string,
  supply: number,
  payerKeypair: Keypair
) {
  try {
    const mint = await createMint(
      connection,
      payerKeypair,
      payerKeypair.publicKey,
      null,
      9 // Standard token decimals
    )

    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payerKeypair,
      mint,
      payerKeypair.publicKey
    )

    await mintTo(
      connection,
      payerKeypair,
      mint,
      tokenAccount.address,
      payerKeypair.publicKey,
      supply * Math.pow(10, 9)
    )

    // Store token metadata
    const tokenMetadata = {
      name,
      symbol,
      description,
      decimals: 9,
      supply,
      mintAddress: mint.toBase58(),
      creator: payerKeypair.publicKey.toBase58(),
      createdAt: new Date().toISOString()
    }

    return {
      success: true,
      ...tokenMetadata,
      tokenAccount: tokenAccount.address.toBase58()
    }
  } catch (error) {
    console.error('Token creation error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Token creation failed'
    }
  }
}

export async function getTokenBalance(mintAddress: string, ownerAddress: string) {
  try {
    const mintPubkey = new PublicKey(mintAddress)
    const ownerPubkey = new PublicKey(ownerAddress)
    
    const tokenAccounts = await connection.getTokenAccountsByOwner(ownerPubkey, {
      mint: mintPubkey
    })

    if (tokenAccounts.value.length === 0) {
      return 0
    }

    const accountInfo = await connection.getTokenAccountBalance(
      tokenAccounts.value[0].pubkey
    )

    return parseFloat(accountInfo.value.uiAmountString || '0')
  } catch (error) {
    console.error('Balance check error:', error)
    return 0
  }
}