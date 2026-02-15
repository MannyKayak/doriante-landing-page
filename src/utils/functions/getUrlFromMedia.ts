import { Media } from '@/payload-types'

export function getUrlFromMedia(media: string | Media): string {
  if (typeof media === 'string') {
    return media
  } else if (media && typeof media === 'object') {
    if (media.thumbnailURL) return media.thumbnailURL
    return media.url || ''
  }
  return ''
}
