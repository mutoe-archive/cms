/**
 * @desc login
 */

import * as SWR from 'swr'

import * as defs from '../../baseClass'
import * as Hooks from '../../hooks'
import { PontCore } from '../../pontCore'

export class Params {}

export const method = 'POST'

export function mutate (
  params = {},
  newValue = undefined,
  shouldRevalidate = true,
) {
  return SWR.mutate(
    Hooks.getUrlKey('/auth/login', params, 'POST'),
    newValue,
    shouldRevalidate,
  )
}

export function trigger (params = {}, shouldRevalidate = true) {
  return SWR.trigger(
    Hooks.getUrlKey('/auth/login', params, 'POST'),
    shouldRevalidate,
  )
}

export function useDeprecatedRequest (params = {}, swrOptions = {}) {
  return Hooks.useRequest('/auth/login', params, swrOptions, {
    method: 'POST',
  })
}

export function request (params: Params, options?: any) {
  return PontCore.fetch(PontCore.getUrl('/auth/login', params, 'POST'), {
    method: 'POST',

    ...options,
  })
}
