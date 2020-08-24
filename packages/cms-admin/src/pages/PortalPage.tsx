import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import useAuthorizationContext from 'src/contexts/authorization.context'
import AppHeader from 'src/components/AppHeader'

const PortalPage: React.FC = () => {
  const { profile, unmountAuthorization } = useAuthorizationContext()

  return <div className="App">
    <AppHeader />

    <header className="App-header">
      <p> {'Mutoe\'s Content Manage System'} </p>

      {profile
        ? <>
          <p>Welcome {profile.username} !</p>
          <Button onClick={unmountAuthorization}>Logout</Button>
        </>
        : <Link className="App-link" to={'/login'}>Login</Link>}
    </header>
  </div>
}

export default PortalPage
