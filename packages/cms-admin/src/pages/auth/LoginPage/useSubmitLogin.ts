import { useState } from 'react'
import FormRenderer from 'src/components/FormRenderer'
import { API } from 'src/services'
import { focusErrorField, isFormError } from 'src/utils/form.util'

export default function useSubmitLogin (formRef?: React.RefObject<React.ElementRef<typeof FormRenderer>>) {
  const [submitting, setLoading] = useState(false)

  const onLogin = async (form: any) => {
    try {
      setLoading(true)
      return await API.auth.login.request(form)
    } catch (e) {
      if (formRef && isFormError(e)) {
        Object.entries(e.response?.data ?? {})
          .forEach(([field, message]) => formRef.current?.setError(field, message))
        focusErrorField()
      }
      throw e
    } finally {
      setLoading(false)
    }
  }

  return {
    submitting,
    onLogin,
  }
}
