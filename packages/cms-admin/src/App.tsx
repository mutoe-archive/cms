import React from 'react'
import LoginPage from 'src/pages/auth/LoginPage/LoginPage'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

const App: React.FC = () => (
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

)

export default App
