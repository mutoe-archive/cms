/**
 * @desc register
 */

import { AxiosRequestConfig, Method } from 'axios'
import { FormRef } from 'src/components/FormRenderer'
import { defs, Hooks, PontCore, SWR } from 'src/services'

export const method: Method = 'POST'
export const path = '/api/auth/register'
export const url = PontCore.getUrl(path)

export function useSubmit (formRef: FormRef = null) {
  return Hooks.useSubmit<defs.RegisterDto, defs.AuthRo>(formRef, method, url)
}

export function request (
  data: defs.RegisterDto,
  axiosOption: AxiosRequestConfig = {},
): Promise<defs.AuthRo> {
  return PontCore.fetch({
    url,
    method,
    data,
    ...axiosOption,
  })
}
