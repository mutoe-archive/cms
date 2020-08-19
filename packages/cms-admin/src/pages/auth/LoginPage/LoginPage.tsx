import React from 'react'
import FormRenderer from 'src/components/FormRenderer'
import { loginForm, loginFormFields } from 'src/pages/auth/LoginPage/form/loginForm.config'
import styles from 'src/pages/auth/LoginPage/LoginPage.module.scss'
import { isAxiosError } from 'src/services/pontCore'

const LoginPage: React.FC = () => {
  const onLogin = async (form: typeof loginForm) => {
    try {
      const result = await API.auth.login.request(form)
      console.log(result)
    } catch (e) {
      if (isAxiosError(e)) {
        console.error(e.response)
      }
    }
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
