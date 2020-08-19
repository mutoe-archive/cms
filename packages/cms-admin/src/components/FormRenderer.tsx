import { pick } from 'lodash'
import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'
import ERROR_MESSAGE from 'src/constants/errorMessage'
import focusErrorField from 'src/utils/focusErrorField'

interface FieldBasicConfig<T> {
  name: T;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

interface InputFieldConfig {
  type: 'input' | 'password';
  maxLength?: number;
  minLength?: number;
  regexp?: RegExp;
}

export type FieldConfig<K> = InputFieldConfig & FieldBasicConfig<K>

type FormValue = number | boolean | string | string[] | number[]

type Form<T extends string> = Record<T, FormValue>

export type FormConfig<TForm extends Form<string>> = FieldConfig<keyof TForm>[]

interface FormRendererProps<K extends string, F extends Form<K>> {
  fields: FieldConfig<K>[];
  initForm?: F;
  submitText?: string
  onSubmit?: (form: F) => Promise<Record<string, string> | void>;
  submitting?: boolean;
  className?: string;
}

function FormRenderer<K extends string, F extends Form<K> = Form<K>> (props: FormRendererProps<K, F>): React.ReactElement {
  const [form, setForm] = useState<F>(props.initForm || {} as F)
  const [errors, setErrors] = useState<Partial<Record<K, string>>>({})

  const setError = (field: FieldConfig<K>, errorMessage?: string) => {
    setErrors(prev => ({ ...prev, [field.name]: errorMessage }))
    return !errorMessage
  }

  const onChange = (field: FieldConfig<K>, value: FormValue) => {
    setForm(prev => ({ ...prev, [field.name]: value }))
    setError(field)
  }

  const validateField = (field: FieldConfig<K>, newValue?: FormValue): boolean => {
    const value = newValue ?? form[field.name]
    if (field.required && !value) return setError(field, ERROR_MESSAGE.REQUIRED(field.label))
    switch (field.type) {
      case 'input':
      case 'password': {
        const inputValue = value as string
        if (field.minLength && inputValue.length < field.minLength) return setError(field, ERROR_MESSAGE.MIN_LENGTH(field.label, field.minLength))
      }
    }

    return setError(field)
  }

  const onSubmit = async () => {
    const validateResults = props.fields.map(field => validateField(field))
    if (!validateResults.every(valid => valid)) return focusErrorField()

    props.onSubmit?.(form)
  }

  const renderFields = props.fields.map(field => {
    const fieldProps = {
      ...pick(field, ['label', 'placeholder', 'required', 'disabled', 'name']),
      error: errors[field.name],
      key: field.name,
    }
    switch (field.type) {
      case 'input':
      case 'password': {
        return <Form.Input {...fieldProps}
          value={form[field.name] ?? ''}
          type={field.type === 'input' ? 'text' : field.type}
          maxLength={field.maxLength}
          onChange={(_, { value }) => onChange(field, value)}
          onBlur={() => validateField(field)}
        />
      }
    }
    return null
  })

  return <Form data-testid="form" className={props.className} onSubmit={onSubmit} loading={props.submitting} noValidate>
    {renderFields}
    <Form.Button data-testid="submit" type="submit" primary content={props.submitText ?? 'Submit'} />
  </Form>
}

export default FormRenderer
