/**
 * @desc Health check
 */

import { AxiosRequestConfig, Method } from 'axios'
import { FormRef } from 'src/components/FormRenderer'
import { defs, Hooks, PontCore, SWR } from 'src/services'

export const method: Method = 'GET'
export const path = '/api/hello'
export const url = PontCore.getUrl(path, params)

interface Params {
  /** name */
  name?: any
}

type HooksParams = (() => Params) | Params

export function request (
  params: Params,
  axiosOption: AxiosRequestConfig = {},
): Promise<any> {
  return PontCore.fetch({
    url,
    method,

    ...axiosOption,
  })
}
