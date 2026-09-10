/** Zadeyo affiliate checkout — used by all Get CTAs */
export const ZADEYO_URL = 'https://zadeyo.com/go/QRH'

export function getZadeyoUrl(productSlug?: string): string {
  if (!productSlug) return ZADEYO_URL
  return `${ZADEYO_URL}?to=${encodeURIComponent(`/products/${productSlug}`)}`
}
