import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LoginPage from 'src/pages/auth/LoginPage/LoginPage'
import { SWRProvider } from 'src/services/hooks'
import './App.css'
import logo from './logo.svg'

const App: React.FC = () => (
  <SWRProvider>
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LoginPage} />

        <Route>

          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.tsx</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  </SWRProvider>
)

export default App
