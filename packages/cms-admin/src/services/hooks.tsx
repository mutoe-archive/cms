/**
 * @description 基于 swr 的取数hooks
 */

import { AxiosRequestConfig, Method } from 'axios'
import React, { useState } from 'react'
import { FormRef } from 'src/components/FormRenderer'
import { focusErrorField, isFormError } from 'src/utils/form.util'
import useSWR, { ConfigInterface, SWRConfig } from 'swr'
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
      {children}
    </SWRConfig>
  )
}

export function useRequest<D = any> (
  url: string,
  params: any = {},
  swrOptions: ConfigInterface = {},
  axiosOption: AxiosRequestConfig = {},
) {
  const method = axiosOption?.method || 'GET'
  const fetcher = (url: string) => PontCore.fetch<D>({ url, method, ...axiosOption })

  const urlKey = getUrlKey(url, params)
  const { data, error, isValidating, mutate } = useSWR<D>(urlKey, fetcher, swrOptions)

  return {
    data,
    error,
    mutate,
    loading: data === undefined || isValidating,
  }
}

export function useSubmit<Req = any, Res = any> (formRef: FormRef, method: Method, url: string) {
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (data: Req) => {
    const axiosOption: AxiosRequestConfig = { url, method, data }
    try {
      setSubmitting(true)
      return await PontCore.fetch<Res>(axiosOption)
    } catch (e) {
      if (formRef && isFormError(e)) {
        Object.entries(e.response?.data ?? {})
          .forEach(([field, message]) => formRef.current?.setError(field, message))
        focusErrorField()
      }
      throw e
    } finally {
      setSubmitting(false)
    }
  }

  return {
    submitting,
    onSubmit,
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
