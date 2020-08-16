/**
 * @desc register
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
    Hooks.getUrlKey('/auth/register', params, 'POST'),
    newValue,
    shouldRevalidate,
  )
}

export function trigger (params = {}, shouldRevalidate = true) {
  return SWR.trigger(
    Hooks.getUrlKey('/auth/register', params, 'POST'),
    shouldRevalidate,
  )
}

export function useDeprecatedRequest (params = {}, swrOptions = {}) {
  return Hooks.useRequest('/auth/register', params, swrOptions, {
    method: 'POST',
  })
}

export function request (params: Params, options?: any) {
  return PontCore.fetch(PontCore.getUrl('/auth/register', params, 'POST'), {
    method: 'POST',

    ...options,
  })
}
