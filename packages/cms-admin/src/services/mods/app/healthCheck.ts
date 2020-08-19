/**
 * @desc Health check
 */

import * as SWR from 'swr'
import * as defs from '../../baseClass'
import * as Hooks from '../../hooks'
import { PontCore } from '../../pontCore'

class Params {
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
  return SWR.mutate(
    Hooks.getUrlKey('/api/app/hello', params, 'GET'),
    newValue,
    shouldRevalidate,
  )
}

export function trigger (params: HooksParams = {}, shouldRevalidate = true) {
  return SWR.trigger(
    Hooks.getUrlKey('/api/app/hello', params, 'GET'),
    shouldRevalidate,
  )
}

export function useRequest (params: HooksParams = {}, swrOptions = {}) {
  return Hooks.useRequest('/api/app/hello', params, swrOptions)
}

export function request (params: Params, fetchOptions: RequestInit = {}) {
  return PontCore.fetch(PontCore.getUrl('/api/app/hello', params), {
    method: 'GET',
    ...fetchOptions,
  })
}
