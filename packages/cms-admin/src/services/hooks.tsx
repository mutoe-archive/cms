import { AxiosError, AxiosRequestConfig, Method } from 'axios'
import React, { useState } from 'react'
import { FormRef } from 'src/components/FormRenderer'
import { fieldErrorDecorator, focusErrorField, FormExceptionKey } from 'src/utils/form.util'
import { PontCore } from './pontCore'

export type FormErrorResponse = Record<string, FormExceptionKey[]>
export function isFormError (error: any): error is AxiosError<FormErrorResponse> {
  return error.response?.status === 422 && error.response.data
}

export function useSubmit<Req = any, Res = any> (formRef: FormRef, method: Method, path: string, params?: any) {
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (data: Req) => {
    const axiosOption: AxiosRequestConfig = { url: PontCore.injectPathVariables(path, params), method, data }
    try {
      setSubmitting(true)
      return await PontCore.fetch<Res>(axiosOption)
    } catch (e) {
      if (formRef && isFormError(e)) {
        Object.entries(e.response?.data ?? {})
          .forEach(([field, message]) => formRef.current?.setError(field, fieldErrorDecorator(field, message)))
        focusErrorField()
      }
      throw e
    } finally {
      setSubmitting(false)
    }
  }

  return {
    submitting,
    onSubmit,
  }
}

