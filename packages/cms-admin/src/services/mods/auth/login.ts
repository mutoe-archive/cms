/**
 * @desc login
 */

import { AxiosRequestConfig } from 'axios'
import * as SWR from 'swr'
import * as defs from '../../baseClass'
import * as Hooks from '../../hooks'
import { PontCore } from '../../pontCore'

export const method = 'POST'
export const path = '/api/auth/login'

export function mutate (newValue: any = undefined, shouldRevalidate = true) {
  return SWR.mutate(Hooks.getUrlKey(path, {}), newValue, shouldRevalidate)
}

export function trigger (shouldRevalidate = true) {
  return SWR.trigger(Hooks.getUrlKey(path, {}), shouldRevalidate)
}

export function useRequest (swrOptions: SWR.ConfigInterface = {}) {
  return Hooks.useRequest(path, {}, swrOptions)
}

export function request (
  data: defs.LoginDto,
  axiosOption: AxiosRequestConfig = {},
): Promise<defs.AuthRo> {
  return PontCore.fetch({
    url: PontCore.getUrl(path),
    method: 'POST',
    data,
    ...axiosOption,
  })
}
