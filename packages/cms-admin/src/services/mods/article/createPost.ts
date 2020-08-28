/**
 * @desc Create article
 */

import { AxiosRequestConfig, Method } from 'axios'
import { FormRef } from 'src/components/FormRenderer'
import { defs, Hooks, PontCore, SWR } from 'src/services'

export const method: Method = 'POST'
export const path = '/api/article'

export function useSubmit (formRef: FormRef = null) {
  return Hooks.useSubmit<defs.CreateArticleDto, defs.ArticleRo>(
    formRef,
    method,
    path,
  )
}

export function request (
  data: defs.CreateArticleDto,
  axiosOption: AxiosRequestConfig = {},
): Promise<defs.ArticleRo> {
  return PontCore.fetch({
    url: PontCore.getUrl(path),
    method,
    data,
    ...axiosOption,
  })
}
