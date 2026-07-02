'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/logo'

const links = [
  { href: '#problem', label: 'Problem' },
  { href: '#app', label: 'The App' },
  { href: '#journey', label: 'Blueprint' },
  { href: '#features', label: 'Features' },
  { href: '#how', label: 'How It Works' },
  { href: '#roadmap', label: 'Roadmap' },
  { href: '#faq', label: 'FAQ' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8"
        aria-label="Main navigation"
      >
        <Link href="#" className="flex items-center gap-3">
          <Logo className="h-8 w-8" />
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-tight">
              PoltuReform
            </span>
            <span className="text-[11px] font-medium text-muted-foreground">
              For Indian Citizens
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="#waitlist"
            className="hidden rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Join Waitlist
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground lg:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-background px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="#waitlist"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-primary px-3 py-2.5 text-center text-sm font-semibold text-primary-foreground"
            >
              Join Waitlist
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
