import { useEffect, useState } from 'react'
import { apiRequest } from './services/api.js'

function App() {
  const [status, setStatus] = useState('checking')
  const [message, setMessage] = useState('')

  useEffect(() => {
    apiRequest('/health')
      .then((data) => {
        setStatus('connected')
        setMessage(`${data.message} (database: ${data.database})`)
      })
      .catch((error) => {
        setStatus('error')
        setMessage(error.message)
      })
  }, [])

  // Full class names written out so Tailwind can find them
  const statusColors = {
    checking: 'text-slate-400',
    connected: 'text-emerald-400',
    error: 'text-red-400',
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-900">
      <h1 className="text-4xl font-bold text-white">CodeFolio</h1>
      <p className={`text-lg ${statusColors[status]}`}>
        API status: {status}
        {message && ` — ${message}`}
      </p>
    </div>
  )
}

export default App