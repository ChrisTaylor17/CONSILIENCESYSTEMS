import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateProjectGuidance(
  projectDescription: string,
  teamMembers: string[],
  currentPhase: string
) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are an AI project advisor for CONSILIENCE, a platform that helps teams collaborate on blockchain projects. 
          Your role is to provide actionable guidance for launching tokens and NFTs on Solana. 
          Be specific, practical, and encouraging.`
        },
        {
          role: 'user',
          content: `Project: ${projectDescription}
          Team: ${teamMembers.join(', ')}
          Current Phase: ${currentPhase}
          
          Provide specific next steps and guidance for this project.`
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    })

    return response.choices[0]?.message?.content || 'Unable to generate guidance at this time.'
  } catch (error) {
    console.error('OpenAI API error:', error)
    return 'AI guidance temporarily unavailable. Please try again later.'
  }
}

export async function matchCollaborators(
  userSkills: string[],
  projectNeeds: string[],
  availableUsers: any[]
) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a smart matching algorithm for CONSILIENCE. Match users based on complementary skills and project needs.'
        },
        {
          role: 'user',
          content: `User Skills: ${userSkills.join(', ')}
          Project Needs: ${projectNeeds.join(', ')}
          Available Users: ${JSON.stringify(availableUsers)}
          
          Return the top 3 best matches with reasons.`
        }
      ],
      max_tokens: 300,
      temperature: 0.5,
    })

    return response.choices[0]?.message?.content || 'No matches found.'
  } catch (error) {
    console.error('OpenAI API error:', error)
    return 'Matching service temporarily unavailable.'
  }
}