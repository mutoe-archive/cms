/**
 * @desc
 */

import * as SWR from 'swr'
import * as defs from '../../baseClass'
import * as Hooks from '../../hooks'
import { PontCore } from '../../pontCore'

export const method = 'GET'
export const path = '/user'

export function mutate (newValue = undefined, shouldRevalidate = true) {
  return SWR.mutate(
    Hooks.getUrlKey('/user', {}, 'GET'),
    newValue,
    shouldRevalidate,
  )
}

export function trigger (shouldRevalidate = true) {
  return SWR.trigger(Hooks.getUrlKey('/user', {}, 'GET'), shouldRevalidate)
}

export function useRequest (swrOptions = {}) {
  return Hooks.useRequest('/user', {}, swrOptions)
}

export function request (fetchOptions: RequestInit = {}) {
  return PontCore.fetch(PontCore.getUrl('/user'), {
    method: 'GET',
    ...fetchOptions,
  })
}
