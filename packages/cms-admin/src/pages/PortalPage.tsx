import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'
import AppHeader from 'src/components/AppHeader'
import useAuthorizationContext from 'src/contexts/authorization.context'

const PortalPage: React.FC = () => {
  const { loading, profile } = useAuthorizationContext()

  const history = useHistory()

  if (loading) {
    return <Loader />
  }

  if (!profile) {
    history.push('/login')
    return null
  }

  return <div className='App'>
    <AppHeader />

    <header className='App-header'>
      <p> {'Mutoe\'s Content Manage System'} </p>

      {profile
        ? <>
          <p>Welcome {profile.username} !</p>
        </>
        : <Link className='App-link' to={'/login'}>Login</Link>}
    </header>
  </div>
}

export default PortalPage
