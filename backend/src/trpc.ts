import { initTRPC } from '@trpc/server'

const ideas = [
  { id: 'ideanick1', name: 'Idea1', description: 'Description idea1 ...' },
  { id: 'ideanick2', name: 'Idea2', description: 'Description idea2 ...' },
  { id: 'ideanick3', name: 'Idea3', description: 'Description idea3 ...' },
  { id: 'ideanick4', name: 'Idea4', description: 'Description idea4 ...' },
  { id: 'ideanick5', name: 'Idea5', description: 'Description idea5 ...' },
]
const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getIdeas: trpc.procedure.query(() => {
    return { ideas }
  }),
})

export type TrpcRouter = typeof trpcRouter


