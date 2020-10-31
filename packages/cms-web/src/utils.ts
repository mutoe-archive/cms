export function styleToString(styleObject: Partial<CSSStyleDeclaration> = {}): string {
  return Object.entries(styleObject).map(([ k, v ]) => {
    k = k.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)
    return `${k}: ${v}`
  }).join('; ')
}
