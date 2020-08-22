import Axios, { AxiosError } from 'axios'

export const isAxiosError = (error: any): error is AxiosError => {
  return 'response' in error
}
export const axios = Axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})

axios.interceptors.response.use(res => {
  console.log(res)
  return res
})
