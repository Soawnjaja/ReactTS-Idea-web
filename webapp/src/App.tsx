import { TrpcProvider } from './lib/trpc'
import { AllIdeasPage } from './pages/AllideasPage'

export const App = () => {
  return (
    <TrpcProvider>
      <AllIdeasPage />
    </TrpcProvider>
  )
}
