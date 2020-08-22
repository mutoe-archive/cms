import { fireEvent, render, waitFor } from '@testing-library/react'
import React from 'react'
import axios from 'src/utils/axios'
import LoginPage from './LoginPage'

const mockReplace = jest.fn()
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    replace: mockReplace,
  }),
}))

describe('# Login page', () => {
  beforeEach(jest.clearAllMocks)

  it('should render correctly', () => {
    const { container } = render(<LoginPage />)

    expect(container).toBeInTheDocument()
  })

  it('should jump to home page when submit a valid form', async () => {
    jest.spyOn(axios, 'request').mockResolvedValue({
      data: {
        username: 'invalid',
        token: 'token',
      },
    })
    const { getByTestId, getByPlaceholderText } = render(<LoginPage />)

    fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'admin' } })
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: '123456' } })

    const submitButton = getByTestId('submit')
    fireEvent.click(submitButton)

    await waitFor(() => expect(axios.request).toBeCalledWith({
      method: 'POST',
      url: '/api/auth/login',
      data: { username: 'admin', password: '123456' },
    }))
    expect(mockReplace).toBeCalledWith('/')
  })

  it('should display server validation error message when submit exist username form', async () => {
    jest.spyOn(axios, 'request').mockRejectedValue({
      response: {
        status: 422,
        data: {
          username: 'invalid',
        },
      },
    })
    const { getByTestId, getByPlaceholderText } = render(<LoginPage />)

    fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'admin' } })
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: '123456' } })

    const submitButton = getByTestId('submit')
    fireEvent.click(submitButton)

    await waitFor(() => expect(axios.request).toBeCalledTimes(1))
    await waitFor(() => expect(document.activeElement).toBe(getByPlaceholderText('Username')))
  })
})
