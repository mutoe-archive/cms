import { isFormError } from 'src/services/hooks'

describe('# isFormError', () => {
  it('should return true when error has data message and status code is 422', () => {
    const error = {
      response: {
        status: 422,
        data: {
          username: ['isInvalid'],
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
