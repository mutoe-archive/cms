export default function focusErrorField (): void {
  setTimeout(() => {
    const firstErrorField = document.querySelector('.error.field')
    if (!firstErrorField) return

    firstErrorField.querySelector('input')?.focus()
  })
}
