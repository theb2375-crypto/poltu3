'use client'

import { useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { SectionHeader } from '@/components/section-header'

export function Waitlist() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>(
    'idle',
  )

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error')
      return
    }
    setStatus('loading')
    // Simulated submit — wire to a database or email service for production.
    await new Promise((r) => setTimeout(r, 700))
    setStatus('done')
  }

  return (
    <section
      id="waitlist"
      className="relative overflow-hidden border-t border-border py-24 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]"
      />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader
          label="Early Access"
          title="Be part of the first wave."
          sub="PoltuReform launches soon. Join the waitlist and we'll notify you the moment the app is ready."
        />

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="waitlist-email" className="sr-only">
            Email address
          </label>
          <input
            id="waitlist-email"
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (status === 'error') setStatus('idle')
            }}
            placeholder="you@example.com"
            disabled={status === 'done'}
            className="h-12 flex-1 rounded-md border border-input bg-secondary/50 px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring disabled:opacity-60"
            aria-invalid={status === 'error'}
            aria-describedby={status === 'error' ? 'waitlist-error' : undefined}
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'done'}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-70"
          >
            {status === 'loading' && (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            )}
            {status === 'done' && (
              <Check className="h-4 w-4" aria-hidden="true" />
            )}
            {status === 'done' ? 'Joined!' : 'Join Waitlist'}
          </button>
        </form>
        {status === 'error' && (
          <p
            id="waitlist-error"
            className="mt-3 text-center text-sm text-destructive"
          >
            Please enter a valid email address.
          </p>
        )}
        {status === 'done' && (
          <p className="mt-3 text-center text-sm text-primary" role="status">
            You&apos;re on the list. We&apos;ll be in touch soon.
          </p>
        )}

        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-8 border-t border-border pt-12 text-center sm:grid-cols-4">
          {[
            ['3', 'User Roles'],
            ['8', 'Event Types'],
            ['22+', 'App Screens'],
            ['₹0', 'To Contest'],
          ].map(([num, label]) => (
            <div key={label}>
              <dd className="text-4xl font-extrabold tracking-tight">{num}</dd>
              <dt className="mt-1.5 text-xs text-muted-foreground">{label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
