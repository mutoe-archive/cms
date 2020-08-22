import { AxiosError } from 'axios'

export function focusErrorField (): void {
  setTimeout(() => {
    const firstErrorField = document.querySelector('.error.field')
    if (!firstErrorField) return

    firstErrorField.querySelector('input')?.focus()
  })
}

interface FormErrorResponse {
  message: Record<string, string>
}

export function isFormError (error: any): error is AxiosError<FormErrorResponse> {
  return error.response?.status === 422 && error.response.data
}
