import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { focusErrorField, isFormError } from 'src/utils/form.util'

describe('# focus error field util', () => {
  const Wrapper: React.FC = () => (<div className='error field'>
    <input type='text' data-testid='input' />
  </div>)

  it('should focus on first error field input', () => {
    const { getByTestId } = render(<Wrapper />)
    focusErrorField()

    return waitFor(() => expect(document.activeElement).toEqual(getByTestId('input')))
  })
})

describe('# isFormError', () => {
  it('should return true when error has data message and status code is 422', () => {
    const error = {
      response: {
        status: 422,
        data: {
          message: {
            username: 'is invalid',
          },
        },
      },
    }

    expect(isFormError(error)).toBeTruthy()
  })

  it('should return false when error is not have status code with 422', () => {
    const error = {
      response: {
        status: 400,
        data: {},
      },
    }

    expect(isFormError(error)).toBeFalsy()
  })
})
