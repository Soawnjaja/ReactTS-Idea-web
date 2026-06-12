import { Layout } from './Components/Layout'
import * as routes from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { NewIdeaPage } from './pages/NewIdeaPage'
import { AllIdeasPage } from './pages/AllideasPage'
import { ViewIdeaPage } from './pages/ViewIdeaPage'
import { EditIdeaPage } from './pages/EditIdeaPage'
import { SignUpPage } from './pages/SigUpPage'
import { SignInPage } from './pages/SignInPage'
import { SignOutPage } from './pages/SignOutPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppContextProvider } from './lib/ctx'
import './styles/global.scss'

export const App = () => {
  return (
    <TrpcProvider>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.getSignOutRoute()} element={<SignOutPage />} />
            <Route element={<Layout />}>
              <Route path={routes.getSignUpRoute()} element={<SignUpPage />} />
              <Route path={routes.getSignInRoute()} element={<SignInPage />} />
              <Route path={routes.getAllIdeasRoute()} element={<AllIdeasPage />} />
              <Route path={routes.getNewIdeaRoute()} element={<NewIdeaPage />} />
              <Route path={routes.getViewIdeaRoute(routes.viewIdeaRouteParams)} element={<ViewIdeaPage />} />
              <Route path={routes.getEditIdeaRoute(routes.editIdeaRouteParams)} element={<EditIdeaPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TrpcProvider>
  )
}
