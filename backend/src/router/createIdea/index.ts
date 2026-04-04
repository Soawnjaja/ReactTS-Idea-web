import { ideas } from '../../lib/ideas'
import { trpc } from '../../lib/trpc'
import { zCreateIdeaTrpcInput } from './input'

export const createIdeaTrpcRoute = trpc.procedure.input(zCreateIdeaTrpcInput).mutation(({ input }) => {
  const idea = {
    id: crypto.randomUUID(),
    ...input,
  }

  ideas.unshift(idea)
  return { idea }
})
