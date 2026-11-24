import { useState } from 'react'
import { apiRequest } from '../../services/api.js'

export default function ContactForm({ username }) {
  const [sending, setSending] = useState(false)
  const [feedback, setFeedback] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    if (sending) return

    const form = event.currentTarget
    const fields = new FormData(form)
    const payload = {
      name: fields.get('name').trim(),
      email: fields.get('email').trim(),
      message: fields.get('message').trim(),
    }

    setSending(true)
    setFeedback('')

    try {
      await apiRequest(`/contact/${encodeURIComponent(username)}`, {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      form.reset()
      setFeedback('Message sent.')
    } catch (error) {
      setFeedback(error.message || 'Could not send your message. Please try again.')
    } finally {
      setSending(false)
    }
  }

  const fieldClass = 'mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2'

  return (
    <section className="bg-white px-6 py-12 text-gray-900" aria-labelledby="contact-title">
      <form onSubmit={handleSubmit} className="mx-auto grid max-w-xl gap-4">
        <h2 id="contact-title" className="text-2xl font-bold">Contact me</h2>

        <label>
          Your name
          <input className={fieldClass} name="name" autoComplete="name"
            maxLength={100} required disabled={sending} />
        </label>

        <label>
          Your email
          <input className={fieldClass} name="email" type="email" autoComplete="email"
            maxLength={254} required disabled={sending} />
        </label>

        <label>
          Message
          <textarea className={fieldClass} name="message" rows={5}
            maxLength={3000} required disabled={sending} />
        </label>

        <button type="submit" disabled={sending}
          className="rounded-lg bg-gray-900 px-4 py-2 text-white disabled:opacity-60">
          {sending ? 'Sending…' : 'Send message'}
        </button>

        <p role="status">{feedback}</p>
      </form>
    </section>
  )
}