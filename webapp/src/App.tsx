import { Layout } from './Components/Layout'
import * as routes from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { NewIdeaPage } from './pages/NewIdeaPage'
import { AllIdeasPage } from './pages/AllideasPage'
import { ViewIdeaPage } from './pages/ViewIdeaPage'
import { SignUpPage } from './pages/SigUpPage'
import { SignInPage } from './pages/SignInPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './styles/global.scss'

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={routes.getAllIdeasRoute()} element={<AllIdeasPage />} />
            <Route path={routes.getNewIdeaRoute()} element={<NewIdeaPage />}></Route>
            <Route path={routes.getSignUpRoute()} element={<SignUpPage />}></Route>
            <Route path={routes.getSignInRoute()} element={<SignInPage />}></Route>
            <Route path={routes.getViewIdeaRoute(routes.viewIdeaRouteParams)} element={<ViewIdeaPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
