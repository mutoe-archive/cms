import React from 'react'
import FormRenderer from 'src/components/FormRenderer'
import { loginForm, loginFormFields } from 'src/pages/auth/LoginPage/form/loginForm.config'
import styles from './LoginPage.module.css'

const LoginPage: React.FC = () => {
  const onLogin = (form: typeof loginForm) => {
    console.log(form)
  }

  return <div className={styles.root}>
    <FormRenderer className={styles.form}
      fields={loginFormFields}
      initForm={loginForm}
      onSubmit={form => onLogin(form)}
    />
  </div>
}

export default LoginPage
