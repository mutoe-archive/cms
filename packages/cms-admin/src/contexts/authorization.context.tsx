import React, { createContext, useContext, useState } from 'react'
import StorageUtil from 'src/utils/storage.util'

interface AuthState {
  auth: defs.AuthRo | null
  mountAuthorization: (authRo: defs.AuthRo) => void
  unmountAuthorization: () => void
}

const AuthorizationContext = createContext<AuthState>({} as AuthState)

const authorizationTokenStorage = new StorageUtil<string>('auth_token')

export const AuthorizationProvider: React.FC = props => {
  const [auth, setAuth] = useState<defs.AuthRo | null>(null)

  const mountAuthorization = (authRo: defs.AuthRo) => {
    authorizationTokenStorage.set(authRo.token)
    setAuth(authRo)
  }

  const unmountAuthorization = () => {
    authorizationTokenStorage.remove()
    setAuth(null)
  }

  const value = {
    auth,
    mountAuthorization,
    unmountAuthorization,
  }

  return <AuthorizationContext.Provider value={value}>{props.children}</AuthorizationContext.Provider>
}

const useAuthorizationContext = () => useContext(AuthorizationContext)

export default useAuthorizationContext
