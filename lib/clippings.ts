// Shared shape + collection name for news clippings, used by both the public
// "In The News" section (components/news-clippings.tsx) and the admin panel
// (app/admin/page.tsx).

export const CLIPPINGS_COLLECTION = 'clippings'

export type Clipping = {
  id: string
  source: string
  date: string
  headline: string
  excerpt?: string
  imageUrl?: string
  url?: string
}
