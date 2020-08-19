/**
 * @description pont内置请求单例
 */
import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'

export const isAxiosError = (error: any): error is AxiosError => {
  return 'response' in error
}

class PontCoreManager {
  static singleInstance = null as unknown as PontCoreManager
  axios: AxiosInstance = null as unknown as AxiosInstance

  static getSingleInstance (): PontCoreManager {
    if (!PontCoreManager.singleInstance) {
      PontCoreManager.singleInstance = new PontCoreManager()
    }
    return PontCoreManager.singleInstance
  }

  constructor () {
    this.axios = Axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.axios.interceptors.response.use(res => {
      console.log(res)
      return res
    })
  }

  /**
   * axios 请求
   */
  async fetch (options: AxiosRequestConfig = {}) {
    return this.axios.request(options)
  }

  getUrl (path: string, queryParams: any = {}) {
    const params = { ...queryParams }

    const url = path.replace(/{([^\\}]*(?:\\.[^\\}]*)*)}/gm, (match, key) => {
      // eslint-disable-next-line no-param-reassign
      key = key.trim()

      if (params[key] !== undefined) {
        const value = params[key]
        delete params[key]
        return value
      }
      console.warn('Please set value for template key: ', key)
      return ''
    })

    const paramStr = Object.keys(params)
      .map(key => {
        return params[key] === undefined ? '' : `${key}=${params[key]}`
      })
      .filter(id => id)
      .join('&')

    if (paramStr) {
      return `${url}?${paramStr}`
    }

    return url
  }
}

export const PontCore = PontCoreManager.getSingleInstance()
