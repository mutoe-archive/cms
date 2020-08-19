/**
 * @description 基于 swr 的取数hooks
 */

import useSWR, { SWRConfig, ConfigInterface } from 'swr'
import * as React from 'react'
import { PontCore } from './pontCore'

const defaultOptions: ConfigInterface = {
  /** 错误重试，默认关闭 */
  shouldRetryOnError: false,
  /** 获取焦点时，不重新请求 */
  revalidateOnFocus: false,
  /** 接口缓存 1 分钟 */
  dedupingInterval: 60000,
}

export const SWRProvider: React.FC<ConfigInterface> = props => {
  const { children, ...options } = props

  return (
    <SWRConfig value={{ ...defaultOptions, ...options }}>
      {props.children}
    </SWRConfig>
  )
}

export function useRequest (
  url: string,
  params: any = {},
  swrOptions: SwrConfig = {},
  axiosOption: AxiosRequestConfig = {},
) {
  const method = axiosOption?.method || 'GET'
  const fetcher = (url: string) => PontCore.fetch({ url, method, ...axiosOption })

  const urlKey = getUrlKey(url, params)
  const { data, error, isValidating, mutate } = useSWR(urlKey, fetcher, swrOptions)

  return {
    data,
    error,
    mutate,
    isLoading: data === undefined || isValidating,
  }
}

export function getUrlKey (url: any, params = {} as any) {
  const urlKey =
    typeof params === 'function'
      ? () => {
        return params ? PontCore.getUrl(url, params()) : null
      }
      : params
        ? PontCore.getUrl(url, params)
        : null

  return urlKey
}
