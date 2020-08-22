import React from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import LoginPage from 'src/pages/auth/LoginPage/LoginPage'
import { SWRProvider } from 'src/services/hooks'
import './App.css'
import logo from './logo.svg'
import { AuthorizationProvider } from './contexts/authorization.context'
import PortalPage from 'src/pages/PortalPage'

const App: React.FC = () => (
  <SWRProvider>
    <AuthorizationProvider>

      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={LoginPage} />

          <Route>
            <PortalPage/>
          </Route>
        </Switch>
      </BrowserRouter>
    </AuthorizationProvider>
  </SWRProvider>
)

export default App
