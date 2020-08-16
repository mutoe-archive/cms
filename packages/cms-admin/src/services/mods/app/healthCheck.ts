/**
 * @desc health check
 */

import * as SWR from 'swr'

import * as defs from '../../baseClass'
import * as Hooks from '../../hooks'
import { PontCore } from '../../pontCore'

export class Params {
  /** name */
  name?: any;
}

export const method = 'GET'

export function mutate (
  params = {},
  newValue = undefined,
  shouldRevalidate = true,
) {
  return SWR.mutate(
    Hooks.getUrlKey('/app/hello', params, 'GET'),
    newValue,
    shouldRevalidate,
  )
}

export function trigger (params = {}, shouldRevalidate = true) {
  return SWR.trigger(
    Hooks.getUrlKey('/app/hello', params, 'GET'),
    shouldRevalidate,
  )
}

export function useRequest (params = {}, swrOptions = {}) {
  return Hooks.useRequest('/app/hello', params, swrOptions)
}

export function request (params: Params, options?: any) {
  return PontCore.fetch(PontCore.getUrl('/app/hello', params, 'GET'), {
    method: 'GET',

    ...options,
  })
}
