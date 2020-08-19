/**
 * @desc register
 */

import * as SWR from 'swr'
import * as defs from '../../baseClass'
import * as Hooks from '../../hooks'
import { PontCore } from '../../pontCore'

export const method = 'POST'
export const path = '/api/auth/register'

export function mutate (newValue = undefined, shouldRevalidate = true) {
  return SWR.mutate(Hooks.getUrlKey(path, {}), newValue, shouldRevalidate)
}

export function trigger (shouldRevalidate = true) {
  return SWR.trigger(Hooks.getUrlKey(path, {}), shouldRevalidate)
}

export function useRequest (swrOptions = {}) {
  return Hooks.useRequest(path, {}, swrOptions)
}

export function request (
  data: defs.RegisterDto,
  axiosOption: AxiosRequestConfig = {},
) {
  return PontCore.fetch({
    url: PontCore.getUrl(path),
    method: 'POST',
    data,
    ...axiosOption,
  })
}
