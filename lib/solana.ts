import { Connection, PublicKey, Keypair, Transaction } from '@solana/web3.js'
import { createMint, getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token'

// Use devnet for development
const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

export interface TokenConfig {
  name: string
  symbol: string
  decimals: number
  initialSupply: number
}

export interface NFTMetadata {
  name: string
  description: string
  image: string
  attributes: Array<{ trait_type: string; value: string }>
}

export async function createToken(config: TokenConfig, payerKeypair: Keypair) {
  try {
    // Create mint account
    const mint = await createMint(
      connection,
      payerKeypair,
      payerKeypair.publicKey,
      null,
      config.decimals
    )

    // Get or create associated token account
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payerKeypair,
      mint,
      payerKeypair.publicKey
    )

    // Mint initial supply
    await mintTo(
      connection,
      payerKeypair,
      mint,
      tokenAccount.address,
      payerKeypair.publicKey,
      config.initialSupply * Math.pow(10, config.decimals)
    )

    return {
      mintAddress: mint.toBase58(),
      tokenAccount: tokenAccount.address.toBase58(),
      success: true
    }
  } catch (error) {
    console.error('Token creation error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export async function createNFTCollection(
  metadata: NFTMetadata,
  payerKeypair: Keypair
) {
  try {
    // This is a simplified NFT creation
    // In production, you'd use Metaplex or similar
    const mint = await createMint(
      connection,
      payerKeypair,
      payerKeypair.publicKey,
      null,
      0 // NFTs have 0 decimals
    )

    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payerKeypair,
      mint,
      payerKeypair.publicKey
    )

    // Mint 1 NFT
    await mintTo(
      connection,
      payerKeypair,
      mint,
      tokenAccount.address,
      payerKeypair.publicKey,
      1
    )

    return {
      mintAddress: mint.toBase58(),
      tokenAccount: tokenAccount.address.toBase58(),
      metadata,
      success: true
    }
  } catch (error) {
    console.error('NFT creation error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export function generateKeypair() {
  return Keypair.generate()
}

export async function getBalance(publicKey: PublicKey) {
  try {
    const balance = await connection.getBalance(publicKey)
    return balance / 1e9 // Convert lamports to SOL
  } catch (error) {
    console.error('Balance check error:', error)
    return 0
  }
}