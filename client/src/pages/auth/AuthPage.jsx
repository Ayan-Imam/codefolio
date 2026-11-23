import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import Alert from '../../components/common/Alert.jsx'
import Button from '../../components/common/Button.jsx'
import Card from '../../components/common/Card.jsx'
import { apiRequest } from '../../services/api.js'
import { inputClass } from '../../utils/formStyles.js'

function AuthPage({ mode, onLogin }) {
  const isRegister = mode === 'register'
  const title = isRegister ? 'Create your account' : 'Sign in'
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setError('')
    setIsSubmitting(true)

    try {
      const result = await apiRequest(`/auth/${mode}`, {
        method: 'POST',
        body: JSON.stringify({
          email: form.get('email'),
          password: form.get('password'),
        }),
      })

      if (isRegister) {
        navigate('/login', { replace: true })
      } else {
        onLogin(result.token)
        navigate('/dashboard', { replace: true })
      }
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="app-bg grid place-items-center px-6 py-12">
      <Card className="w-full max-w-md">
        <Link to="/" className="text-sm text-brand-300 hover:underline">
          ← Back to CodeFolio
        </Link>

        <h1 className="mt-4 font-display text-3xl font-bold text-white">{title}</h1>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-2 text-sm">
            Email
            <input
              className={inputClass}
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </label>

          <label className="flex flex-col gap-2 text-sm">
            Password
            <input
              className={inputClass}
              name="password"
              type="password"
              autoComplete={isRegister ? 'new-password' : 'current-password'}
              minLength={isRegister ? 15 : undefined}
              required
            />
            {isRegister && <span className="text-ink-300">Use at least 15 characters.</span>}
          </label>

          {error && <Alert type="error">{error}</Alert>}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Please wait…' : title}
          </Button>
        </form>

        <p className="mt-5 text-sm text-ink-200">
          {isRegister ? 'Already have an account? ' : 'New to CodeFolio? '}
          <Link
            to={isRegister ? '/login' : '/register'}
            className="text-brand-300 hover:underline"
          >
            {isRegister ? 'Sign in' : 'Create an account'}
          </Link>
        </p>
      </Card>
    </main>
  )
}

export default AuthPage