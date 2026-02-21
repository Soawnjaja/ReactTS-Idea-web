import { initTRPC } from '@trpc/server'

const trpc = initTRPC.create()

const trpcRouter = trpc.router()
