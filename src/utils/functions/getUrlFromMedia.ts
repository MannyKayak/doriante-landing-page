import { Media } from '@/payload-types'

export function getUrlFromMedia(media: string | Media): string {
  if (typeof media === 'string') {
    if (
      media.startsWith('/') ||
      media.startsWith('http://') ||
      media.startsWith('https://')
    ) {
      return media
    }
    return ''
  } else if (media && typeof media === 'object') {
    if (media.thumbnailURL) return media.thumbnailURL
    return media.url || ''
  }
  return ''
}
