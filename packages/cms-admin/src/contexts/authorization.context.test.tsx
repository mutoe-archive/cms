import { render, waitFor } from '@testing-library/react'
import React from 'react'
import useAuthorizationContext, { AuthorizationProvider } from 'src/contexts/authorization.context'
import axios from 'src/utils/axios'
import StorageUtil from 'src/utils/storage.util'

describe('# Authorization Context', () => {
  const Child: React.FC = () => {
    const { profile, loading } = useAuthorizationContext()
    if (loading) return <span>loading</span>
    if (profile) return <span>{profile.username}</span>
    return <div>not logged</div>
  }

  const Provider: React.FC = () => {
    return <AuthorizationProvider>
      <Child />
    </AuthorizationProvider>
  }

  it('should got auth with null when init state', () => {
    const { container } = render(<Provider />)

    expect(container).toHaveTextContent('not logged')
  })

  it('should retrieve userProfile API when load context given a localStorage token', () => {
    jest.spyOn(StorageUtil.prototype, 'get').mockReturnValue('token')
    jest.spyOn(axios, 'request').mockResolvedValue({ username: 'invalid' })

    render(<Provider />)

    waitFor(() => expect(axios.request).toBeCalledWith({
      headers: {
        Authorization: 'Bearer token',
      },
      method: 'GET',
      url: '/api/user',
    }))
  })

  it('should return correct loading state when retrieve API', async () => {
    jest.spyOn(StorageUtil.prototype, 'get').mockReturnValue('token')
    jest.spyOn(axios, 'request').mockResolvedValue({ username: 'invalid' })

    const { container } = render(<Provider />)
    expect(container).toHaveTextContent('loading')

    await waitFor(() => expect(axios.request).toBeCalled())
    expect(container).not.toHaveTextContent('loading')
  })
})
