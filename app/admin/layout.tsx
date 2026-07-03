import type { Metadata } from 'next'

// Keep the admin panel out of search engines. It's unlinked from the site and
// protected by login, but this makes doubly sure it never gets indexed.
export const metadata: Metadata = {
  title: 'Admin — PoltuReform',
  robots: { index: false, follow: false },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
