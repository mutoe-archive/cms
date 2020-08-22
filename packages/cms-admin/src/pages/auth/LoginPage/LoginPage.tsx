import React, { useRef } from 'react'
import FormRenderer from 'src/components/FormRenderer'
import { loginForm, loginFormFields } from 'src/pages/auth/LoginPage/form/loginForm.config'
import styles from 'src/pages/auth/LoginPage/LoginPage.module.scss'
import { isFormError } from 'src/utils/form.util'

const LoginPage: React.FC = () => {
  const formRef = useRef<React.ElementRef<typeof FormRenderer>>(null)
  const onLogin = async (form: typeof loginForm) => {
    try {
      const result = await API.auth.login.request(form)
      console.log(result)
    } catch (e) {
      console.log(e.response)
      if (isFormError(e)) {
        Object.entries(e.response?.data ?? {})
          .forEach(([field, message]) => formRef.current?.setError(field, message))
      }
    }
  }

  return <div className={styles.root}>
    <FormRenderer
      ref={formRef}
      className={styles.form}
      fields={loginFormFields}
      initForm={loginForm}
      onSubmit={form => onLogin(form)}
    />
  </div>
}

export default LoginPage
