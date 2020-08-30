/**
 * @desc Retrieve articles
 */

import { AxiosRequestConfig, Method } from 'axios'
import { FormRef } from 'src/components/FormRenderer'
import { defs, Hooks, PontCore, SWR } from 'src/services'

export const method: Method = 'GET'
export const path = '/api/article'

interface Params {
  /** page */
  page?: any
  /** limit */
  limit?: any
}

export function request (
  params: Params,
  axiosOption: AxiosRequestConfig = {},
): Promise<defs.ArticlesRo> {
  return PontCore.fetch({
    url: PontCore.injectPathVariables(path, params),
    method,

    ...axiosOption,
  })
}
