import { FormConfig } from 'src/components/FormRenderer'

export const loginForm = {
  username: '',
  password: '',
}

export const loginFormFields: FormConfig<typeof loginForm> = [
  {
    type: 'input',
    name: 'username',
    required: true,
    placeholder: 'Username',
    maxLength: 16,
    minLength: 5,
  },
  {
    type: 'password',
    name: 'password',
    required: true,
    placeholder: 'Password',
    maxLength: 16,
    minLength: 6,
  },
]
