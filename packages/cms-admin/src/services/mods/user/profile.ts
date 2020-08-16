/**
 * @desc
 */

import * as SWR from 'swr'

import * as defs from '../../baseClass'
import * as Hooks from '../../hooks'
import { PontCore } from '../../pontCore'

export class Params {}

export const method = 'GET'

export function mutate (
  params = {},
  newValue = undefined,
  shouldRevalidate = true,
) {
  return SWR.mutate(
    Hooks.getUrlKey('/user', params, 'GET'),
    newValue,
    shouldRevalidate,
  )
}

export function trigger (params = {}, shouldRevalidate = true) {
  return SWR.trigger(Hooks.getUrlKey('/user', params, 'GET'), shouldRevalidate)
}

export function useRequest (params = {}, swrOptions = {}) {
  return Hooks.useRequest('/user', params, swrOptions)
}

export function request (params: Params, options?: any) {
  return PontCore.fetch(PontCore.getUrl('/user', params, 'GET'), {
    method: 'GET',

    ...options,
  })
}
