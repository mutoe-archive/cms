export default function focusErrorField () {
  const firstErrorField = document.querySelector(".error.field");
  if(!firstErrorField) return

  firstErrorField.querySelector("input")?.focus();
}
