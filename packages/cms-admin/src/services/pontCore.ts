/**
 * @description pont内置请求单例
 */
import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { authorizationTokenStorage } from 'src/contexts/authorization.context'
import axios from 'src/utils/axios'

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
    this.axios = axios
  }

  /**
   * axios 请求
   */
  async fetch (options: AxiosRequestConfig = {}) {
    const token = authorizationTokenStorage.get()
    if (token) {
      (options.headers ?? (options.headers = {})).Authorization = `Bearer ${token}`
    }

    return await this.axios.request(options)
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
