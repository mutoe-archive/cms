import React, { useRef } from 'react'
import { useHistory } from 'react-router-dom'
import FormRenderer, { FormRef } from 'src/components/FormRenderer'
import useAuthorizationContext from 'src/contexts/authorization.context'
import { loginForm, loginFormFields } from 'src/pages/auth/LoginPage/form/loginForm.config'
import styles from 'src/pages/auth/LoginPage/LoginPage.module.scss'
import { API } from 'src/services'

const LoginPage: React.FC = () => {
  const formRef: FormRef = useRef(null)
  const history = useHistory()
  const { profile, mountAuthorization } = useAuthorizationContext()
  const { submitting, onSubmit: onLogin } = API.auth.login.useSubmit(formRef)

  const redirectToFrom = () => {
    // TODO: redirect to from URI
    history.replace('/')
  }

  if (profile) {
    redirectToFrom()
    return null
  }

  const onSubmit = async (form: typeof loginForm) => {
    try {
      const authRo = await onLogin(form)
      mountAuthorization(authRo)
      redirectToFrom()
    } catch (e) {}
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
