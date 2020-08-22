import React from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import LoginPage from 'src/pages/auth/LoginPage/LoginPage'
import { SWRProvider } from 'src/services/hooks'
import './App.css'
import logo from './logo.svg'
import { AuthorizationProvider } from './contexts/authorization.context'

const App: React.FC = () => (
  <SWRProvider>
    <AuthorizationProvider>

      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={LoginPage} />

          <Route>

            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p> {"Mutoe's Content Manage System"} </p>
                <Link className="App-link" to={'/login'}>Login</Link>
              </header>
            </div>
          </Route>
        </Switch>
      </BrowserRouter>
    </AuthorizationProvider>
  </SWRProvider>
)

export default App
