'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { Check, Loader2, LogOut, Pencil, Trash2, X } from 'lucide-react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth'
import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { CLIPPINGS_COLLECTION, type Clipping } from '@/lib/clippings'

// Shared Tailwind classes, matching the waitlist form styling.
const INPUT =
  'h-12 w-full rounded-md border border-input bg-secondary/50 px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring disabled:opacity-60'
const BTN =
  'inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-70'

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null)
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setAuthReady(true)
    })
    return () => unsub()
  }, [])

  if (!authReady) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background px-5 py-16 text-foreground">
      <div className="mx-auto w-full max-w-2xl">
        {user ? <Dashboard user={user} /> : <LoginForm />}
      </div>
    </main>
  )
}

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password)
      // onAuthStateChanged in the parent swaps this view for the dashboard.
    } catch (err) {
      console.error('Login failed:', err)
      setStatus('error')
    }
  }

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="text-2xl font-extrabold tracking-tight">Admin sign in</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Log in to manage news clippings.
      </p>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3">
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status === 'error') setStatus('idle')
          }}
          placeholder="you@example.com"
          className={INPUT}
        />
        <input
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            if (status === 'error') setStatus('idle')
          }}
          placeholder="Password"
          className={INPUT}
        />
        <button type="submit" disabled={status === 'loading'} className={BTN}>
          {status === 'loading' && <Loader2 className="h-4 w-4 animate-spin" />}
          Sign in
        </button>
        {status === 'error' && (
          <p className="text-sm text-destructive">
            Wrong email or password. Please try again.
          </p>
        )}
      </form>
    </div>
  )
}

const EMPTY_FORM = {
  source: '',
  date: '',
  headline: '',
  excerpt: '',
  imageUrl: '',
  url: '',
}

function Dashboard({ user }: { user: User }) {
  const [clippings, setClippings] = useState<Clipping[]>([])
  const [form, setForm] = useState(EMPTY_FORM)
  // null = adding a new clipping; otherwise the id of the clipping being edited.
  const [editingId, setEditingId] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>(
    'idle',
  )

  useEffect(() => {
    const q = query(
      collection(db, CLIPPINGS_COLLECTION),
      orderBy('createdAt', 'desc'),
    )
    const unsub = onSnapshot(q, (snap) => {
      setClippings(
        snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<Clipping, 'id'>),
        })),
      )
    })
    return () => unsub()
  }, [])

  function set<K extends keyof typeof EMPTY_FORM>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
    if (status !== 'idle') setStatus('idle')
  }

  // Load an existing clipping into the form for editing.
  function startEdit(clip: Clipping) {
    setEditingId(clip.id)
    setForm({
      source: clip.source ?? '',
      date: clip.date ?? '',
      headline: clip.headline ?? '',
      excerpt: clip.excerpt ?? '',
      imageUrl: clip.imageUrl ?? '',
      url: clip.url ?? '',
    })
    setStatus('idle')
    // Bring the form into view.
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function cancelEdit() {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setStatus('idle')
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('saving')
    try {
      const source = form.source.trim()
      const date = form.date.trim()
      const headline = form.headline.trim()
      const excerpt = form.excerpt.trim()
      const imageUrl = form.imageUrl.trim()
      const url = form.url.trim()

      if (editingId) {
        // Update: for cleared optional fields, remove them from the document.
        await updateDoc(doc(db, CLIPPINGS_COLLECTION, editingId), {
          source,
          date,
          headline,
          excerpt: excerpt || deleteField(),
          imageUrl: imageUrl || deleteField(),
          url: url || deleteField(),
        })
      } else {
        // Create: only include optional fields when filled (Firestore rejects
        // `undefined`).
        const payload: Record<string, unknown> = {
          source,
          date,
          headline,
          createdAt: serverTimestamp(),
        }
        if (excerpt) payload.excerpt = excerpt
        if (imageUrl) payload.imageUrl = imageUrl
        if (url) payload.url = url
        await addDoc(collection(db, CLIPPINGS_COLLECTION), payload)
      }

      setForm(EMPTY_FORM)
      setEditingId(null)
      setStatus('saved')
    } catch (err) {
      console.error('Failed to save clipping:', err)
      setStatus('error')
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this clipping? This cannot be undone.')) return
    try {
      await deleteDoc(doc(db, CLIPPINGS_COLLECTION, id))
      // If we were editing the one we just deleted, reset the form.
      if (editingId === id) cancelEdit()
    } catch (err) {
      console.error('Failed to delete clipping:', err)
      alert('Could not delete. Please try again.')
    }
  }

  return (
    <div>
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            News clippings
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Signed in as {user.email}
          </p>
        </div>
        <button
          onClick={() => signOut(auth)}
          className="inline-flex h-10 items-center gap-2 rounded-md border border-border px-4 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </button>
      </header>

      {/* Add / edit clipping */}
      <section className="mt-10 rounded-2xl border border-border bg-card/60 p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold tracking-tight">
            {editingId ? 'Edit clipping' : 'Add a clipping'}
          </h2>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-4 w-4" />
              Cancel edit
            </button>
          )}
        </div>
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              required
              value={form.source}
              onChange={(e) => set('source', e.target.value)}
              placeholder="Publication (e.g. The Hindu) *"
              className={INPUT}
            />
            <input
              required
              value={form.date}
              onChange={(e) => set('date', e.target.value)}
              placeholder="Date (e.g. 12 Jun 2026) *"
              className={INPUT}
            />
          </div>
          <input
            required
            value={form.headline}
            onChange={(e) => set('headline', e.target.value)}
            placeholder="Headline *"
            className={INPUT}
          />
          <textarea
            value={form.excerpt}
            onChange={(e) => set('excerpt', e.target.value)}
            placeholder="Short summary / pull-quote (optional)"
            rows={3}
            className="w-full rounded-md border border-input bg-secondary/50 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
          />
          <input
            value={form.imageUrl}
            onChange={(e) => set('imageUrl', e.target.value)}
            placeholder="Image URL (optional)"
            className={INPUT}
          />
          <input
            value={form.url}
            onChange={(e) => set('url', e.target.value)}
            placeholder="Link to full article (optional)"
            className={INPUT}
          />
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={status === 'saving'}
              className={BTN}
            >
              {status === 'saving' && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              {status === 'saved' && <Check className="h-4 w-4" />}
              {status === 'saved'
                ? 'Saved!'
                : editingId
                  ? 'Save changes'
                  : 'Add clipping'}
            </button>
            {status === 'error' && (
              <span className="text-sm text-destructive">
                Something went wrong. Please try again.
              </span>
            )}
          </div>
        </form>
      </section>

      {/* Existing clippings */}
      <section className="mt-10">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Published ({clippings.length})
        </h2>
        <ul className="mt-4 flex flex-col gap-3">
          {clippings.length === 0 && (
            <li className="rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
              No clippings yet. Add your first one above.
            </li>
          )}
          {clippings.map((clip) => (
            <li
              key={clip.id}
              className={`flex items-start justify-between gap-4 rounded-xl border bg-card/60 p-4 transition-colors ${
                editingId === clip.id ? 'border-primary/60' : 'border-border'
              }`}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-bold uppercase tracking-wide text-foreground">
                    {clip.source}
                  </span>
                  <span className="font-mono">{clip.date}</span>
                  {clip.imageUrl && <span>· has image</span>}
                  {editingId === clip.id && (
                    <span className="font-semibold text-primary">· editing</span>
                  )}
                </div>
                <p className="mt-1 truncate text-sm font-semibold">
                  {clip.headline}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={() => startEdit(clip)}
                  aria-label="Edit clipping"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(clip.id)}
                  aria-label="Delete clipping"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-destructive/50 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
