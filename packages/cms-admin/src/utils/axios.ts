import Axios from 'axios'

const axios = Axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})

axios.interceptors.response.use(res => {
  return res
})

export default axios
