import { initTRPC } from '@trpc/server'
import _ from 'lodash'
import z from 'zod'

const ideas = _.times(100, (i) => ({
  id: `ideanick${i}`,
  name: `Idea${i}`,
  description: `Description idea${i} ...`,
  text: _.times(100, (j) => `<p>Text paragraph ${j} of ides ${i} </p>`).join(''),
}))

const trpc = initTRPC.create()
export const trpcRouter = trpc.router({
  getIdeas: trpc.procedure.query(() => {
    return { ideas: ideas.map((idea) => _.pick(idea, ['id', 'name', 'description'])) }
  }),
  getIdea: trpc.procedure
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
    }),
})
export type TrpcRouter = typeof trpcRouter
