import { getAllIdeasRoute, getViewIdeaRoute } from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { AllIdeasPage } from './pages/AllideasPage'
import { ViewIdeaPage } from './pages/ViewIdeaPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route path={getAllIdeasRoute()} element={<AllIdeasPage />} />
          <Route path={getViewIdeaRoute({ id: ':id' })} element={<ViewIdeaPage />} />
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
