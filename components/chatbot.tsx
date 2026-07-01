'use client'

import { useEffect, useRef, useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { MessageCircle, Send, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const SUGGESTIONS = [
  'What is PoltuReform?',
  'How do donations work?',
  'How can I become a candidate?',
]

export function Chatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })

  const isBusy = status === 'submitted' || status === 'streaming'

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, open])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  function submit(text: string) {
    const trimmed = text.trim()
    if (!trimmed || isBusy) return
    sendMessage({ text: trimmed })
    setInput('')
  }

  return (
    <>
      {/* Chat panel */}
      <div
        className={cn(
          'fixed bottom-24 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl transition-all duration-200 md:right-6',
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-4 opacity-0',
        )}
        role="dialog"
        aria-label="PoltuReform chat assistant"
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-background px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-full bg-primary/15 text-primary">
              <MessageCircle className="size-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold">PoltuReform Assistant</p>
              <p className="text-xs text-muted-foreground">
                Ask anything about the platform
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Close chat"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex h-80 flex-col gap-3 overflow-y-auto px-4 py-4"
        >
          {messages.length === 0 && (
            <div className="flex flex-col gap-3">
              <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-secondary px-4 py-2.5 text-sm leading-relaxed">
                {
                  "Namaste! I'm the PoltuReform assistant. Ask me anything about contesting elections, backing candidates, or how transparent funding works."
                }
              </div>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => submit(s)}
                    className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap',
                message.role === 'user'
                  ? 'self-end rounded-br-sm bg-primary text-primary-foreground'
                  : 'self-start rounded-bl-sm bg-secondary text-foreground',
              )}
            >
              {message.parts.map((part, i) =>
                part.type === 'text' ? (
                  <span key={`${message.id}-${i}`}>{part.text}</span>
                ) : null,
              )}
            </div>
          ))}

          {status === 'submitted' && (
            <div className="flex items-center gap-1.5 self-start rounded-2xl rounded-bl-sm bg-secondary px-4 py-3">
              <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
              <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
              <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
              <span className="sr-only">Assistant is typing</span>
            </div>
          )}

          {status === 'error' && (
            <p className="self-start rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
              Something went wrong. Please try again.
            </p>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            submit(input)
          }}
          className="flex items-center gap-2 border-t border-border bg-background px-3 py-3"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (
                e.key === 'Enter' &&
                !e.shiftKey &&
                !e.nativeEvent.isComposing &&
                e.keyCode !== 229
              ) {
                e.preventDefault()
                submit(input)
              }
            }}
            placeholder="Type your question..."
            aria-label="Chat message"
            className="min-w-0 flex-1 rounded-full border border-input bg-transparent px-4 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-ring"
          />
          <button
            type="submit"
            disabled={!input.trim() || isBusy}
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
            aria-label="Send message"
          >
            <Send className="size-4" aria-hidden="true" />
          </button>
        </form>
      </div>

      {/* Floating toggle button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-4 z-50 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 md:right-6"
        aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
        aria-expanded={open}
      >
        {open ? (
          <X className="size-6" aria-hidden="true" />
        ) : (
          <MessageCircle className="size-6" aria-hidden="true" />
        )}
      </button>
    </>
  )
}
