const ERROR_MESSAGE = {
  REQUIRED: (label: string) => `${label} can't be blank`,
  MIN_LENGTH: (label: string, length: number) => `${label} is too short (minimum is ${length} characters)`,
  MAX_LENGTH: (label: string, length: number) => `${label} is too long (maximum is ${length} characters)`,
}

export default ERROR_MESSAGE
