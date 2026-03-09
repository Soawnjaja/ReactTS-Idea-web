import { initTRPC } from '@trpc/server'
import _ from 'lodash'

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
})

export type TrpcRouter = typeof trpcRouter
