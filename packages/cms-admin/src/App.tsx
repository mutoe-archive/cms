import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LoginPage from 'src/pages/auth/LoginPage/LoginPage'
import PortalPage from 'src/pages/PortalPage'
import { SWRProvider } from 'src/services/hooks'
import { AuthorizationProvider } from './contexts/authorization.context'

const App: React.FC = () => (
  <SWRProvider>
    <AuthorizationProvider>

      <BrowserRouter>
        <Switch>
          <Route exact path='/login' component={LoginPage} />

          <Route>
            <PortalPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </AuthorizationProvider>
  </SWRProvider>
)

export default App
