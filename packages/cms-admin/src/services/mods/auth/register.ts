/**
 * @desc register
 */

import * as SWR from 'swr'
import * as defs from '../../baseClass'
import * as Hooks from '../../hooks'
import { PontCore } from '../../pontCore'

export const method = 'POST'
export const path = '/auth/register'

export function mutate (newValue = undefined, shouldRevalidate = true) {
  return SWR.mutate(
    Hooks.getUrlKey('/auth/register', {}, 'POST'),
    newValue,
    shouldRevalidate,
  )
}

export function trigger (shouldRevalidate = true) {
  return SWR.trigger(
    Hooks.getUrlKey('/auth/register', {}, 'POST'),
    shouldRevalidate,
  )
}

export function useRequest (swrOptions = {}) {
  return Hooks.useRequest('/auth/register', {}, swrOptions)
}

export function request (
  body: defs.RegisterDto,
  fetchOptions: RequestInit = {},
) {
  return PontCore.fetch(PontCore.getUrl('/auth/register'), {
    method: 'POST',
    body: JSON.stringify(body),
    ...fetchOptions,
  })
}
