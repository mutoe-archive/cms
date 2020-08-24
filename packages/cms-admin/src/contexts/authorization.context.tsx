import React, { createContext, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { API, defs } from 'src/services'
import StorageUtil from 'src/utils/storage.util'

interface AuthState {
  profile: defs.ProfileRo | null
  loading: boolean
  mountAuthorization: (authRo: defs.AuthRo) => void
  unmountAuthorization: () => void
}

const AuthorizationContext = createContext<AuthState>({} as AuthState)

export const authorizationTokenStorage = new StorageUtil<string>('auth_token')

export const AuthorizationProvider: React.FC = props => {
  const [profile, setProfile] = useState<defs.ProfileRo | null>(null)
  const localToken = authorizationTokenStorage.get()
  const history = useHistory()

  const mountAuthorization = (authRo: defs.AuthRo) => {
    authorizationTokenStorage.set(authRo.token)
    setProfile(authRo)
  }

  const unmountAuthorization = () => {
    authorizationTokenStorage.remove()
    setProfile(null)
  }

  const retrieveUserProfile = async () => {
    try {
      const profile = await API.user.profile.request()
      setProfile(profile)
    } catch (e) {
      unmountAuthorization()
      history.replace('/login')
    }
  }

  useEffect(() => {
    localToken && retrieveUserProfile()
  }, [])

  const loading = Boolean(localToken && !profile)

  const value = {
    profile,
    loading,
    mountAuthorization,
    unmountAuthorization,
  }

  return <AuthorizationContext.Provider value={value}>{props.children}</AuthorizationContext.Provider>
}

const useAuthorizationContext = () => useContext(AuthorizationContext)

export default useAuthorizationContext
