import { createTRPCReact, httpBatchLink } from '@trpc/react-query'
import type { TrpcRouter } from '@fullstackts/backend/src/router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const trpc = createTRPCReact<TrpcRouter>()
//  клиент реакт квери управляет самой логикой запросов
// (не нужно перезапрашивать запрос если возникла ошибка )
// если ушли с окна, которая может перезапросить и пока не надо мне это
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})
// должен знать где у нас енд поинт для всех trpc роутов
//
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
})
// TrpcProvider оборачивает React-дерево и “прокидывает” вниз контекст:
//trpc.Provider даёт всем компонентам доступ к trpcClient (как ходить на backend).
//(кэш, refetch, retry и т.д.).
export const TrpcProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
