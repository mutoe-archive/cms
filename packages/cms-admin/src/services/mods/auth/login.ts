/**
 * @desc login
 */

import * as SWR from 'swr'
import * as defs from '../../baseClass'
import * as Hooks from '../../hooks'
import { PontCore } from '../../pontCore'

export const method = 'POST'
export const path = '/auth/login'

export function mutate (newValue = undefined, shouldRevalidate = true) {
  return SWR.mutate(
    Hooks.getUrlKey('/auth/login', {}, 'POST'),
    newValue,
    shouldRevalidate,
  )
}

export function trigger (shouldRevalidate = true) {
  return SWR.trigger(
    Hooks.getUrlKey('/auth/login', {}, 'POST'),
    shouldRevalidate,
  )
}

export function useRequest (swrOptions = {}) {
  return Hooks.useRequest('/auth/login', {}, swrOptions)
}

export function request (body: defs.LoginDto, fetchOptions: RequestInit = {}) {
  return PontCore.fetch(PontCore.getUrl('/auth/login'), {
    method: 'POST',
    body: JSON.stringify(body),
    ...fetchOptions,
  })
}
