import React, { useRef } from 'react'
import { useHistory } from 'react-router-dom'
import FormRenderer from 'src/components/FormRenderer'
import { loginForm, loginFormFields } from 'src/pages/auth/LoginPage/form/loginForm.config'
import styles from 'src/pages/auth/LoginPage/LoginPage.module.scss'
import useSubmitLogin from 'src/pages/auth/LoginPage/useSubmitLogin'

const LoginPage: React.FC = () => {
  const formRef = useRef<React.ElementRef<typeof FormRenderer>>(null)

  const { submitting, onLogin } = useSubmitLogin(formRef)

  const history = useHistory()

  const onSubmit = async (form: typeof loginForm) => {
    try {
      const result = await onLogin(form)
      history.replace('/')
    } catch {}
  }

  return <div className={styles.root}>
    <FormRenderer
      ref={formRef}
      className={styles.form}
      submitting={submitting}
      fields={loginFormFields}
      initForm={loginForm}
      onSubmit={onSubmit}
    />
  </div>
}

export default LoginPage
