import { trpc } from '../../lib/trpc'
import z from 'zod'
import { ideas } from '../../lib/ideas'

export const getIdeaTrpcRoute = trpc.procedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .query(({ input }) => {
    const idea = ideas.find((idea) => idea.id === input.id)
    if (!idea) {
      throw new Error(`Idea ${input.id} not found`)
    }
    return { idea: idea || null }
  })
