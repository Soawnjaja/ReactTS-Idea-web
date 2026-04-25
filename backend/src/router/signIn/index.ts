import { trpc } from '../../lib/trpc'
import { getPasswordHash } from '../../utils/getPasswordHash'
import { zSignInTrpcInput } from './input'

export const signInTrpcRoute = trpc.procedure.input(zSignInTrpcInput).mutation(async ({ ctx, input }) => {
  const user = await ctx.prisma.user.findUnique({
    where: {
      nick: input.nick,
    },
  })

  if (!user) {
    throw new Error('Wrong nick or password')
  }

  if (user.password !== getPasswordHash(input.password)) {
    throw new Error('Wrong nick or password')
  }

  return true
})
