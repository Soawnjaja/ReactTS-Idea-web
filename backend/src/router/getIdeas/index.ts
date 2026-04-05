import { ideas } from '../../lib/ideas'
import { trpc } from '../../lib/trpc'

export const getIdeasTrpcRoute = trpc.procedure.query(() => {
  return {
    ideas: ideas.map((idea) => ({
      nick: idea.nick,
      name: idea.name,
      description: idea.description,
    })),
  }
})
