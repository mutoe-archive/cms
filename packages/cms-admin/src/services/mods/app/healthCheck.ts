/**
 * @desc Health check
 */

import * as SWR from 'swr'
import * as defs from '../../baseClass'
import * as Hooks from '../../hooks'
import { PontCore } from '../../pontCore'

interface Params {
  /** name */
  name?: any;
}

type HooksParams = (() => Params) | Params;

export const method = 'GET'
export const path = '/api/app/hello'

export function mutate (
  params: HooksParams = {},
  newValue = undefined,
  shouldRevalidate = true,
) {
  return SWR.mutate(Hooks.getUrlKey(path, params), newValue, shouldRevalidate)
}

export function trigger (params: HooksParams = {}, shouldRevalidate = true) {
  return SWR.trigger(Hooks.getUrlKey(path, params), shouldRevalidate)
}

export function useRequest (params: HooksParams = {}, swrOptions = {}) {
  return Hooks.useRequest(path, params, swrOptions)
}

export function request (params: Params, axiosOption: AxiosRequestConfig = {}) {
  return PontCore.fetch({
    url: PontCore.getUrl(path, params),
    method: 'GET',

    ...axiosOption,
  })
}
