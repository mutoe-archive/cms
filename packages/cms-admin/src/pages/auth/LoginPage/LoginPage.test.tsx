import { fireEvent, render, waitFor } from '@testing-library/react'
import React from 'react'
import LoginPage from './LoginPage'

const mockRequest = jest.fn()

jest.mock('src/utils/axios', () => ({
  axios: { request: mockRequest },
}))

describe('# Login page', () => {
  beforeEach(jest.clearAllMocks)

  it('should render correctly', () => {
    const { container } = render(<LoginPage />)

    expect(container).toBeInTheDocument()
  })

  it.skip('should display server validation error message when submit a static valid form', async () => {
    mockRequest.mockResolvedValue({})
    const { getByTestId, getByPlaceholderText } = render(<LoginPage />)

    fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'admin' } })
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: '123456' } })

    const submitButton = getByTestId('submit')
    fireEvent.click(submitButton)

    expect(mockRequest).toBeCalledWith({
      method: 'POST',
      url: '/api/auth/login',
      data: { username: 'admin', password: '123456' },
    })
    await waitFor(() => expect(document.activeElement).toBe(getByPlaceholderText('Username')))
  })
})
