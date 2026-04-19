import { initTRPC } from '@trpc/server'
import { type Express } from 'express'
import { type TrpcRouter } from '../router/'
import { type AppContext } from './ctx'
import * as trpcExpress from '@trpc/server/adapters/express'
import superjson from 'superjson'

export const trpc = initTRPC.context<AppContext>().create({
  transformer: superjson,
})
export const applyTrpcToExpressApp = (expressApp: Express, appCtx: AppContext, trpcRouter: TrpcRouter) => {
  expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
      createContext: () => appCtx,
    })
  )
}
