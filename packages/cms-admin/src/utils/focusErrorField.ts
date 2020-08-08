export default function focusErrorField () {
  setTimeout(() => {
    const firstErrorField = document.querySelector(".error.field");
    if (!firstErrorField) return;

    firstErrorField.querySelector("input")?.focus();
  });
}
