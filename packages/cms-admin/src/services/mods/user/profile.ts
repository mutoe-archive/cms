/**
 * @desc
 */

import { AxiosRequestConfig, Method } from 'axios'
import { FormRef } from 'src/components/FormRenderer'
import { defs, Hooks, PontCore, SWR } from 'src/services'

export const method: Method = 'GET'
export const path = '/api/user'

export function request (
  axiosOption: AxiosRequestConfig = {},
): Promise<defs.ProfileRo> {
  return PontCore.fetch({
    url: PontCore.getUrl(path),
    method,

    ...axiosOption,
  })
}
