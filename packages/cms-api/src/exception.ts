import { UnprocessableEntityException } from '@nestjs/common'

export class FormException extends UnprocessableEntityException {
  constructor (form: Record<string, string>) {
    super(form)
  }
}
